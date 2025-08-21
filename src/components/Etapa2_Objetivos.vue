<template>
  <div class="form-step">
    <h2 class="step-title">Etapa 2: Objetivos e BNCC</h2>
    
    <div class="form-group">
      <label for="objetivo-aula">Objetivo da Aula:</label>
      <textarea id="objetivo-aula" class="form-input" rows="5" placeholder="1. Digite o primeiro objetivo e aperte Enter para o próximo..." v-model="planoStore.objetivoAula"></textarea>
    </div>

    <h3 class="subsection-title">BNCC</h3>

    <div class="form-row">
      <div class="form-group">
        <label for="objeto-disciplina">Objeto de Conhecimento da Disciplina:</label>
        <select id="objeto-disciplina" class="form-input" v-model="planoStore.objetoConhecimentoDisciplina">
          <option :value="null">Selecione um objeto...</option>
          <option v-for="objeto in objetosDisciplinaOptions" :key="objeto" :value="objeto">
            {{ objeto }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="habilidade-disciplina">Habilidade da Disciplina:</label>
        <select id="habilidade-disciplina" class="form-input" v-model="planoStore.habilidadeDisciplina" :disabled="!planoStore.objetoConhecimentoDisciplina">
          <option :value="null">Selecione uma habilidade...</option>
          <option v-for="habilidade in habilidadesDisciplinaOptions" :key="habilidade.CódigoHabilidade" :value="habilidade.CódigoHabilidade">
            {{ habilidade.CódigoHabilidade }} - {{ habilidade.Habilidade }}
          </option>
        </select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="objeto-computacao">Objeto de Conhecimento da Computação:</label>
        <select id="objeto-computacao" class="form-input" v-model="planoStore.objetoConhecimentoComputacao">
          <option :value="null">Selecione um objeto...</option>
          <option v-for="objeto in objetosComputacaoOptions" :key="objeto" :value="objeto">
            {{ objeto }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="habilidade-computacao">Habilidade de Computação:</label>
        <select id="habilidade-computacao" class="form-input" v-model="planoStore.habilidadeComputacao" :disabled="!planoStore.objetoConhecimentoComputacao">
           <option :value="null">Selecione uma habilidade...</option>
          <option v-for="habilidade in habilidadesComputacaoOptions" :key="habilidade.CódigoHabilidade" :value="habilidade.CódigoHabilidade">
            {{ habilidade.CódigoHabilidade }} - {{ habilidade.Habilidade }}
          </option>
        </select>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePlanoStore } from '../stores/planoStore'

// 1. Importa os dados dos seus arquivos JSON
import dadosPortugues from '@/assets/bncc_lingua_portuguesa.json'
import dadosComputacao from '@/assets/bncc_computacao.json'

const planoStore = usePlanoStore()

// Variáveis para guardar as opções dos nossos dropdowns
const objetosDisciplinaOptions = ref([...new Set(dadosPortugues.map(item => item['Objeto de Conhecimento']))])
const objetosComputacaoOptions = ref([...new Set(dadosComputacao.map(item => item['Objeto de conhecimento']))])

// Esta lista de habilidades agora é RECALCULADA AUTOMATICAMENTE sempre que
// a seleção de 'Objeto de Conhecimento' da store mudar.
const habilidadesDisciplinaOptions = computed(() => {
  if (!planoStore.objetoConhecimentoDisciplina) {
    return [] // Se nenhum objeto selecionado, a lista é vazia
  }
  // Filtra a lista completa de habilidades para pegar só as que correspondem ao objeto selecionado
  return dadosPortugues.filter(item => item['Objeto de Conhecimento'] === planoStore.objetoConhecimentoDisciplina)
})

const habilidadesComputacaoOptions = computed(() => {
  if (!planoStore.objetoConhecimentoComputacao) {
    return []
  }
  return dadosComputacao.filter(item => item['Objeto de conhecimento'] === planoStore.objetoConhecimentoComputacao)
})
</script>

<style scoped>
.form-step { background-color: #fff; padding: 30px; border-radius: 8px; }
.step-title { margin-bottom: 20px; color: #333; }
.form-group { flex: 1; margin-bottom: 20px; }
.form-row { display: flex; gap: 30px; }
label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
.form-input, textarea, select { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; font-family: inherit; }
.subsection-title { margin-top: 20px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
select:disabled { background-color: #e9ecef; cursor: not-allowed; }
</style>