import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ResearchArea from 'App/Models/ResearchArea'

export default class ResearchAreaSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    // Write your database queries inside the run method
    await ResearchArea.createMany([
      {
        name: 'Engenharia de Software',
      },
      {
        name: 'Ciência de Dados',
      },
      {
        name: 'Machine Learning',
      },
      {
        name: 'Análise Combinatória',
      },
    ])
  }
}
