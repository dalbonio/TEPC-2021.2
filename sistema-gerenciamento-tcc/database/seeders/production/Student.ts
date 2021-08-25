import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Student from 'App/Models/Student'
import User from 'App/Models/User'

export default class StudentSeeder extends BaseSeeder {
  public async run() {
    const studentList = [
      {
        name: 'Bruno Benicio Oliveira',
        email: 'bruno.benicio@email.com',
        password: 'student#pass3',
        registrationNumber: '2017780000',
      },
      {
        name: 'Danyel Matias do Nascimento',
        email: 'danyel.matias@email.com',
        password: 'student#pass3',
        registrationNumber: '2017780001',
      },
      {
        name: 'Douglas Custodio de Araujo',
        email: 'douglas.custodio@email.com',
        password: 'student#pass3',
        registrationNumber: '2017780002',
      },
      {
        name: 'Jose Aldrahn dos Anjos Santiago Gomes',
        email: 'jose.aldrahn@email.com',
        password: 'student#pass3',
        registrationNumber: '2017780003',
      },
      {
        name: 'Lucas Nunes Dalbonio de Carvalho',
        email: 'lucas.dalbonio@email.com',
        password: 'student#pass3',
        registrationNumber: '2017780004',
      },
      {
        name: 'Matheus William Manhães de Barros',
        email: 'matheus.barros@email.com',
        password: 'student#pass3',
        registrationNumber: '2017780005',
      },
      {
        name: 'Natalia Zambe da Silva',
        email: 'natalia.zambe@email.com',
        password: 'student#pass3',
        registrationNumber: '2018780001',
      },
      {
        name: 'Paula Rodrigues Madeira',
        email: 'paula.madeira@email.com',
        password: 'student#pass3',
        registrationNumber: '2016780001',
      },
      {
        name: 'Ricardo de Araujo Navarro',
        email: 'ricardo.navarro@email.com',
        password: 'student#pass3',
        registrationNumber: '2017780006',
      },
      {
        name: 'Samuel Igor dos Santos Pessoa',
        email: 'samuel.santos@email.com',
        password: 'student#pass3',
        registrationNumber: '2016780002',
      },
      {
        name: 'Thalia Ferreira Pinto',
        email: 'thalia.ferreira@email.com',
        password: 'student#pass3',
        registrationNumber: '20167800003',
      },
    ]
    const users = await User.updateOrCreateMany(
      'email',
      studentList.map((st) => {
        return { name: st.name, email: st.email, password: st.password }
      })
    )

    const students = await Student.updateOrCreateMany(
      'registrationNumber',
      users.map((us, i) => {
        return { userId: us.id, registrationNumber: studentList[i].registrationNumber }
      })
    )

    students.forEach((student, index) => student.related('user').associate(users[index]))
  }
}
