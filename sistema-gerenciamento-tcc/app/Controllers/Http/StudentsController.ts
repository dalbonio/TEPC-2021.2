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

  public async show(ctx: HttpContextContract) {
    const userId = ctx.request.param('id')
    const student = await Student.query().where("id", userId).preload('user')

    if (student !== null) {
      return { error: 'Estudante não encontrado' }
    }
    
    return {
      student: student,
    }
  }

  public async update(ctx: HttpContextContract) {
    const userId = ctx.request.input('userId')
    const studentId = ctx.request.input('userId')

    const userJson = {
      name: ctx.request.input('name'),
      email: ctx.request.input('email'),
      password: ctx.request.input('password'),
    }

    const studentJson = {
      registrationNumber: ctx.request.input('registrationNumber'),
    }
    
    const user = await User.find(userId)
    const student = await Student.find(studentId)

    if(user === null){
      return { error: 'Usuário não encontrado' }
    }
    user.name = userJson.name
    user.email = userJson.email
    user.save()

    if(student === null){
      return { error: 'Estudante não encontrado' }
    }
    student.registrationNumber = studentJson.registrationNumber
    user.save()

    return {
      user: user.serialize(),
      student: student.serialize(),
    }
  }
}
