---
title: Hooks
layout: docs_page.html
path: /docs/v0.19.x/Hooks
version: v0.19.x


---

## Hooks

By using the hooks you can interact directly inside the lifecycle of Fastify, there are three different Hooks that you can use *(in order of execution)*:
- `'onRequest'`
- `'preRouting'`
- `'preHandler'`
- `'onClose'`

Example:
```js
fastify.addHook('onRequest', (req, res, next) => {
  // some code
  next()
})
```

Is pretty easy understand where each hook is executed, if you need a visual feedback take a look to the [lifecycle](/docs/v0.19.x/Lifecycle) page.

If you get an error during the execution of you hook, just pass it to `next()` and Fastify will automatically close the request and send the appropriate error code to the user.

If you want to pass a custom error code to the user, just pass it as second parameter to `next()`:
```js
fastify.addHook('onRequest', (req, res, next) => {
  // some code
  next(new Error('some error'), 400)
})
```
*The error will be handled by [`Reply`](/docs/v0.19.x/Reply#errors).*

The function signature is always the same, `request`, `response`, `next`, it changes a little bit only in the `'preHandler'` hook, where the first two arguments are [`request`](/docs/v0.19.x/Request) and [`reply`](/docs/v0.19.x/Reply) core Fastify objects.

<a name="on-close"></a>
**'onClose'**  
The unique hook that is not inside the lifecycle is `'onClose'`, this one is triggered when you call `fastify.close()` to stop the server, and it is useful if you have some [plugins](/docs/v0.19.x/Plugins) that need a "shutdown" part, such as a connection to a database.  
Only for this hook, the parameters of the function changes, the first one is the Fastify instance, the second one the `done` callback.
```js
fastify.addHook('onClose', (instance, done) => {
  // some code
  done()
})
```
<a name="scope"></a>
### Scope
Talking about scope, the hooks works in a slightly different way from the Request/Reply encapsulation model. For instance, `onRequest`, `preRouting` and `onClose` are never encapsulated, not matter where you are declaring them, while the `preHandler` hook is always encapsulated if you declare it inside a `register`.