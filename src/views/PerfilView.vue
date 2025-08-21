<template>
  <div class="perfil-container">
    <h1>Meu Perfil</h1>

    <section class="secao-perfil">
      <h2>Dados Pessoais</h2>
      <div class="dados-pessoais-grid">
        <div class="foto-perfil">
          <label for="upload-foto">Foto de Perfil</label>
          <div class="foto-preview">
                <img v-if="fotoPreviewUrl" :src="fotoPreviewUrl" alt="Pré-visualização do perfil">
                <span v-else>👤</span>
            </div>
          <input type="file" id="upload-foto" @change="handleFotoUpload" hidden accept="image/jpeg, image/png">
          <label for="upload-foto" class="upload-button">Escolher arquivo</label>
        </div>
        <div class="form-group">
          <label for="nome-usuario">Nome Completo</label>
          <input type="text" id="nome-usuario" v-model="perfilStore.nomeUsuario" class="form-input">
        </div>
      </div>
    </section>

    <section class="secao-perfil">
      <h2>Minhas Escolas e Turmas</h2>
      
      <div class="form-group">
        <label>Escolas Cadastradas:</label>
        <ul class="lista-itens">
          <li v-for="(escola, index) in perfilStore.escolas" :key="index">
            <span>{{ escola.nome }}</span>
            <button @click="perfilStore.removerEscola(index)" class="remove-button">x</button>
          </li>
        </ul>
        <div class="add-new-container">
          <input type="text" v-model="novaEscola" @keyup.enter="handleAdicionarEscola" class="form-input-small" placeholder="Nome da nova escola...">
          <button @click="handleAdicionarEscola" class="add-button">+</button>
        </div>
      </div>

      <div class="form-group">
        <label>Turmas que leciona (6º ao 9º ano):</label>
        <div class="turmas-checkboxes">
          <div v-for="turma in turmasDisponiveis" :key="turma" class="checkbox-item">
            <input type="checkbox" :id="'turma-' + turma" :value="turma" v-model="perfilStore.turmasSelecionadas">
            <label :for="'turma-' + turma">{{ turma }}º Ano</label>
          </div>
        </div>
      </div>
    </section>
    
    <div class="acoes-finais">
      <button @click="salvar" class="salvar-button">Salvar Alterações</button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePerfilStore } from '../stores/perfilStore';

const perfilStore = usePerfilStore();
const novaEscola = ref('');
const turmasDisponiveis = ref([6, 7, 8, 9]);

const fotoPreviewUrl = ref(null);
const handleFotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    fotoPreviewUrl.value = URL.createObjectURL(file);
  }
}

const handleAdicionarEscola = () => {
  perfilStore.adicionarEscola(novaEscola.value);
  novaEscola.value = '';
}

const salvar = () => {
  perfilStore.salvarAlteracoes();
}
</script>

<style scoped>
.perfil-container { max-width: 800px; }
.secao-perfil {
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 25px;
  border: 1px solid #eee;
}
.secao-perfil h2 { margin-top: 0; }
.dados-pessoais-grid { display: flex; align-items: flex-end; gap: 30px; }
.foto-preview { width: 100px; height: 100px; background-color: #e9ecef; border-radius: 50%; margin-bottom: 10px; }
.upload-button { background-color: #f8f9fa; border: 1px solid #dee2e6; padding: 8px 12px; border-radius: 4px; cursor: pointer; text-align: center;}
.form-group { flex-grow: 1; }
.form-input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; }
.lista-itens { list-style: none; padding-left: 0; margin-top: 0; }
.lista-itens li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
}
.remove-button { background: #dc3545; color: white; border: none; border-radius: 50%; width: 22px; height: 22px; cursor: pointer; }
.add-new-container { display: flex; gap: 10px; margin-top: 15px; }
.form-input-small { flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
.add-button { padding: 5px 15px; font-size: 20px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; }
.turmas-checkboxes { display: flex; gap: 20px; }
.checkbox-item { display: flex; align-items: center; gap: 5px; }
.checkbox-item input { width: 18px; height: 18px; }
.acoes-finais { text-align: right; }
.salvar-button { background-color: #007bff; color: white; padding: 12px 25px; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; }
.foto-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.foto-preview span {
  font-size: 60px;
  color: #adb5bd;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>