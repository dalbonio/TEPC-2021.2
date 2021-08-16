import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Professor from 'App/Models/Professor'
import ResearchArea from 'App/Models/ResearchArea'
import Student from 'App/Models/Student'
import Tcc from 'App/Models/Proposal'
import User from 'App/Models/User'
import Proposal from 'App/Models/Proposal'

export default class ProposalsController {
  public async index(ctx: HttpContextContract) {
    const page = ctx.request.input('page', 1)
    const field = ctx.request.input('field', 0)
    console.log(field)
    const limit = 10
    const proposals = await (Database.query()
      .from('proposals')
      .join('professors', 'proposals.professor_id', 'professors.id')
      .join('users as pu', 'professors.user_id', 'pu.id')
      .join('research_areas', 'tccs.research_area_id', 'research_areas.id')
      .select('proposals.*')
      .select('pu.name as professor')
      .select('research_areas.name as research_area')
      .if( field !== 0, (query) => query.where('research_areas.id', field))
      .paginate(page, limit))

    console.log(proposals.length)
    return proposals
  }

  public async details(ctx: HttpContextContract) {
    const proposal = await (Database.query()
      .from('proposals')
      .where('proposals.id', ctx.params.id)
      .join('professors', 'proposals.professor_id', 'professors.id')
      .join('users as pu', 'professors.user_id', 'pu.id')
      .join('research_areas', 'proposals.research_area_id', 'research_areas.id')
      .select('proposals.*')
      .select('pu.name as professor')
      .select('research_areas.name as research_area')
      .first())
    if (proposal === null) {
      return { error: 'Proposta não foi encontrada' }
    }
    return proposal
  }

  public async create(ctx: HttpContextContract) {
    const professorName = ctx.request.input('professor')
    const researchAreaId = ctx.request.input('research_area')
    const proposalJson = {
      title: ctx.request.input('title'),
      resumo: ctx.request.input('resumo'),
    }

    console.log("Entrou no controller")
    console.log(proposalJson)
    console.log(researchAreaId)
    console.log(professorName)

    //compare auth email with authors student email to check if user is correct
    const professorUser = await User.query().where('name', 'LIKE', '%' + professorName + '%')
    const researchArea = await ResearchArea.find(researchAreaId)
    if (researchArea === null) {
      return ctx.response.status(401).send({ error: 'Area de pesquisa não foi encontrada' })
    }

    //check if professor exists
    const professor = await Professor.findBy('user_id', professorUser[0].id)
    if (professor === null) {
      return ctx.response.status(401).send({ error: 'Professor não foi encontrado' })
    }
  
    const proposal = await Proposal.create(proposalJson)
    if(proposal === null){
      return ctx.response.status(401).send({error: 'Tcc não foi criado'})
    }
    await proposal.related('professor').associate(professor)
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
