<script setup>
import { ref, onMounted, computed} from 'vue'
import CardPlanoAula from '../components/CardPlanoAula.vue'
import ModalFiltroData from '../components/ModalFiltroData.vue'
import { useUiStore } from '../stores/uiStore'
import { useListaPlanosStore } from '../stores/listaPlanosStore' // Fonte de dados
import ModalExcluirPlano from '../components/ModalExcluirPlano.vue'

const uiStore = useUiStore()
const listaPlanosStore = useListaPlanosStore() // Ativamos nosso "banco de dados"

// A lista de recentes lê os 5 primeiros planos da nossa store oficial. Perfeito.
const planosRecentes = computed(() => listaPlanosStore.planos.slice(0, 5));

// A lista 'todosOsPlanos' local foi REMOVIDA daqui.

// Esta será a lista que realmente aparece na tela, na seção "Todos os Planos".
const planosFiltrados = ref([]);

const filtroData = ref(null); 

// --- Filtro ---
const parseDate = (dateString) => {
  // Esta função lida com o formato AAAA-MM-DD
  const [year, month, day] = dateString.split('-').map(Number);
  // Cria a data no fuso horário local para evitar bugs de um dia a menos
  return new Date(year, month - 1, day);
}

const aplicarFiltroDeData = (datas) => {
  // Se o usuário limpar o filtro (datas será nulo), mostra todos os planos
  if (!datas) {
    planosFiltrados.value = listaPlanosStore.planos; // MUDANÇA: Usa a lista da store
    filtroData.value = null;
    return;
  }

  const [inicio, fimOriginal] = datas;

  // Se o usuário selecionou apenas um dia, o 'fim' pode ser nulo.
  // Nesse caso, consideramos o fim como sendo o mesmo dia do início.
  const fim = fimOriginal || inicio;

  // Ajuste da data de fim para o último segundo daquele dia.
  fim.setHours(23, 59, 59, 999);

  filtroData.value = [inicio, fim];

  // Filtra a lista OFICIAL da nossa store.
  planosFiltrados.value = listaPlanosStore.planos.filter(plano => {
    const dataPlano = parseDate(plano.data);
    return dataPlano >= inicio && dataPlano <= fim;
  });
}

// Esta função garante que, ao carregar a página, a lista seja preenchida com os dados da store
onMounted(() => {
  // A lista é preenchida com os dados da store oficial.
  planosFiltrados.value = listaPlanosStore.planos;
});
</script>

<template>
  <div>
    <div class="dashboard-content">
      <h1>Meus Planos de Aula</h1>
      
      <section class="recentes-section">
        <h2>Recentes:</h2>
        <div class="cards-wrapper recentes-wrapper">
          <CardPlanoAula 
            v-for="plano in planosRecentes"
            :key="plano.id"
            :plano="plano"
          />
        </div>
      </section>

      <section class="todos-planos-section">
        <h2>Todos os Planos:</h2>
        <div class="cards-wrapper todos-wrapper">
          <CardPlanoAula 
            v-for="plano in planosFiltrados"
            :key="plano.id"
            :plano="plano" 
            />
        </div>
      </section>
    </div>

    <ModalFiltroData 
      v-if="uiStore.mostrarModalData" 
      @fechar="uiStore.toggleModalData()"
      @aplicar-filtro="aplicarFiltroDeData"
    />

    <ModalExcluirPlano v-if="listaPlanosStore.planoParaExcluir" @fechar="listaPlanosStore.cancelarExclusao()" />

  </div>
</template>

<style scoped>
.dashboard-content h1 {
  margin-bottom: 20px;
}
.dashboard-content h2 {
  margin-bottom: 10px;
}
.cards-wrapper {
  display: flex;
}
.recentes-wrapper {
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 20px;
  gap: 20px;
}
.todos-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  gap: 20px;
}
.recentes-wrapper::-webkit-scrollbar {
  height: 8px;
}
.recentes-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.recentes-wrapper::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
.recentes-wrapper::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>