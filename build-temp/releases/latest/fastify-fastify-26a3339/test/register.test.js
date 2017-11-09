'use strict'

const t = require('tap')
const test = t.test
const sget = require('simple-get').concat
const Fastify = require('..')

test('register', t => {
  t.plan(33)

  const fastify = Fastify()

  fastify.register(function (instance, opts, done) {
    t.notEqual(instance, fastify)
    t.ok(fastify.isPrototypeOf(instance))

    t.is(typeof opts, 'object')
    t.is(typeof done, 'function')

    instance.get('/first', function (req, reply) {
      reply.send({ hello: 'world' })
    })
    done()
  })

  fastify.register(function (instance, opts, done) {
    t.notEqual(instance, fastify)
    t.ok(fastify.isPrototypeOf(instance))

    t.is(typeof opts, 'object')
    t.is(typeof done, 'function')

    instance.get('/second', function (req, reply) {
      reply.send({ hello: 'world' })
    })
    done()
  })

  const route1 = function (instance, opts, done) {
    t.notEqual(instance, fastify)
    t.ok(fastify.isPrototypeOf(instance))

    t.is(typeof opts, 'object')
    t.is(typeof done, 'function')

    instance.get('/third', function (req, reply) {
      reply.send({ hello: 'world' })
    })
    done()
  }

  const route2 = function (instance, opts, done) {
    t.notEqual(instance, fastify)
    t.ok(fastify.isPrototypeOf(instance))

    t.is(typeof opts, 'object')
    t.is(typeof done, 'function')

    instance.get('/fourth', function (req, reply) {
      reply.send({ hello: 'world' })
    })
    done()
  }

  fastify.register([route1, route2])

  fastify.listen(0, err => {
    t.error(err)
    fastify.server.unref()

    makeRequest('first')
    makeRequest('second')
    makeRequest('third')
    makeRequest('fourth')
  })

  function makeRequest (path) {
    sget({
      method: 'GET',
      url: 'http://localhost:' + fastify.server.address().port + '/' + path
    }, (err, response, body) => {
      t.error(err)
      t.strictEqual(response.statusCode, 200)
      t.strictEqual(response.headers['content-length'], '' + body.length)
      t.deepEqual(JSON.parse(body), { hello: 'world' })
    })
  }
})

test('internal route declaration should pass the error generated by the register to the next handler / 1', t => {
  t.plan(1)
  const fastify = Fastify()

  fastify.register((instance, opts, next) => {
    next(new Error('kaboom'))
  })

  fastify.get('/', (req, reply) => {
    reply.send({ hello: 'world' })
  })

  fastify.listen(0, err => {
    fastify.close()
    t.is(err.message, 'kaboom')
  })
})

test('internal route declaration should pass the error generated by the register to the next handler / 2', t => {
  t.plan(2)
  const fastify = Fastify()

  fastify.register((instance, opts, next) => {
    next(new Error('kaboom'))
  })

  fastify.get('/', (req, reply) => {
    reply.send({ hello: 'world' })
  })

  fastify.after(err => {
    t.is(err.message, 'kaboom')
  })

  fastify.listen(0, err => {
    fastify.close()
    t.error(err)
  })
})