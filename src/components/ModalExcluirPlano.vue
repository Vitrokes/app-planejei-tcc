<template>
  <div class="modal-overlay" @click.self="listaPlanosStore.cancelarExclusao()">
    <div class="modal-box">
      <h3>Confirmar Exclusão</h3>
      <p>Você tem certeza que deseja excluir o plano de aula "<strong>{{ listaPlanosStore.planoParaExcluir.titulo }}</strong>"?</p>
      <p>Esta ação não pode ser desfeita.</p>

      <div class="form-group">
        <label for="senha-confirmacao">Para confirmar, digite sua senha:</label>
        <input type="password" id="senha-confirmacao" v-model="senha" @keyup.enter="handleConfirmar">
      </div>

      <div class="modal-actions">
        <button class="btn-cancelar" @click="listaPlanosStore.cancelarExclusao()">Cancelar</button>
        <button class="btn-excluir" @click="handleConfirmar">Excluir Plano</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useListaPlanosStore } from '../stores/listaPlanosStore';

const listaPlanosStore = useListaPlanosStore();
const senha = ref('');

const handleConfirmar = () => {
  listaPlanosStore.confirmarExclusao(senha.value);
}
</script>

<style scoped>
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-box { background: white; padding: 25px; border-radius: 8px; width: 400px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
h3 { margin-top: 0; }
.form-group { margin: 20px 0; }
label { display: block; margin-bottom: 5px; }
input { width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
button { padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
.btn-cancelar { background-color: #f1f1f1; }
.btn-excluir { background-color: #dc3545; color: white; }
</style>