import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Coordinator from 'App/Models/Coordinator'
import User from 'App/Models/User'

export default class CoordinatorSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    // Write your database queries inside the run method
    const user = await User.create({
      name: 'Coordenador Teste',
      email: 'coordenador@email.com',
      password: 'senha',
    })
    //professors doesnt need any parameter in creation
    const coordinator = await Coordinator.create({ userId: user.id })

    coordinator.related('user').associate(user)
  }
}
