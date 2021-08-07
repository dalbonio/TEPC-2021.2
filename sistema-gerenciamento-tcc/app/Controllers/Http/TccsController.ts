import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Professor from 'App/Models/Professor'
import ResearchArea from 'App/Models/ResearchArea'
import Student from 'App/Models/Student'
import Tcc from 'App/Models/Tcc'
import User from 'App/Models/User'

export default class TccsController {
  public async index(ctx: HttpContextContract) {
    const page = ctx.request.input('page', 1)
    const limit = 10
    const tccsList = await (Database.query()
      .from('tccs')
      .join('students', 'tccs.id', 'students.tcc_id')
      .join('professors', 'tccs.professor_id', 'professors.id')
      .join('users as su', 'students.user_id', 'su.id')
      .join('users as pu', 'professors.user_id', 'pu.id')
      .join('research_areas', 'tccs.research_area_id', 'research_areas.id')
      .select('tccs.*')
      .select('su.name as author')
      .select('pu.name as professor')
      .select('research_areas.name as research_area')
      .paginate(page, limit))

    return tccsList
  }

  public async details(ctx: HttpContextContract) {
    const tcc = await (Database.query()
      .from('tccs')
      .where('tccs.id', ctx.params.id)
      .join('students', 'tccs.id', 'students.tcc_id')
      .join('professors', 'tccs.professor_id', 'professors.id')
      .join('users as su', 'students.user_id', 'su.id')
      .join('users as pu', 'professors.user_id', 'pu.id')
      .join('research_areas', 'tccs.research_area_id', 'research_areas.id')
      .select('tccs.*')
      .select('su.name as author')
      .select('pu.name as professor')
      .select('research_areas.name as research_area')
      .first())
    if (tcc === null) {
      return { error: 'TCC não foi encontrado' }
    }
    return tcc
  }

  public async download(ctx: HttpContextContract) {
    const tcc = await Tcc.find(ctx.params.id)
    if (tcc === null) {
      return { error: 'TCC não foi encontrado' }
    }

    ctx.response.header('content-disposition', `inline; filename="${tcc.filename}"`)
    ctx.response.type('.pdf')
    return tcc.file_content
  }

  public async create(ctx: HttpContextContract) {
    const authors = ctx.request.input('authors')
    const professorName = ctx.request.input('professor')
    const researchAreaName = ctx.request.input('research_area')
    const tccJson = {
      title: ctx.request.input('title'),
      resumo: ctx.request.input('resumo'),
      abstract: ctx.request.input('abstract'),
      filename: ctx.request.input('filename'),
      file_content: ctx.request.input('file'),
      researchAreaId: 0,
      accepted: false,
    }

    //compare auth email with authors student email to check if user is correct
    const professorUser = await User.query().where('name', 'LIKE', '%' + professorName + '%')
    const researchArea = await ResearchArea.findBy('name', researchAreaName)
    if (researchArea === null) {
      return { error: 'Area de pesquisa não foi encontrada' }
    }
    tccJson.researchAreaId = researchArea.id
    //check if professor exists
    const professor = await Professor.findBy('user_id', professorUser[0].id)
    if (professor === null) {
      return { error: 'Professor não foi encontrado' }
    }
    const students = await Student.query().whereIn('user_id', authors)
    if (students === null) {
      return { error: 'Autor não foi encontrado' }
    }
    const tcc = await Tcc.create(tccJson)
    await tcc.related('professor').associate(professor)
    students.forEach(async (student) => await tcc.related('students').save(student))
    // await tcc.related('students').save(students)
    // await tcc.related('research_area').save(researchArea)
    return {
      tcc: tcc,
      students: students,
      researchArea: researchArea,
      professor: professor,
    }
  }
}
