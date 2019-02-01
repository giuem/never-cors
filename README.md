# Never CORS

![status](https://flat.badgen.net/github/status/giuem/never-cors)
![license](https://flat.badgen.net/github/license/giuem/never-cors)

Unlike [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) and [crossorigin.me](https://github.com/connorhudson/crossorigin.me), Never CORS is a proxy server that removes all existed CORS headers.

## Why

When I developed [TinyCache](https://github.com/giuem/tiny-cache) which loads static resources via XMLHttpRequest (XHR), I need to test XHR requests without CORS headers, but don't want to deploy extra server. So that I tried to find if there are some reliable public static servers I can use. Unfortunately, most of public CDN providers like [jsDelivr](https://www.jsdelivr.com/) and [unpkg](https://unpkg.com/) do have CORS headers.

Because of it, I created Never CORS that proxies these CDNs and filters all CORS headers.

## Usage

```
https://never-cors.now.sh/${url}
https://never-cors.now.sh/https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js
```

``` bash
$ curl -X GET -sSI "https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js" | grep "access-control"

access-control-allow-origin: *
access-control-expose-headers: *

$ curl -X GET -sSI "https://never-cors.now.sh/https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js" | grep "access-control"
# output nothing
```

## Development

This project is based on Now.sh, check [here](https://zeit.co/docs/v2/deployments/basics/) for more information.

In short,

1. Download/Clone this project;
2. Modity `now.json`, change `alias` to your own domain or delete it.
3. Run `now` command to deploy. (Or use [Now for GitHub](https://zeit.co/docs/v2/integrations/now-for-github/))

## License

MIT
