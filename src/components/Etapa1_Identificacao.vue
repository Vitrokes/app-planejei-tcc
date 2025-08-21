<template>
  <div class="form-step">
    <h2 class="step-title">Etapa 1: Identificação</h2>

    <div class="form-group">
      <label for="titulo-aula">Título da Aula: <span class="required">*</span></label>
      <input type="text" id="titulo-aula" class="form-input" v-model="planoStore.titulo" />
    </div>

    <div class="form-group">
      <label for="escola">Escola:</label>
      <select id="escola" class="form-input" v-model="planoStore.escola">
        <option disabled value="">Selecione uma escola</option>
        <option v-for="escola in perfilStore.escolas" :key="escola.id" :value="escola.nome">
          {{ escola.nome }}
        </option>
      </select>
    </div>

    <div class="form-row">
    <div class="form-group">
        <label for="turma">Turma:</label>
        <select id="turma" class="form-input" v-model="planoStore.turma">
            <option disabled value="">Selecione uma turma</option>
            <option v-for="turma in perfilStore.turmasSelecionadas.sort()" :key="turma" :value="turma + 'º Ano'">
              {{ turma }}º Ano
            </option>
          </select>
    </div>

  <div class="form-group">
    <label for="data-aula">Data da Aula: <span class="required">*</span></label>
    <input type="date" id="data-aula" class="form-input" v-model="planoStore.dataAula" />
  </div>

  <div class="form-group">
    <label for="duracao">Duração da Aula:</label>
    <select id="duracao" class="form-input" v-model="planoStore.duracao">
      <option>50 minutos</option>
      <option>1 hora e 40 minutos (2 aulas)</option>
      </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePlanoStore } from '../stores/planoStore'
import { usePerfilStore } from '../stores/perfilStore'

// Ativa a nossa "ficha" e a guarda na variável planoStore
const planoStore = usePlanoStore()
const perfilStore = usePerfilStore()
</script>

<style scoped>
.form-step {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
}
.step-title {
  margin-bottom: 20px;
  color: #333;
}
.form-group {
  margin-bottom: 15px;
}
.form-row {
  display: flex;
  gap: 20px;
}
.form-row .form-group {
  flex-grow: 1;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}
.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
input:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}
.required { 
  color: red; 
}
</style>