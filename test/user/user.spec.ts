import User from 'App/Models/User'
import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Login', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('ensure login request is working', async (assert) => {
    /**
     * Make request
     */
    const userFound = await User.findBy('email', 'example@email.com')
    let userCreated
    console.log(userFound)
    if ((await User.findBy('email', 'example@email.com')) === null) {
      userCreated = await User.create({
        email: 'example@email.com',
        password: 'senha',
        name: 'Teste',
      })
    }
    console.log(userCreated)
    const userJson = { email: 'example@email.com', password: 'senha' }
    const response = await supertest(BASE_URL).post('/api/login').send(userJson).expect(200)
    //const user = User.find_by_email(userJson.email);
    assert.exists(response.body.token)
    assert.equal(response.body.user.email, userJson.email)
  })
})
