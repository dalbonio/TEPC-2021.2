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

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/example', async ({ view }) => {
  return view.render('example')
})

Route.get('/enviarTrabalho', async ({ view }) => {
  return view.render('enviar_trabalho')
})

Route.get('/alterarTrabalho', async ({ view }) => {
  return view.render('alterar_trabalho')
})

Route.get('/cadastrarProposta', async ({ view }) => {
  return view.render('cadastrar_proposta')
})

Route.get('/listarPropostas', async ({ view }) => {
  return view.render('listar_propostas')
})

Route.get('/listarTrabalhos', async ({ view }) => {
  return view.render('listar_trabalhos')
})

Route.get('/aprovacoesPendentes', async ({ view }) => {
  return view.render('aprovacoes_pendentes')
})