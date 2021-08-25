import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Coordinator from 'App/Models/Coordinator'
import User from 'App/Models/User'

export default class CoordinatorSeeder extends BaseSeeder {
  public async run() {
    const user = await User.updateOrCreate(
      { email: 'dcc@gmail.com.br' },
      {
        name: 'Coordenador do DCC',
        email: 'dcc@gmail.com.br',
        password: 'dcc123',
      }
    )
    //professors doesnt need any parameter in creation
    const coordinator = await Coordinator.updateOrCreate({ userId: user.id }, { userId: user.id })

    coordinator.related('user').associate(user)
  }
}
