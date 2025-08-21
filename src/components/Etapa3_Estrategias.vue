<template>
  <div class="form-step">
    <h2 class="step-title">Etapa 3: Estratégias</h2>
    
    <div class="form-group">
      <label for="metodologia">Metodologia: <span class="required">*</span></label>
      <multi-select
        id="metodologia"
        v-model="planoStore.metodologia"
        :options="metodologiasPredefinidas"
        :multiple="true"
        :taggable="true"
        @tag="adicionarNovaMetodologia"
        placeholder="Selecione ou digite para adicionar"
        tag-placeholder="Pressione Enter para adicionar"
      ></multi-select>
    </div>

    <div class="form-group">
      <label for="estrategias-ensino">Estratégias de Ensino:</label>
      <textarea id="estrategias-ensino" class="form-input" rows="5" 
      placeholder="Descreva como a aula será conduzida..." 
      v-model="planoStore.estrategiasEnsino"></textarea>
    </div>

    <div class="form-group">
      <label for="recursos">Recursos Tecnológicos: <span class="required">*</span></label>
       <multi-select
        id="recursos"
        v-model="planoStore.recursosTecnologicos"
        :options="recursosPredefinidos"
        :multiple="true"
        :taggable="true"
        @tag="adicionarNovoRecurso"
        placeholder="Selecione ou digite para adicionar"
        tag-placeholder="Pressione Enter para adicionar"
      ></multi-select>
    </div>

    <div class="form-group">
      <label for="material-didatico">Material Didático:</label>
      <textarea id="material-didatico" class="form-input" rows="4" 
      placeholder="Cite o livro didático, apostilas, links..." 
      v-model="planoStore.materialDidatico"></textarea>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePlanoStore } from '../stores/planoStore'

// Ativa a "ficha" e a guarda na variável planoStore
const planoStore = usePlanoStore()

// --- Lógica para Metodologia (continua a mesma) ---
const metodologiasPredefinidas = ref(['Aprendizagem Baseada em Projetos', 'Sala de Aula Invertida', 'Gamificação'])
const adicionarNovaMetodologia = (novaTag) => {
  metodologiasPredefinidas.value.push(novaTag)
  planoStore.metodologia.push(novaTag) // Adiciona a nova tag direto na store
}

// --- Lógica para Recursos Tecnológicos (continua a mesma) ---
const recursosPredefinidos = ref(['Projetor Multimídia', 'Computadores', 'Software Educativo'])
const adicionarNovoRecurso = (novaTag) => {
  recursosPredefinidos.value.push(novaTag)
  planoStore.recursosTecnologicos.push(novaTag) // Adiciona o novo recurso direto na store
}
</script>

<style>
/* Estilo para sobrescrever o padrão da biblioteca e combinar com nosso design */
.multiselect__tags {
  border: 1px solid #ccc !important;
  border-radius: 4px !important;
}
.multiselect__tag {
  background: #1a3d5f !important; /* Azul escuro do menu */
}
.multiselect__option--highlight {
  background: #1a3d5f !important;
}
</style>

<style scoped>
.form-step { background-color: #fff; padding: 30px; border-radius: 8px; }
.step-title { margin-bottom: 20px; color: #333; }
.form-group { margin-bottom: 25px; }
label { display: block; margin-bottom: 10px; font-weight: bold; color: #555; }
.required { color: red; }
textarea.form-input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; font-family: inherit; }
</style>