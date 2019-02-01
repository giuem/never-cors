const dns = require("dns");
const httpError = require("http-errors");
const httpProxy = require("http-proxy");
const ip = require("ip");
const { parse } = require("url");

function resolveHost(hostname) {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err, addr) => {
      err ? reject(err) : resolve(addr);
    });
  });
}

async function paresUrl(urlStr) {
  const url = parse(urlStr);
  if (!url.protocol || !url.host) {
    throw new httpError.BadRequest(`Invalid url: ${urlStr}`);
  }

  const addr = await resolveHost(url.hostname);
  if (ip.isPrivate(addr)) {
    throw new httpError.Forbidden(`Forbidden host: ${url.hostname}, ${addr}`);
  }

  return {
    url: `${url.protocol}//${url.host}`,
    host: url.host,
    path: url.path
  };
}

async function handleProxy(req, res, proxy) {
  const { query } = parse(req.url, true);
  const { url, host, path } = await paresUrl(query.url);

  req.url = path;

  const proxyOptions = {
    changeOrigin: false,
    prependPath: false,
    target: url,
    headers: {
      host
    }
  };

  proxy.web(req, res, proxyOptions);
}

const corsHeaders = [
  "access-control-allow-origin",
  "access-control-expose-headers",
  "access-control-max-age",
  "access-control-allow-credentials",
  "access-control-allow-methods",
  "access-control-allow-headers"
];

module.exports = async (req, res) => {
  const proxy = httpProxy.createProxyServer();

  proxy.on("proxyRes", function(proxyRes, req, res) {
    corsHeaders.forEach(header => {
      delete proxyRes.headers[header];
      res.removeHeader(header);
    });
  });

  try {
    await handleProxy(req, res, proxy);
  } catch (error) {
    console.error(error);
    res.statusCode = error.status ? error.status : 500;
    res.end(error.message);
  }
};
