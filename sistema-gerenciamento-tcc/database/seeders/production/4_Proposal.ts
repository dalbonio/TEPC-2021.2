import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Professor from 'App/Models/Professor'
import Proposal from 'App/Models/Proposal'
import ResearchArea from 'App/Models/ResearchArea'
import { LoremIpsum } from 'lorem-ipsum'

export default class ProposalSeeder extends BaseSeeder {
  public async run() {
    const loremIpsum = new LoremIpsum()

    const professors = await Professor.all()
    const researchAreas = await ResearchArea.all()

    for (let i = 0; i < 15; i++) {
      const proposalJson = {
        title: loremIpsum.generateSentences(1),
        description: loremIpsum.generateParagraphs(1),
      }

      const professor = professors[Math.floor(Math.random() * professors.length)]
      const researchArea = researchAreas[Math.floor(Math.random() * researchAreas.length)]

      const proposal = await Proposal.create(proposalJson)

      await proposal.related('professor').associate(professor)
      await proposal.related('researchArea').associate(researchArea)
    }
  }
}
