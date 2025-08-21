import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useListaPlanosStore = defineStore('listaPlanos', () => {
  
  const dadosIniciais = [
  { 
    id: 2, status: 'realizada', titulo: 'História da Internet', data: '2025-06-20', turma: '8º Ano', 
    objetivo: 'Compreender a evolução da web.', tipoAtividade: 'normal',
    ocDisciplina: 'Leitura', ocComputacao: 'Sistemas distribuídos e internet',
    metodologia: ['Aula Expositiva com Atividade Prática'], recursosTecnologicos: ['Projetor Multimídia'],
    estrategiasEnsino: 'Apresentação de slides e debate.', materialDidatico: 'Livro "Redes de Computadores".',
    atividadesSugeridas: [], atividadeAdicional: 'Criar uma linha do tempo.', atividadeAvaliativa: false, referencias: 'Tanenbaum, A.'
  },
  { 
    id: 3, status: 'nao-realizada', titulo: 'O que é um Hardware?', data: '2025-05-15', turma: '7º Ano', 
    objetivo: 'Diferenciar hardware de software.', tipoAtividade: 'avaliativa',
    ocDisciplina: 'Leitura', ocComputacao: 'Armazenamento e Transmissão de dados',
    metodologia: ['Aprendizagem Baseada em Projetos'], recursosTecnologicos: ['Computadores'],
    estrategiasEnsino: 'Desmontar um computador antigo.', materialDidatico: 'Peças de computador.',
    atividadesSugeridas: [], atividadeAdicional: 'Montar um relatório fotográfico.', atividadeAvaliativa: true, referencias: 'Nenhuma.'
  },
  { 
    id: 4, status: 'realizada', titulo: 'Programação Básica', data: '2025-07-10', turma: '9º Ano', 
    objetivo: 'Introduzir conceitos básicos de programação.', tipoAtividade: 'normal',
    ocDisciplina: 'Leitura', ocComputacao: 'Algoritmos e Programação',
    metodologia: ['Aula Prática com Exercícios'], recursosTecnologicos: ['Ambiente de Programação Online'],
    estrategiasEnsino: 'Criar pequenos programas em blocos.', materialDidatico: 'Guia de Programação.',
    atividadesSugeridas: [], atividadeAdicional: 'Desenvolver um jogo simples.', atividadeAvaliativa: false, referencias: 'Scratch.'
  }
  ];

  const planos = ref(JSON.parse(localStorage.getItem('planejei_planos')) || dadosIniciais);
  // Variável para armazenar o plano que o usuário quer excluir
  // Inicialmente, ela é nula, pois nenhum plano está sendo editado ou excluído
  // Quando o usuário clica para excluir um plano, ela recebe o objeto desse plano
  const planoParaExcluir = ref(null); // Guarda o plano que o usuário quer apagar

  // Funções para iniciar, cancelar e confirmar a exclusão de um plano
  // Essas funções manipulam a variável planoParaExcluir e controlam o pop-up de confirmação
  const iniciarExclusao = (plano) => {
    planoParaExcluir.value = plano; // Define qual plano será apagado
  }

  // Função para cancelar a exclusão, limpando a variável e fechando o pop-up
  // Isso é útil se o usuário mudar de ideia e não quiser excluir o plano
  const cancelarExclusao = () => {
    planoParaExcluir.value = null; // Limpa a seleção e fecha o pop-up
  }

  // Função para confirmar a exclusão do plano
  // Ela verifica se a senha digitada pelo usuário está correta antes de excluir o plano
  const confirmarExclusao = (senhaDigitada) => {
    // Simulação de segurança: a senha correta é '123456'
    if (senhaDigitada !== '123456') {
      alert('Senha incorreta!');
      return; // Para a execução se a senha estiver errada
    }

    if (planoParaExcluir.value) {
      // Filtra a lista, mantendo apenas os planos que NÃO têm o ID do plano a ser excluído
      planos.value = planos.value.filter(p => p.id !== planoParaExcluir.value.id);
      cancelarExclusao(); // Fecha o pop-up
    }
  }

  // Observa mudanças na lista de planos e atualiza o localStorage
  // Sempre que a lista de planos for alterada, ela é salva no localStorage
  watch(planos, (novosPlanos) => {
    localStorage.setItem('planejei_planos', JSON.stringify(novosPlanos));
  }, { deep: true });

  // Funções para adicionar e atualizar planos
  // Essas funções permitem que novos planos sejam adicionados ou que planos existentes sejam atualizados
  const adicionarPlano = (novoPlano) => {
    planos.value.unshift(novoPlano);
  }

  // Função para atualizar um plano existente
  // Ela recebe o plano atualizado e substitui o plano antigo na lista
  const atualizarPlano = (planoAtualizado) => {
    const index = planos.value.findIndex(p => p.id === planoAtualizado.id);
    if (index !== -1) {
      planos.value[index] = planoAtualizado;
    }
  }

  // --- Filtro de Data ---
  // Variável para armazenar o filtro de data
  const filtroData = ref(null);

  // Função para aplicar o filtro de data
  // Ela recebe um array de datas e atualiza o filtroData
  const aplicarFiltroData = (datas) => {
    filtroData.value = datas;
  }

  // Função para resetar o filtro de data
  // Ela limpa o filtroData, permitindo que todos os planos sejam exibidos novamente
  const resetarFiltros = () => {
    filtroData.value = null;
  }

  // Retorna as variáveis e funções que serão usadas em outros componentes
  // Isso permite que outros componentes acessem a lista de planos e as funções de manipulação
  // como adicionar, atualizar e excluir planos
  return { 
    planos, 
    adicionarPlano, 
    atualizarPlano, 
    planoParaExcluir, // Exporta a nova variável
    iniciarExclusao,   // Exporta as novas funções
    cancelarExclusao, 
    confirmarExclusao,
    filtroData, // Exporta o estado do filtro
    aplicarFiltroData, // Exporta a função para aplicar o filtro
    resetarFiltros, // Exporta a função para resetar os filtros
  }
})