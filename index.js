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

router.get('/script.js', async ctx => {
  ctx.set('content-type', 'text/javascript')
  ctx.body = fs.readFileSync(path.resolve(__dirname, './public/script.js'))
})

router.get('/', async ctx => {
  let random = []
  for(let i = 0; i < 100; ++i) {
    const randomInt = Math.round(Math.random() * Math.floor(4))
    random.push(randomInt)
  }
  await ctx.render('index', {
    categories: data.categories,
    n: 0,
    randVals: random,
    icon: data.fontawesome,
    data: data,
    iconArray: data.fontawesomeArray
  })
})

router.get('/post', async ctx => {
  await ctx.render('post')
})

router.get('/account/signin', async ctx => {
  await ctx.render('signin')
})

router.get('/account/signup', async ctx => {
  await ctx.render('signup')
})

router.get('/category/:category', async ctx => {
  console.log(ctx.params.category)
  if (!data.categories.find(e => e === ctx.params.category)) {
    return ctx.throw(404, 'Not Found')
  }
  await ctx.render('category', {
    title: ctx.params.category,
    n: 0,
    categories: data.categories,
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