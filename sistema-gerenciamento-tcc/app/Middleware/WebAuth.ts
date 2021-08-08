import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WebAuth {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const token = request.cookiesList()['token']
    if (token) {
      request.request.headers.authorization = `Bearer ${token}`
    }
    await next()
  }
}
