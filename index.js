const path = require('path')
const fs = require('fs-extra')
const Koa = require('koa')
const views = require('koa-views')
const data = require('./public/data.json')
const app = new Koa()

const router = require('koa-router')()

router.get('/style.css', async ctx => {
  ctx.set('content-type', 'text/css')
  ctx.body = fs.readFileSync(path.resolve(__dirname, './public/style.css'))
})

router.get('/', async ctx => {
  await ctx.render('index')
})

router.get('/category/:category', async ctx => {
  console.log(ctx.params.category)
  if (!data.categories.find(e => e === ctx.params.category)) {
    return ctx.throw(404, 'Not Found')
  }
  await ctx.render('category', {
    title: ctx.params.category,
    n: 0,
    icon: data.fontawesome[ctx.params.category]
  })
})

app
  .use(views(path.join(__dirname, 'views'), { extension: 'pug' }))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8080)

console.log('listening on port 8080')
console.log(data)