import { Controller, Get } from 'koa-ts-controllers'

@Controller('/test')
class TestController {
  @Get('/getTest')
  async getTest() {
    return '123214214'
  }
}

export default TestController
