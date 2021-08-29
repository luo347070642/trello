import Koa, { Context } from 'koa'
import KoaRouter from 'koa-router'
import { bootstrapControllers } from 'koa-ts-controllers'
import configs from './configs/index'
import log4js from './utils/log4Util'
import path from 'path'
import KoaBodyParser from 'koa-bodyparser'
;(async () => {
  const app = new Koa()
  const router = new KoaRouter()
  await bootstrapControllers(app, {
    router,
    basePath: '/api',
    versions: [1],
    controllers: [path.resolve(__dirname, 'controllers/**/* ')]
  })

  app.use(KoaBodyParser())

  app.use(router.routes())

  app.use(async (ctx: Context, next) => {
    log4js.info(`get: ${JSON.stringify(ctx.request.query)}`) // 监听get请求
    // log4js.info(`params: ${JSON.stringify(ctx.request.body)}`) // 监听post请求DFASDFasdfasdfasdf
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    log4js.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

  app.listen(configs.server.port, configs.server.host, () => {
    log4js.info(`服务启动成功： http://${configs.server.host}:${configs.server.port}`)
  })
})()
