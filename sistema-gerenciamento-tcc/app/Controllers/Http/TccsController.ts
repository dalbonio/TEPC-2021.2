import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'
import ResearchArea from 'App/Models/ResearchArea'
import Student from 'App/Models/Student'
import Tcc from 'App/Models/Tcc'
import User from 'App/Models/User'

export default class TccsController {
  public async create(ctx: HttpContextContract) {
    const authors = ctx.request.input('authors')
    const professorName = ctx.request.input('professor')
    const researchAreaName = ctx.request.input('research_area')
    const tccJson = {
      title: ctx.request.input('name'),
      resumo: ctx.request.input('resumo'),
      abstract: ctx.request.input('abstract'),
      filename: ctx.request.input('filename'),
      file: ctx.request.input('file'),
    }

    //compare auth email with authors student email to check if user is correct
    const professorUser = await User.query().where('name', 'LIKE', '%' + professorName + '%')
    const researchArea = await ResearchArea.findBy('name', researchAreaName)
    if (researchArea === null) {
      return { error: 'Area de pesquisa não foi encontrada' }
    }
    //check if professor exists
    const professor = await Professor.findBy('user_id', professorUser[0].id)
    if (professor === null) {
      return { error: 'Professor não foi encontrado' }
    }
    const students = await Student.query().whereIn('user_id', authors)
    if (students !== null) {
      return { error: 'Autor não foi encontrado' }
    }
    const tcc = await Tcc.create(tccJson)
    await tcc.related('professor').associate(professor)
    await tcc.related('students').save(students)
    await tcc.related('research_area').save(researchArea)
    return {
      tcc: tcc,
      students: students,
      researchArea: researchArea,
      professor: professor,
    }
  }
}
