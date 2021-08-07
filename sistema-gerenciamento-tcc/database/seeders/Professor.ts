import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Professor from 'App/Models/Professor'
import User from 'App/Models/User'

export default class ProfessorSeeder extends BaseSeeder {
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

    //professors doesnt need any parameter in creation
    const professors = await Professor.createMany(Array(users.length).fill({}))

    professors.forEach((professor, index) => professor.related('user').associate(users[index]))
  }
}
