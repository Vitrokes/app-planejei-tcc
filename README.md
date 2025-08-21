#  Planejei 📝

![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?style=for-the-badge&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Pinia](https://img.shields.io/badge/Pinia-2-FFD600?style=for-the-badge&logo=pinia)

Protótipo funcional de uma aplicação web desenvolvido como Trabalho de Conclusão de Curso (TCC). O "Planejei" é um Recurso Educacional Aberto (REA) que atua como um assistente de planejamento de aulas, projetado para potencializar a autonomia docente e facilitar a integração da Base Nacional Comum Curricular (BNCC), incluindo as novas diretrizes de Computação.

![Screenshot do Dashboard do Planejei](./public/screenshot-dashboard.png)

## 🎯 Objetivo do Projeto

A ferramenta foi concebida para ser um contraponto aos sistemas que oferecem planos de aula prontos. O "Planejei" estrutura o processo de criação e guia o professor, mas mantém o docente como autoridade e protagonista do seu planejamento, permitindo a adaptação à realidade de cada turma e fomentando a criatividade no contexto da educação digital.

## ✨ Funcionalidades Principais

* **👨‍🏫 Autenticação e Perfil de Usuário:** Sistema de login e uma página de perfil onde o professor pode gerenciar seus dados, escolas e turmas.
* **💾 Persistência de Dados:** Utiliza o `localStorage` do navegador para salvar permanentemente os dados do perfil e a lista de planos de aula, simulando um banco de dados.
* **📊 Dashboard Interativo:** Painel principal que exibe todos os planos de aula criados, com uma seção de "Recentes" para acesso rápido.
* **🎨 Status Visual dos Planos:** Os cards dos planos de aula possuem um sistema de cores automático (Vermelho, Amarelo, Verde) que indica o status do plano (Em Elaboração, Planejado ou Realizado) com base no preenchimento dos campos e na data da aula.
* **🔍 Filtros Cumulativos:** Um sistema de filtros avançado que permite ao professor encontrar planos por Turma, Objetos de Conhecimento (da Disciplina e de Computação), busca por palavra-chave no objetivo e seleção de intervalo de datas.
* **🧙‍♂️ Wizard de Criação de Planos:** Um assistente passo a passo que guia o professor pelas 5 etapas de criação de um plano de aula:
    1.  **Identificação:** Dados básicos da aula.
    2.  **Objetivos e BNCC:** Seleção dinâmica de Objetos de Conhecimento e Habilidades da BNCC, carregados a partir de arquivos JSON.
    3.  **Estratégias:** Seleção múltipla e adição de novas Metodologias e Recursos Tecnológicos.
    4.  **Atividades e Referências:** Sugestão e adição de atividades, com a opção de marcá-las como avaliativas.
    5.  **Visualização:** Um resumo completo de todo o plano preenchido.
* **✏️ Funcionalidade CRUD Completa:** O usuário pode Criar, Ler, Atualizar (Editar) e Deletar seus planos de aula.
* **📄 Exportação para PDF:** Na tela de visualização, é possível exportar o plano de aula completo como um arquivo PDF formatado, com nome de arquivo dinâmico e a logo do projeto no cabeçalho.

## 🛠️ Tecnologias Utilizadas

* **Framework Principal:** **Vue.js (v3)** com a **Composition API** e `<script setup>`.
* **Build Tool:** **Vite**.
* **Roteamento:** **Vue Router**.
* **Gerenciamento de Estado:** **Pinia**.
* **Bibliotecas Externas:**
    * `@vuepic/vue-datepicker`: Para o componente de calendário avançado.
    * `vue-multiselect`: Para os campos de seleção múltipla com adição de tags.
    * `html2pdf.js`: Para a geração de PDF no lado do cliente.
* **Estilização:** **CSS3** com Flexbox e CSS Grid para layouts responsivos.
* **Qualidade de Código:** **ESLint** e **Prettier**.

## 🚀 Como Rodar o Projeto Localmente

Para executar este projeto em seu ambiente de desenvolvimento, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO_AQUI]
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd app-planejei
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173/` (ou em outra porta indicada no terminal).

## 📁 Estrutura de Pastas

O projeto segue a estrutura padrão recomendada para aplicações Vue.js, com uma clara separação de responsabilidades: