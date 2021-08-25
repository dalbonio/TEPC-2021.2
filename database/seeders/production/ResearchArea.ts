import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ResearchArea from 'App/Models/ResearchArea'

export default class ResearchAreaSeeder extends BaseSeeder {
  public async run() {
    await ResearchArea.updateOrCreateMany('name', [
      { name: 'Inteligência Computacional' },
      { name: 'Otimização Combinatória' },
      { name: 'Grafos e Algoritmos' },
      { name: 'Teoria dos Grafos' },
      { name: 'Análise de Algoritmos' },
      { name: 'Lógicas clássica e não clássicas' },
      { name: 'Computação Gráfica' },
      { name: 'Computação de Alta Performance' },
      { name: 'Computação em Nuvem' },
      { name: 'Computação Paralela Baseada em GPU' },
      { name: 'Simulações Baseadas em Autômato Celular' },
      { name: 'Entretenimento Digital com Jogos' },
      { name: 'Busca e Recuperação de Informação' },
      { name: 'Inteligência Artificial' },
      { name: 'Aprendizado de Máquina' },
      { name: 'Sistemas de Recomendação' },
      { name: 'Mineração de Dados' },
      { name: 'Processamento de Linguagem Natural' },
      { name: 'Informática na Educação' },
      { name: 'Informática em Saúde' },
      { name: 'Redes de Computadores' },
      { name: 'Sistemas Distribuídos e Paralelos' },
      { name: 'Redes Sem Fio IEEE 802.11' },
      { name: 'Engenharia de Software' },
      { name: 'Estruturas de Dados' },
    ])
  }
}
