<script setup>
import { ref } from 'vue'
import Etapa1_Identificacao from '../components/Etapa1_Identificacao.vue'
import Etapa2_Objetivos from '../components/Etapa2_Objetivos.vue'
import Etapa3_Estrategias from '../components/Etapa3_Estrategias.vue'
import Etapa4_Atividades from '../components/Etapa4_Atividades.vue'
import Etapa5_Visualizacao from '../components/Etapa5_Visualizacao.vue'

const etapa5Component = ref(null);
const etapaAtual = ref(1) // Variável que controla qual etapa estamos vendo
const proximaEtapa = () => {
  if (etapaAtual.value < 5) {
    etapaAtual.value++; // Aumenta o número da etapa
  }
}

const etapaAnterior = () => {
  if (etapaAtual.value > 1) {
    etapaAtual.value--; // Diminui o número da etapa
  }
}
</script>

<template>
  <div class="criacao-plano-container">
    <h1>Criação de Novo Plano de Aula</h1>

    <div class="wizard-progress">
        <div class="step" :class="{ 'active': etapaAtual === 1, 'completed': etapaAtual > 1 }">Identificação</div>
        <div class="step" :class="{ 'active': etapaAtual === 2, 'completed': etapaAtual > 2 }">Objetivos</div>
        <div class="step" :class="{ 'active': etapaAtual === 3, 'completed': etapaAtual > 3 }">Estratégias</div>
        <div class="step" :class="{ 'active': etapaAtual === 4, 'completed': etapaAtual > 4 }">Atividades Propostas e Referências</div>
        <div class="step" :class="{ 'active': etapaAtual === 5 }">Visualização</div>
    </div>

    <div class="wizard-content">
      <Etapa1_Identificacao v-if="etapaAtual === 1" />
      <Etapa2_Objetivos v-if="etapaAtual === 2" />
      <Etapa3_Estrategias v-if="etapaAtual === 3" />
      <Etapa4_Atividades v-if="etapaAtual === 4" />
      <Etapa5_Visualizacao v-if="etapaAtual === 5" ref="etapa5Component"/>
      </div>

    <div class="wizard-navigation">
        <button @click="etapaAnterior" v-if="etapaAtual > 1">Voltar</button>
        <button @click="proximaEtapa" v-if="etapaAtual < 5">Avançar</button>
        <button v-if="etapaAtual === 5" @click="etapa5Component.salvarPlano">Salvar</button>
    </div>
  </div>
</template>

<style scoped>
.criacao-plano-container {
  width: 100%;
}
.wizard-progress {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.step {
  color: #adb5bd; /* Cor para etapas futuras (cinza claro) */
  font-weight: bold;
  transition: color 0.4s ease;
}
.step.completed {
  color: #6c757d; /* Cor para etapas já passadas (cinza escuro) */
}
.step.active {
  color: #1a3d5f; /* Cor para a etapa ATUAL (azul escuro) */
}
.wizard-navigation {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
button {
  padding: 10px 20px;
  border: 1px solid #007bff;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  border-color: #ccc;
  cursor: not-allowed;
}
button[v-if="etapaAtual > 1"] { /* Estilo do botão voltar */
  background-color: white;
  color: #007bff;
}
</style>