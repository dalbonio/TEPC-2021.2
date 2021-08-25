import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Professor from 'App/Models/Professor'
import User from 'App/Models/User'

export default class ProfessorSeeder extends BaseSeeder {
  public async run() {
    const users = await User.updateOrCreateMany('email', [
      {
        name: 'Adria Lyra',
        email: 'adria.lyra@email.com',
        password: 'prof!pass5',
      },
      {
        name: 'Bruno Dembogurski',
        email: 'bruno.dembogurski@email.com',
        password: 'prof!pass5',
      },
      {
        name: 'Daniel Posner',
        email: 'daniel.posner@email.com',
        password: 'prof!pass5',
      },
      {
        name: 'Fellipe Duarte',
        email: 'fellipe.duarte@email.com',
        password: 'prof!pass5',
      },
      {
        name: 'Fernanda Couto',
        email: 'fernanda.couto@email.com',
        password: 'prof!pass5',
      },
      {
        name: 'Filipe Braida do Carmo',
        email: 'filipe.braida@email.com',
        password: 'prof!pass5',
      },
      {
        name: 'Juliana Mendes',
        email: 'juliana.mendes@email.com',
        password: 'prof!pass5',
      },
      {
        name: 'Leandro Alvim',
        email: 'leandro.alvim@email.com',
        password: 'prof!pass5',
      },
      {
        name: 'Lígia Maria Soares Passos',
        email: 'ligia.passos@email.com',
        password: 'prof!pass5',
      },
      {
        name: 'Marcel Silva',
        email: 'marcel.silva@email.com',
        password: 'prof!pass5',
      },
      {
        name: 'Marcelo Zamith',
        email: 'marcelo.zamith@email.com',
        password: 'prof!pass5',
      },
      {
        name: 'Natalia Schots',
        email: 'natalia.schots@email.com',
        password: 'prof!pass5',
      },
      {
        name: 'Ricardo C. Corrêa',
        email: 'ricardo.correa@email.com',
        password: 'prof!pass5',
      },
      {
        name: 'Ubiratam de Paula',
        email: 'ubiratam.paula@email.com',
        password: 'prof!pass5',
      },
    ])

    const professors = await Professor.updateOrCreateMany(
      'userId',
      users.map((user) => {
        return { userId: user.id }
      })
    )

    professors.forEach((professor, index) => professor.related('user').associate(users[index]))
  }
}
