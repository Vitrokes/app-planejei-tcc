<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo-container" :style="{ backgroundImage: `url(${logoPlanejei})` }"></div>
      
      <form @submit.prevent="fazerLogin">
        <div class="input-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" placeholder="seuemail@exemplo.com">
        </div>
        <div class="input-group">
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="senha" placeholder="Sua senha">
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// Importa a imagem da logo
import logoPlanejei from '@/assets/logo.png'

const email = ref('')
const senha = ref('')
const router = useRouter()

const fazerLogin = () => {
  if (email.value === 'teste@p.com' && senha.value === '123456') {
    alert('Login bem-sucedido!')
    router.push('/dashboard')
  } else {
    alert('E-mail ou senha inválidos!')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 360px;
}

/* Novo estilo para a logo */
.logo-container {
  width: 180px;
  height: 90px;
  margin: 0 auto 24px auto; /* Centraliza e adiciona margem embaixo */
  background-color: #144994; /* A cor da elipse*/
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 120px; /* Tamanho da logo dentro da elipse */
}

.input-group {
  text-align: left;
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #495057;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 8px;
}

button:hover {
  background-color: #0056b3;
}
</style>