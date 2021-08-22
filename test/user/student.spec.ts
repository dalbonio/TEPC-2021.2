import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Student', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('student is being created', async (assert) => {
    /**
     * Make request
     */
    const userJson = {
      email: 'example3@email.com',
      name: 'Lucas',
      password: 'senha',
      registrationNumber: '121212121',
    }
    const res = await supertest(BASE_URL).post('/api/createStudent').send(userJson).expect(200)
    //const user = User.find_by_email(userJson.email);
    assert.equal(res.body.user.name, userJson.name)
    assert.equal(res.body.user.id, res.body.student.user_id)
    assert.equal(res.body.student.registration_number, userJson.registrationNumber)

    const errRes = await supertest(BASE_URL).post('/api/createStudent').send(userJson).expect(200)
    assert.exists(errRes.body.error)
    assert.equal(errRes.body.error, 'Usuário já está em uso')
  })
})
