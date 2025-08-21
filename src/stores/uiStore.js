import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const mostrarModalData = ref(false)
  function toggleModalData() {
    mostrarModalData.value = !mostrarModalData.value
  }
  return { mostrarModalData, toggleModalData }
})