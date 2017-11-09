---
title: Request
layout: docs_page.html
path: /docs/v0.21.x/Request
version: v0.21.x


---

## Request
The first parameter of the handler function is `Request`.  
Request is a core Fastify object containing the following fields:
- `query` - the parsed querystring
- `body` - the body
- `params` - the params matching the URL
- `req` - the incoming HTTP request from Node core
- `log` - the logger instance of the incoming request

```js
fastify.post('/:params', schema, function (request, reply) {
  console.log(request.body)
  console.log(request.query)
  console.log(request.params)
  console.log(request.req)
  request.log.info('some info')
})
```