import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePerfilStore = defineStore('perfil', () => {
  // Tenta carregar os dados salvos, ou usa valores padrão
  const nomeUsuario = ref(localStorage.getItem('planejei_nomeUsuario') || 'Professor Teste');
  const escolas = ref(JSON.parse(localStorage.getItem('planejei_escolas')) || [{ id: 1, nome: 'Escola Padrão' }]);
  const turmasSelecionadas = ref(JSON.parse(localStorage.getItem('planejei_turmas')) || []);

  // AÇÃO PARA SALVAR: Só salva no localStorage quando esta função é chamada
  const salvarAlteracoes = () => {
    localStorage.setItem('planejei_nomeUsuario', nomeUsuario.value);
    localStorage.setItem('planejei_escolas', JSON.stringify(escolas.value));
    localStorage.setItem('planejei_turmas', JSON.stringify(turmasSelecionadas.value));
    alert('Alterações salvas com sucesso!'); // Feedback para o usuário
  }

  const adicionarEscola = (nomeEscola) => {
    if (nomeEscola.trim() !== '') {
      escolas.value.push({ id: Date.now(), nome: nomeEscola });
    }
  }
  const removerEscola = (index) => {
    escolas.value.splice(index, 1);
  }

  return { nomeUsuario, escolas, turmasSelecionadas, adicionarEscola, removerEscola, salvarAlteracoes }
})