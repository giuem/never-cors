module.exports = (req, res) => {
  const host = req.headers["host"];

  let proto = req.connection.encrypted ? "https:" : "http:";
  proto = req.headers["x-forwarded-proto"] || proto;

  res.end(`Usage: ${proto}//${host}/$\{url}`);
};
