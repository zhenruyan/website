---
title: Request
layout: docs_page.html
path: /docs/v0.33.x/Request
version: v0.33.x


---

## Request
The first parameter of the handler function is `Request`.  
Request is a core Fastify object containing the following fields:
- `query` - the parsed querystring
- `body` - the body
- `params` - the params matching the URL
- `headers` - the headers
- `req` - the incoming HTTP request from Node core
- `log` - the logger instance of the incoming request

```js
fastify.post('/:params', options, function (request, reply) {
  console.log(request.body)
  console.log(request.query)
  console.log(request.params)
  console.log(request.headers)
  console.log(request.req)
  request.log.info('some info')
})
```