<template>
  <div class="form-step">
    <h2 class="step-title">Etapa 4: Atividades Propostas e Referências</h2>
    
    <div class="form-group">
      <label>Atividades Sugeridas:</label>
      <div class="pill-group">
        <div class="pill" v-for="atividade in planoStore.atividadesSugeridas" :key="atividade.id">
          <span>{{ atividade.texto }}</span>
          <button @click="removerAtividadeSugerida(atividade.id)" class="remove-pill">x</button>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="add-atividade">Adicionar Atividade:</label>
      <textarea id="add-atividade" class="form-input" rows="4" placeholder="Escreva uma atividade..." v-model="planoStore.atividadeAdicional"></textarea>
      <div class="checkbox-container">
        <input type="checkbox" id="avaliativa" v-model="planoStore.atividadeAvaliativa" />
        <label for="avaliativa" class="checkbox-label">Avaliativa</label>
      </div>
    </div>

    <hr class="separator" />

    <div class="form-group">
      <label for="referencias">Referências: <span class="required">*</span></label>
      <textarea id="referencias" class="form-input" rows="5" placeholder="Liste até 5 referências. Pelo menos uma é obrigatória." v-model="planoStore.referencias"></textarea>
    </div>

  </div>
</template>

<script setup>
import { usePlanoStore } from '../stores/planoStore'

// Ativa a nossa "ficha"
const planoStore = usePlanoStore()

// Esta função modifica a lista que está DENTRO da nossa ficha central
const removerAtividadeSugerida = (idParaRemover) => {
  planoStore.atividadesSugeridas = planoStore.atividadesSugeridas.filter(atividade => atividade.id !== idParaRemover)
}
</script>

<style scoped>
.form-step { background-color: #fff; padding: 30px; border-radius: 8px; }
.step-title { margin-bottom: 20px; color: #333; }
.form-group { margin-bottom: 25px; }
label { display: block; margin-bottom: 10px; font-weight: bold; color: #555; }
.required { color: red; }
.form-input, textarea { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; font-family: inherit; }
.pill-group { display: flex; flex-wrap: wrap; gap: 10px; }
.pill {
  display: flex;
  align-items: center;
  background-color: #e9ecef;
  color: #495057;
  padding: 8px 8px 8px 15px;
  border-radius: 20px;
  font-size: 14px;
}
.remove-pill {
  background: #adb5bd;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.remove-pill:hover { background: #6c757d; }
.checkbox-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.checkbox-label {
  margin-left: 8px;
  font-weight: normal;
}
#avaliativa {
  width: 16px;
  height: 16px;
}
.separator {
  border: none;
  border-top: 1px solid #eee;
  margin: 30px 0;
}
</style>