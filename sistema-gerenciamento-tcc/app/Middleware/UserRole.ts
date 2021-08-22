import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coordinator from 'App/Models/Coordinator'
import Professor from 'App/Models/Professor'

export default class UserRole {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if (auth.user) {
      const id = auth.user.id
      const isCoordinator = Coordinator.findBy('user_id', id)
      const isProfessor = Professor.findBy('user_id', id)

      if ((await isCoordinator) !== null) auth.user.role = 'coordinator'
      else if ((await isProfessor) !== null) auth.user.role = 'professor'
      auth.user.role = 'student'
    } else {
      return response.forbidden()
    }

    await next()
  }
}
