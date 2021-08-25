import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Professor from 'App/Models/Professor'
import ResearchArea from 'App/Models/ResearchArea'
import Student from 'App/Models/Student'
import Tcc from 'App/Models/Tcc'
import { LoremIpsum } from 'lorem-ipsum'

export default class TccSeeder extends BaseSeeder {
  public async run() {
    const loremIpsum = new LoremIpsum()

    const students = await Student.all()
    const professors = await Professor.all()
    const researchAreas = await ResearchArea.all()

    for (const i in students) {
      const student = students[i]
      const professor = professors[Math.floor(Math.random() * professors.length)]
      const researchArea = researchAreas[Math.floor(Math.random() * researchAreas.length)]

      const tccJson = {
        title: loremIpsum.generateSentences(1),
        resumo: loremIpsum.generateParagraphs(3),
        abstract: loremIpsum.generateParagraphs(3),
        filename: `not_a_file-${i}.pdf`,
        file_content: Buffer.from('nothing'),
        researchAreaId: researchArea.id,
        accepted: Math.random() < 0.33,
      }
      const tcc = await Tcc.create(tccJson)
      await tcc.related('professor').associate(professor)
      await tcc.related('students').saveMany([student])

      await student.related('tcc').associate(tcc)
      await tcc.related('researchArea').associate(researchArea)
    }
  }
}
