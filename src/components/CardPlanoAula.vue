<template>
  <div class="card-container" :class="plano.status">
    <div class="card-header">
      <h3 class="card-title">{{ plano.titulo }}</h3>
      <span class="card-date">{{ plano.data }}</span>
    </div>
    <div class="card-body">
      <p><strong>Turma:</strong> {{ plano.turma }}</p>
      <p class="card-info-truncate"><strong>OC Disciplina:</strong> {{ plano.ocDisciplina }}</p>
      <p class="card-info-truncate"><strong>OC Computação:</strong> {{ plano.ocComputacao }}</p>
      <p class="card-objetivo"><strong>Objetivo:</strong> {{ plano.objetivo }}</p>
    </div>
    <div class="card-footer">
      <div class="footer-left">
        <img :src="iconeAtividade" alt="Status da atividade" class="activity-icon-img">
      </div>
      <div class="footer-right">
        <button @click="editarPlano" class="icon-button">✏️</button>
        <button @click="listaPlanosStore.iniciarExclusao(plano)" class="icon-button">🗑️</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePlanoStore } from '../stores/planoStore'

import iconeAvaliativa from '@/assets/com_atividade_avaliativa.png'
import iconeNormal from '@/assets/com_atividade.png'
import iconeNenhuma from '@/assets/sem_atividade.png'

import { useListaPlanosStore } from '../stores/listaPlanosStore'

// Importa o store de lista de planos
// Ele é usado para acessar a lista de planos e as funções de manipulação
const listaPlanosStore = useListaPlanosStore()

// O card agora recebe um único objeto "plano" com todas as informações
const props = defineProps({
  plano: Object 
})

const planoStore = usePlanoStore()
const router = useRouter()

const editarPlano = () => {
  // Copia todos os dados do plano clicado para a nossa "ficha" central
  planoStore.idPlanoEmEdicao = props.plano.id;
  planoStore.titulo = props.plano.titulo;
  planoStore.turma = props.plano.turma;
  planoStore.dataAula = props.plano.data;
  planoStore.objetivoAula = props.plano.objetivo;
  planoStore.objetoConhecimentoDisciplina = props.plano.ocDisciplina;
  planoStore.habilidadeDisciplina = props.plano.habilidadeDisciplina; 
  planoStore.objetoConhecimentoComputacao = props.plano.ocComputacao;
  planoStore.habilidadeComputacao = props.plano.habilidadeComputacao;
  planoStore.metodologia = props.plano.metodologia || [];
  planoStore.estrategiasEnsino = props.plano.estrategiasEnsino || '';
  planoStore.recursosTecnologicos = props.plano.recursosTecnologicos || [];
  planoStore.materialDidatico = props.plano.materialDidatico || '';
  planoStore.atividadesSugeridas = props.plano.atividadesSugeridas || [];
  planoStore.atividadeAdicional = props.plano.atividadeAdicional || '';
  planoStore.atividadeAvaliativa = props.plano.atividadeAvaliativa || false;
  planoStore.referencias = props.plano.referencias || '';

  // Leva o usuário para a tela de criação
  router.push('/planos/novo');
}

// O computed agora lê de 'props.plano.tipoAtividade'
const iconeAtividade = computed(() => {
  if (props.plano.tipoAtividade === 'avaliativa') return iconeAvaliativa;
  if (props.plano.tipoAtividade === 'normal') return iconeNormal;
  return iconeNenhuma;
});
</script>

<style scoped>
.card-container {
  background-color: #fafafa;
  border-left: 5px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 10px;
  width: 280px;
  display: flex;
  flex-direction: column;
}
.card-container.realizada { border-left-color: #28a745; }
.card-container.nao-realizada { border-left-color: #ffc107; }
.card-container.elaboracao { border-left-color: #dc3545; }

.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.card-title { margin: 0; font-size: 16px; font-weight: bold; }
.card-date { font-size: 12px; color: #6c757d; }
.card-body { flex-grow: 1; }
.card-body p { margin: 5px 0; font-size: 13px; color: #333; }
.card-info-truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.card-objetivo { 
  overflow: hidden;
  text-overflow: ellipsis; 
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 2; 
  line-clamp: 2;
}
.card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
.activity-icon-img { width: 24px; height: 24px; }
.footer-right { display: flex; gap: 8px; }
.icon-button { background: none; border: none; font-size: 20px; cursor: pointer; }
</style>