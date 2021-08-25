import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Professor from 'App/Models/Professor'
import User from 'App/Models/User'

export default class ProfessorSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    const users = await User.createMany([
      {
        name: 'Filipe Braida',
        email: 'braida@email.com',
        password: 'senha',
      },
      {
        name: 'Bruno Dembogurski',
        email: 'dembodurski@email.com',
        password: 'senha',
      },
      {
        name: 'Filipe Duarte',
        email: 'duarte@email.com',
        password: 'senha',
      },
    ])

    const professors = await Professor.createMany([
      { userId: users[0].id },
      { userId: users[1].id },
      { userId: users[2].id },
    ])

    professors.forEach((professor, index) => professor.related('user').associate(users[index]))
  }
}
