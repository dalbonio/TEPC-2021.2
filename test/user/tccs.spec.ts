import User from 'App/Models/User'
import Student from 'App/Models/Student'
import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'
import AssetsManager from '@ioc:Adonis/Core/AssetsManager'
import Tcc from 'App/Models/Tcc'

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
      research_area: '1',
      resumo: 'Lorem',
      abstract: 'Loren',
      filename: 'Lorem',
      file: 'Loren',
    }
    const tccRes = await supertest(BASE_URL).post('/api/createTcc').send(tccJson).expect(200)
  })

  test('tcc is being listed', async (assert) => {
    // create user
    const userJson = {
      email: 'example4@email.com',
      name: 'Lucas',
      password: 'senha',
      registrationNumber: '121212121',
    }
    const res = await supertest(BASE_URL).post('/api/createStudent').send(userJson).expect(200)
    // create tcc
    const tccJson = {
      title: 'TituloTeste',
      authors: [res.body.user.id],
      professor: 'Braida',
      research_area: '1',
      resumo: 'Lorem',
      abstract: 'Loren',
      filename: 'Lorem',
      file: 'Loren',
    }
    const tccRes = await supertest(BASE_URL).post('/api/createTcc').send(tccJson).expect(200)

    // list tcc
    const listRes = await supertest(BASE_URL).get('/api/listTcc').expect(200)
    assert.strictEqual(listRes.body.data[0].title, tccJson.title)
  }).timeout(0)

  test('tcc is showing details', async (assert) => {
    // create user
    const userJson = {
      email: 'example4@email.com',
      name: 'Lucas',
      password: 'senha',
      registrationNumber: '121212121',
    }
    const res = await supertest(BASE_URL).post('/api/createStudent').send(userJson).expect(200)
    // create tcc
    const tccJson = {
      title: 'TituloTeste',
      authors: [res.body.user.id],
      professor: 'Braida',
      research_area: '2',
      resumo: 'Lorem',
      abstract: 'Loren',
      filename: 'Lorem',
      file: 'Loren',
    }
    const tccRes = await supertest(BASE_URL).post('/api/createTcc').send(tccJson).expect(200)

    // get tcc
    const detailRes = await supertest(BASE_URL)
      .get(`/api/detailTcc/${tccRes.body.tcc.id}`)
      .expect(200)
    assert.strictEqual(detailRes.body.title, tccJson.title)
  }).timeout(0)

  test('tcc is downloading', async (assert) => {
    // create user
    const userJson = {
      email: 'example4@email.com',
      name: 'Lucas',
      password: 'senha',
      registrationNumber: '121212121',
    }
    const res = await supertest(BASE_URL).post('/api/createStudent').send(userJson).expect(200)
    // create tcc
    const tccJson = {
      title: 'TituloTeste',
      authors: [res.body.user.id],
      professor: 'Braida',
      research_area: '3',
      resumo: 'Lorem',
      abstract: 'Loren',
      filename: 'Lorem',
      file: 'Loren',
    }
    const tccRes = await supertest(BASE_URL).post('/api/createTcc').send(tccJson).expect(200)

    // get tcc
    const downloadRes = await supertest(BASE_URL)
      .get(`/api/downloadTcc/${tccRes.body.tcc.id}`)
      .expect(200)
    assert.strictEqual(downloadRes.body.toString(), tccJson.file)
  }).timeout(0)
})
