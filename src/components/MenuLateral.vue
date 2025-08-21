<template>
    <aside class="menu-container">
      <div @click="voltarParaInicio" class="logo-link">
        <img :src="logoPlanejei" alt="Logo Planejei - Início" class="logo-img">
      </div>
  <div class="menu-top">
    <router-link to="/perfil" class="nav-button">
      <span>👤</span> 
      <span>Perfil</span>
    </router-link>
        <router-link to="/planos/novo" class="nav-button">
        <span>➕</span>
        <span>Novo Plano</span>
    </router-link>
  </div>

  <div class="filters-section">
    <div class="filters-header">Filtros</div>
    <div class="filter-option">Por Bimestre</div>
    <div class="filter-option">Por Turma</div>
    <div class="filter-option">Por Objetivos</div>
    <div class="filter-option">OC Disciplina</div>
    <div class="filter-option">OC Computação</div>
  </div>

  <div @click="uiStore.toggleModalData()" class="nav-button">
    <span>📅</span>
    <span>Buscar por Data</span>
  </div>

  <div class="menu-bottom">
    <div @click="fazerLogout" class="nav-button">
      <span>🚪</span>
      <span>Sair</span>
    </div>
  </div>
</aside>
  </template>

<script setup>
import { useUiStore } from '../stores/uiStore'
import { useRouter } from 'vue-router' // 1. Importa o roteador
import logoPlanejei from '@/assets/logo.png'
import { useListaPlanosStore } from '../stores/listaPlanosStore';
const listaPlanosStore = useListaPlanosStore();

const voltarParaInicio = () => {
  listaPlanosStore.resetarFiltros(); // Limpa o filtro
  router.push('/dashboard'); // Navega
}

const uiStore = useUiStore()
const router = useRouter() // 2. Ativa o roteador

// 3. Cria a função que fará o logout
const fazerLogout = () => {
  router.push('/') // Leva o usuário de volta para a tela de login
}
</script>

<style scoped>
.menu-container {
  width: 250px;
  background-color: #144994; /* Tom de azul escuro do seu design */
  color: white; /* Texto branco para contraste */
  display: flex; 
  flex-direction: column; /* Organiza os itens em coluna */
  padding: 20px; /* Espaçamento interno */
  box-sizing: border-box;
}

.menu-top {
  margin-bottom: 40px;
}

.filters-section {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.filters-header {
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 18px;
}

.filter-option {
  padding: 8px 0;
  cursor: pointer;
}

.nav-button {
  display: flex;
  align-items: center;
  padding: 15px 10px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
  text-decoration: none; /* Remove o sublinhado do link */
  color: white;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-button span:first-child {
  margin-right: 15px; /* Espaçamento entre ícone e texto */
  font-size: 24px;
}

.menu-bottom {
  margin-top: auto; /* Empurra a seção de "Sair" para o final */
}

.logo-link {
  display: block;
  text-align: center;
  padding: 20px 10px;
  margin-bottom: 20px; /* Cria um espaço entre a logo e o botão Perfil */
}

.logo-img {
  width: 120px; /* Ajuste o tamanho como preferir */
  height: auto;
  transition: transform 0.2s ease;
}

.logo-link:hover .logo-img {
  transform: scale(1.05); /* Pequeno efeito ao passar o mouse */
}
</style>