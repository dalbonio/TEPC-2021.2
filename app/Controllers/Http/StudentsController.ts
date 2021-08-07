import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import User from 'App/Models/User'

export default class StudentsController {
  public async create(ctx: HttpContextContract) {
    const userJson = {
      name: ctx.request.input('name'),
      email: ctx.request.input('email'),
      password: ctx.request.input('password'),
    }
    const userFound = await User.findBy('email', userJson.email)
    if (userFound !== null) {
      return { error: 'Usuário já está em uso' }
    }
    const user = await User.create(userJson)
    let student = await Student.create({
      registrationNumber: ctx.request.input('registrationNumber'),
    })
    await student.related('user').associate(user)
    return {
      user: user.serialize(),
      student: student.serialize(),
    }
  }
}
