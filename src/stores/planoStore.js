import { ref } from 'vue'
import { defineStore } from 'pinia'

// Criamos e exportamos nossa "ficha" de plano de aula
export const usePlanoStore = defineStore('plano', () => {
  
  // --- Identificação ---
  const titulo = ref('');
  const escola = ref('Escola Estadual Profª. Maria Silva'); // Já vem preenchido
  const turma = ref('');
  const dataAula = ref('');
  const duracao = ref('50 minutos');
  const idPlanoEmEdicao = ref(null);

  // --- Objetivos e BNCC ---
  const objetivoAula = ref('');
  const objetoConhecimentoDisciplina = ref(null);
  const habilidadeDisciplina = ref(null);
  const objetoConhecimentoComputacao = ref(null);
  const habilidadeComputacao = ref(null);

  // --- Estratégias ---
  const metodologia = ref([]); // Será uma lista de metodologias selecionadas
  const estrategiasEnsino = ref('');
  const recursosTecnologicos = ref([]); // Será uma lista de recursos selecionados
  const materialDidatico = ref('');

  // --- Atividades e Referências ---
  const atividadesSugeridas = ref([
  { id: 1, texto: 'Debate em grupo sobre o tema' },
  { id: 2, texto: 'Criação de um mapa mental' },
  { id: 3, texto: 'Pesquisa orientada na internet' }
  ]);
  const atividadeAdicional = ref('');
  const atividadeAvaliativa = ref(false); // Começa como não avaliativa
  const referencias = ref('');

  // --- Limpar o Formulário ---
  // Uma função que mora aqui e pode ser chamada de qualquer lugar para limpar a ficha
  const resetFormulario = () => {
    idPlanoEmEdicao.value = null;
    titulo.value = '';
    turma.value = '';
    dataAula.value = '';
    duracao.value = '50 minutos';
    objetivoAula.value = '';
    objetoConhecimentoDisciplina.value = null;
    habilidadeDisciplina.value = null;
    objetoConhecimentoComputacao.value = null;
    habilidadeComputacao.value = null;
    metodologia.value = [];
    estrategiasEnsino.value = '';
    recursosTecnologicos.value = [];
    materialDidatico.value = '';
    atividadesSugeridas.value = [];
    atividadeAdicional.value = '';
    atividadeAvaliativa.value = false;
    referencias.value = '';
  }

  // No final, disponibilizamos todas as nossas variáveis e funções para os outros componentes
  return { 
    idPlanoEmEdicao,
    titulo, escola, turma, dataAula, duracao,
    objetivoAula, objetoConhecimentoDisciplina, habilidadeDisciplina, objetoConhecimentoComputacao, habilidadeComputacao,
    metodologia, estrategiasEnsino, recursosTecnologicos, materialDidatico,
    atividadesSugeridas, atividadeAdicional, atividadeAvaliativa, referencias,
    resetFormulario
  }
})