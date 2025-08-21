<template>
  <div class="modal-overlay" @click.self="$emit('fechar')">
    <div class="modal-box">
      <VueDatePicker
        v-model="dataSelecionada"
        range
        multi-calendars
        inline
        :enable-time-picker="false"
        locale="pt-BR"
        select-text="Aplicar"
        cancel-text="Limpar"
        @update:model-value="onDateUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const emit = defineEmits(['fechar', 'aplicarFiltro']);

const dataSelecionada = ref();

// Esta função é chamada quando o usuário clica em "Aplicar"
const onDateUpdate = (data) => {
  if (data && data[0] && data[1]) {
    emit('aplicarFiltro', data);
    emit('fechar');
  }
}
</script>

<style>
/* Estilos globais para customizar o DatePicker */
:root {
  --dp-background-color: #ffffff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #1a3d5f; /* Azul escuro do menu */
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaa;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-highlight-color: rgba(26, 61, 95, 0.1);
}
</style>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>