import User from 'App/Models/User'
import Student from 'App/Models/Student'
import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'
import AssetsManager from '@ioc:Adonis/Core/AssetsManager'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Tccs', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('tcc is being created', async (assert) => {
    /**
     * Make request
     */
    const userJson = {
      email: 'example4@email.com',
      name: 'Lucas',
      password: 'senha',
      registrationNumber: '121212121',
    }
    const res = await supertest(BASE_URL).post('/api/createStudent').send(userJson).expect(200)
    const tccJson = {
      title: 'TituloTeste',
      authors: [res.body.user.id],
      professor: 'Braida',
      research_area: 'Engenharia de Software',
      resumo: 'Lorem',
      abstract: 'Loren',
      filename: 'Lorem',
      file: 'Loren',
    }
    const tccRes = await supertest(BASE_URL).post('/api/createTcc').send(tccJson).expect(200)
    //const user = User.find_by_email(userJson.email);
    console.log(res.body)
  })
})
