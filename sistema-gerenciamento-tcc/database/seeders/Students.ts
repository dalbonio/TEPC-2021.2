import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Student from 'App/Models/Student'
import User from 'App/Models/User'

export default class ProfessorSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    const users = await User.createMany([
      {
        name: 'Lucas Nunes',
        email: 'lucas@email.com',
        password: 'senha',
      },
      {
        name: 'Bruno Benicio',
        email: 'bruno@email.com',
        password: 'senha',
      },
      {
        name: 'Natalia Zambe',
        email: 'natalia@email.com',
        password: 'senha',
      },
    ])

    const students = await Student.createMany([
      { userId: users[0].id, registrationNumber: '2017781458' },
      { userId: users[1].id, registrationNumber: '2017780063' },
      { userId: users[2].id, registrationNumber: '2018780288' },
    ])

    students.forEach((student, index) => student.related('user').associate(users[index]))
  }
}
