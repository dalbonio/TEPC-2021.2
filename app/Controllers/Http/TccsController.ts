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
    const field = ctx.request.input('field', 0)
    console.log(field)
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
      .if( field !== 0, (query) => query.where('research_areas.id', field))
      .paginate(page, limit))

    console.log(tccsList.length)
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
    let authors = ctx.request.input('authors')
    const professorName = ctx.request.input('professor')
    const researchAreaId = ctx.request.input('research_area')
    const tccJson = {
      title: ctx.request.input('title'),
      resumo: ctx.request.input('resumo'),
      abstract: ctx.request.input('abstract'),
      filename: ctx.request.input('filename'),
      file_content: ctx.request.input('file'),
      researchAreaId: 0,
      accepted: false,
    }

    console.log("Entrou no controller")
    console.log(tccJson)
    console.log(authors)
    console.log(researchAreaId)
    console.log(professorName)


    let allStudents = await Student.query().preload('user')
    var studentsDict = {}
    for(var i = 0; i < allStudents.length; i++){
      studentsDict[allStudents[i].user.name] = allStudents[i].id
    }
    authors = authors.split(',').map( (el) => el.trim() )
    console.log(authors)
    const authorsIds = authors.map( (author) => studentsDict[author]).filter( (el) => el != null)
    console.log(studentsDict)
    console.log(authorsIds)

    if(authorsIds.length === 0){
      return ctx.response.status(403).send({error: 'Autores Inválidos'})
    }

    //compare auth email with authors student email to check if user is correct
    const professorUser = await User.query().where('name', 'LIKE', '%' + professorName + '%')
    const researchArea = await ResearchArea.find(researchAreaId)
    if (researchArea === null) {
      return ctx.response.status(401).send({ error: 'Area de pesquisa não foi encontrada' })
    }
    tccJson.researchAreaId = researchArea.id
    //check if professor exists
    const professor = await Professor.findBy('user_id', professorUser[0].id)
    if (professor === null) {
      return ctx.response.status(401).send({ error: 'Professor não foi encontrado' })
    }
    const students = await Student.query().whereIn('id', authorsIds).preload('user')
    if (students === null) {
      return ctx.response.status(401).send({ error: 'Autor não foi encontrado' })
    }
    const tcc = await Tcc.create(tccJson)
    if(tcc === null){
      return ctx.response.status(401).send({error: 'Tcc não foi criado'})
    }
    await tcc.related('professor').associate(professor)
    await tcc.related('students').saveMany(students)
    await students.forEach(async (student) => await student.related('tcc').associate(tcc)) 
    await tcc.related('researchArea').associate(researchArea)

    console.log(tcc.id, tcc.title)
    console.log(students.length)

    return ctx.response.status(200).send({
      tcc: tcc,
      students: students,
      researchArea: researchArea,
      professor: professor,
    })
  }

  public async show(ctx: HttpContextContract) {
    const tccId = ctx.request.param('id')
    const tcc = Tcc.find(tccId)
    const student = await Tcc.query().where("id", tccId).preload('students')
    const professor = await Tcc.query().where("id", tccId).preload('professor')
    
    if (student !== null) {
      return { error: 'Estudante não encontrado' }
    }
    
    return {
      tcc: tcc,
      student: student,
      professor: professor
    }
  }

  public async update(ctx: HttpContextContract) {
    let authors = ctx.request.input('authors')
    const professorName = ctx.request.input('professor')
    const researchAreaId = ctx.request.input('research_area')
    const tccJson = {
      title: ctx.request.input('title'),
      resumo: ctx.request.input('resumo'),
      abstract: ctx.request.input('abstract'),
      filename: ctx.request.input('filename'),
      file_content: ctx.request.input('file'),
      researchAreaId: 0,
      accepted: false,
    }

    console.log("Entrou no controller")
    console.log(tccJson)
    console.log(authors)
    console.log(researchAreaId)
    console.log(professorName)


    let allStudents = await Student.query().preload('user')
    var studentsDict = {}
    for(var i = 0; i < allStudents.length; i++){
      studentsDict[allStudents[i].user.name] = allStudents[i].id
    }
    authors = authors.split(',').map( (el) => el.trim() )
    console.log(authors)
    const authorsIds = authors.map( (author) => studentsDict[author]).filter( (el) => el != null)
    console.log(studentsDict)
    console.log(authorsIds)

    if(authorsIds.length === 0){
      return ctx.response.status(403).send({error: 'Autores Inválidos'})
    }

    //compare auth email with authors student email to check if user is correct
    const professorUser = await User.query().where('name', 'LIKE', '%' + professorName + '%')
    const researchArea = await ResearchArea.find(researchAreaId)
    if (researchArea === null) {
      return ctx.response.status(401).send({ error: 'Area de pesquisa não foi encontrada' })
    }
    tccJson.researchAreaId = researchArea.id
    //check if professor exists
    const professor = await Professor.findBy('user_id', professorUser[0].id)
    if (professor === null) {
      return ctx.response.status(401).send({ error: 'Professor não foi encontrado' })
    }
    const students = await Student.query().whereIn('id', authorsIds).preload('user')
    if (students === null) {
      return ctx.response.status(401).send({ error: 'Autor não foi encontrado' })
    }
    const tcc = await Tcc.create(tccJson)
    if(tcc === null){
      return ctx.response.status(401).send({error: 'Tcc não foi criado'})
    }
    await tcc.related('professor').associate(professor)
    await tcc.related('students').saveMany(students)
    await students.forEach(async (student) => await student.related('tcc').associate(tcc)) 
    await tcc.related('researchArea').associate(researchArea)

    console.log(tcc.id, tcc.title)
    console.log(students.length)

    return ctx.response.status(200).send({
      tcc: tcc,
      students: students,
      researchArea: researchArea,
      professor: professor,
    })
  }
}
