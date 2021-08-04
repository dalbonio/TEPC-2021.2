import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Coordinator from 'App/Models/Coordinator'
import User from 'App/Models/User'

export default class CoordinatorSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const user = await User.create({ email: 'coordenador@email.com', password: 'senha' })
    //professors doesnt need any parameter in creation
    const coordinator = await Coordinator.create({})

    coordinator.related('user').associate(user)
  }
}
