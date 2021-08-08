/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from '../app/Models/User'

Route.get('/cadastrar', async ({ view }) => {
  return view.render('cadastrar')
})

Route.get('/login', async ({ view }) => {
  return view.render('login')
})

Route.get('/recuperarSenha', async ({ view }) => {
  return view.render('recuperar_senha')
})

Route.get('/enviarTrabalho', async ({ view }) => {
  return view.render('enviar_trabalho')
}).middleware(['webAuth', 'auth', 'userRole'])

Route.get('/alterarTrabalho', async ({ view }) => {
  return view.render('alterar_trabalho')
}).middleware(['webAuth', 'auth', 'userRole'])

Route.get('/cadastrarProposta', async ({ view }) => {
  return view.render('cadastrar_proposta')
}).middleware(['webAuth', 'auth', 'userRole'])

Route.get('/rejeitarSubmissao', async ({ view }) => {
  return view.render('rejeitar_submissao')
}).middleware(['webAuth', 'auth', 'userRole'])

Route.get('/verTrabalho', async ({ view }) => {
  return view.render('ver_trabalho')
}).middleware(['webAuth', 'auth', 'userRole'])

Route.get('/aprovacoesPendentes', async ({ view }) => {
  return view.render('aprovacoes_pendentes')
}).middleware(['webAuth', 'auth', 'userRole'])

Route.get('/listarPropostas', async ({ view }) => {
  return view.render('listar_propostas')
}).middleware(['webAuth', 'auth', 'userRole'])

Route.get('/listarTrabalhos', async ({ view }) => {
  return view.render('listar_trabalhos')
}).middleware(['webAuth', 'auth', 'userRole'])

// API routes

Route.post('/api/login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')
  const user = await User.findBy('email', email)
  console.log(`email: ${email}, password: ${password}, user: ${user}`)
  try {
    const token = await auth.use('api').attempt(email, password)
    return { user: user, token: token }
  } catch {
    return response.badRequest('Invalid credentials')
  }
})

Route.post('/api/logout', async ({ auth }) => {
  await auth.use('api').revoke()
  return {
    revoked: true,
  }
})

Route.group(() => {
  Route.post('createStudent', 'StudentsController.create')
  Route.post('createTcc', 'TccsController.create')
  Route.get('listTcc', 'TccsController.index')
  Route.get('detailTcc/:id', 'TccsController.details')
  Route.get('downloadTcc/:id', 'TccsController.download')
})
  .prefix('api')
  .middleware('auth')
