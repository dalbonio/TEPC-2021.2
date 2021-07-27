import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Login', () => {
  test('ensure login request is working', async (assert) => {
    /**
     * Make request
     */
    const userJson = { email: 'dalbonio2@gmail.com', password: 'senha' }

    const response = await supertest(BASE_URL).post('/api/login').send(userJson).expect(200)
    //const user = User.find_by_email(userJson.email);
    assert.exists(response.body.token)
    assert.equal(response.body.email, user.email)
    assert.equal(response.body.name, user.name)
  })
})
