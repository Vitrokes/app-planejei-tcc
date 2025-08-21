<template>
  <div class="form-step">
    <div class="header-visualizacao">
      <h2 class="step-title">Etapa 5: Visualização do Plano</h2>
      <button @click="gerarPDF" class="print-button">🖨️ Imprimir PDF</button>
    </div>
    
    <div ref="conteudoParaPDF" class="plano-completo">
      
      <section class="secao-resumo">
        <h3>Identificação</h3>
        <ul>
          <li><strong>Título da Aula:</strong> {{ planoStore.titulo }}</li>
          <li><strong>Escola:</strong> {{ planoStore.escola }}</li>
          <li><strong>Turma:</strong> {{ planoStore.turma }}</li>
          <li><strong>Data da Aula:</strong> {{ planoStore.dataAula }}</li>
          <li><strong>Duração da Aula:</strong> {{ planoStore.duracao }}</li>
        </ul>
      </section>

      <section class="secao-resumo">
        <h3>Objetivos e BNCC</h3>
        <ul>
          <li><strong>Objetivo da Aula:</strong> {{ planoStore.objetivoAula }}</li>
          <li><strong>Objeto de Conhecimento (Disciplina):</strong> {{ planoStore.objetoConhecimentoDisciplina || 'Não definido' }}</li>
          <li><strong>Habilidade (Disciplina):</strong> {{ habilidadeDisciplinaCompleta }}</li>
          <li><strong>Objeto de Conhecimento (Computação):</strong> {{ planoStore.objetoConhecimentoComputacao || 'Não definido' }}</li>
          <li><strong>Habilidade (Computação):</strong> {{ habilidadeComputacaoCompleta }}</li>
        </ul>
      </section>

      <section class="secao-resumo">
        <h3>Estratégias</h3>
        <ul>
          <li><strong>Metodologia:</strong> {{ planoStore.metodologia.join(', ') }}</li>
          <li><strong>Estratégias de Ensino:</strong> {{ planoStore.estrategiasEnsino }}</li>
          <li><strong>Recursos Tecnológicos:</strong> {{ planoStore.recursosTecnologicos.join(', ') }}</li>
          <li><strong>Material Didático:</strong> {{ planoStore.materialDidatico }}</li>
        </ul>
      </section>

      <section class="secao-resumo">
        <h3>Atividades Propostas e Referências</h3>
        <ul>
          <li><strong>Atividades Sugeridas:</strong> {{ planoStore.atividadesSugeridas.map(a => a.texto).join(', ') }}</li>
          <li><strong>Atividade Adicional:</strong> {{ planoStore.atividadeAdicional }}</li>
          <li><strong>É Avaliativa:</strong> {{ planoStore.atividadeAvaliativa ? 'Sim' : 'Não' }}</li>
          <li><strong>Referências:</strong> {{ planoStore.referencias }}</li>
        </ul>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import html2pdf from 'html2pdf.js';
import { usePlanoStore } from '../stores/planoStore';
import { useListaPlanosStore } from '../stores/listaPlanosStore';
import { useRouter } from 'vue-router';
import logo from '@/assets/logo.png';

// Importa os dados da BNCC para podermos pesquisar neles
import dadosPortugues from '@/assets/bncc_lingua_portuguesa.json';
import dadosComputacao from '@/assets/bncc_computacao.json';

const planoStore = usePlanoStore();
const listaPlanosStore = useListaPlanosStore();
const router = useRouter();

// Esta variável inteligente procura o texto completo da habilidade de disciplina
const habilidadeDisciplinaCompleta = computed(() => {
  if (!planoStore.habilidadeDisciplina) return 'Não definida';
  const habilidadeEncontrada = dadosPortugues.find(h => h.CódigoHabilidade === planoStore.habilidadeDisciplina);
  return habilidadeEncontrada ? `${habilidadeEncontrada.CódigoHabilidade} - ${habilidadeEncontrada.Habilidade}` : planoStore.habilidadeDisciplina;
});

// Esta faz o mesmo para a habilidade de computação
const habilidadeComputacaoCompleta = computed(() => {
  if (!planoStore.habilidadeComputacao) return 'Não definida';
  const habilidadeEncontrada = dadosComputacao.find(h => h.CódigoHabilidade === planoStore.habilidadeComputacao);
  return habilidadeEncontrada ? `${habilidadeEncontrada.CódigoHabilidade} - ${habilidadeEncontrada.Habilidade}` : planoStore.habilidadeComputacao;
});

const conteudoParaPDF = ref(null);

const gerarPDF = () => {
  // 1. A lógica para criar o nome do arquivo com base no título e turma
  const titulo = planoStore.titulo || 'plano_de_aula';
  const turma = planoStore.turma || '';

  const nomeArquivoLimpo = `${titulo}_${turma}`
    .toLowerCase()
    .replace(/º/g, 'o')
    .replace(/ /g, '_')
    .replace(/[^\w\d_.-]/g, '');

  const elemento = conteudoParaPDF.value;
  
  // 2. Cria um HTML para o cabeçalho com a logo importada
  const cabecalho = `
  <div style="text-align: center; margin-bottom: 20px;">
    <div style="
      width: 180px; 
      height: 90px; 
      margin: 0 auto; 
      background-color: #144994; 
      border-radius: 50%; 
      background-image: url(${logo}); 
      background-repeat: no-repeat; 
      background-position: center; 
      background-size: 120px;
    ">
    </div>
  </div>
  `;

  // 3. Juntamos o HTML do cabeçalho com o HTML do nosso plano de aula
  const htmlCompleto = cabecalho + elemento.innerHTML;
  
  // 4. As opções do PDF continuam as mesmas
  const opt = {
    margin:       1,
    filename:     `${nomeArquivoLimpo}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // 5. Mandamos gerar o PDF a partir do HTML completo
  html2pdf().set(opt).from(htmlCompleto).save();
}

const determinarTipoAtividade = () => {
  if (planoStore.atividadeAvaliativa) {
    return 'avaliativa'; // Ícone vermelho
  }
  if (planoStore.atividadesSugeridas.length > 0 || planoStore.atividadeAdicional.trim() !== '') {
    return 'normal'; // Ícone verde
  }
  return 'nenhuma'; // Ícone cinza
}

// Esta função determina o status do plano automaticamente
// Ela verifica se os campos obrigatórios estão preenchidos e a data da aula
const determinarStatusAutomatico = () => {
  // Verificação de Campos Obrigatórios
  const isCompleto = 
    planoStore.titulo.trim() !== '' &&
    planoStore.dataAula !== '' &&
    planoStore.metodologia.length > 0 &&
    planoStore.recursosTecnologicos.length > 0 &&
    planoStore.referencias.trim() !== '';
  
  if (!isCompleto) {
    return 'elaboracao'; // VERMELHO (Incompleto)
  }

  // Verificação da Data
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const [ano, mes, dia] = planoStore.dataAula.split('-').map(Number);
  const dataDaAula = new Date(ano, mes - 1, dia);

  if (dataDaAula >= hoje) {
    return 'nao-realizada'; // AMARELO (Planejada para hoje ou futuro)
  } else {
    return 'realizada'; // VERDE (Aula já passou)
  }
};

// Esta função será chamada pelo botão SALVAR que está na tela principal do wizard
const salvarPlano = () => {
  const planoData = {
    id: planoStore.idPlanoEmEdicao || Date.now(),
    status: determinarStatusAutomatico(),
    titulo: planoStore.titulo,
    data: planoStore.dataAula,
    turma: planoStore.turma,
    ocDisciplina: planoStore.objetoConhecimentoDisciplina,
    habilidadeDisciplina: planoStore.habilidadeDisciplina, 
    ocComputacao: planoStore.objetoConhecimentoComputacao,
    habilidadeComputacao: planoStore.habilidadeComputacao,
    objetivo: planoStore.objetivoAula, // Salva o objetivo completo
    tipoAtividade: determinarTipoAtividade(),
    metodologia: planoStore.metodologia,
    estrategiasEnsino: planoStore.estrategiasEnsino,
    recursosTecnologicos: planoStore.recursosTecnologicos,
    materialDidatico: planoStore.materialDidatico,
    atividadesSugeridas: planoStore.atividadesSugeridas,
    atividadeAdicional: planoStore.atividadeAdicional,
    atividadeAvaliativa: planoStore.atividadeAvaliativa,
    referencias: planoStore.referencias
  };

  if (planoStore.idPlanoEmEdicao) {
    listaPlanosStore.atualizarPlano(planoData);
  } else {
    listaPlanosStore.adicionarPlano(planoData);
  }

  planoStore.resetFormulario();
  router.push('/dashboard');
};

// Disponibilizamos a função salvar para o componente pai
defineExpose({
  salvarPlano
});

</script>

<style scoped>
.form-step { background-color: #fff; padding: 30px; border-radius: 8px; }
.header-visualizacao { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.step-title { margin: 0; }
.print-button { background-color: #1a3d5f; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; }
.print-button:hover { background-color: #2c5d8a; }

.plano-completo { border: 1px solid #eee; padding: 20px; border-radius: 4px; }
.secao-resumo { margin-bottom: 20px; page-break-inside: avoid;}
.secao-resumo h3 { border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px; }
.secao-resumo ul { list-style: none; padding-left: 0; }
.secao-resumo li { margin-bottom: 8px; }
</style>