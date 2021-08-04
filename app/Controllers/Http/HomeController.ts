import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public async index(ctx: HttpContextContract) {
    return { msg: 'Hello world from the todos controller' }
  }
}
