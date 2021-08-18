import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Student from 'App/Models/Student'
import User from 'App/Models/User'

export default class ProfessorSeeder extends BaseSeeder {
  public async run() {
    const users = await User.createMany([
      {
        name: 'Lucas Nunes',
        email: 'lucas@email.com',
        password: 'senha',
      },
      {
        name: 'Bruno',
        email: 'bruno@email.com',
        password: 'senha',
      },
    ])

    //professors doesnt need any parameter in creation
    const students = await Student.createMany(Array(users.length).fill({registrationNumber: 2017781458}))

    students.forEach((student, index) => student.related('user').associate(users[index]))
  }
}
