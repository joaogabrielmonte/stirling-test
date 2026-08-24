<p align="center">
  <img src="https://raw.githubusercontent.com/Stirling-Tools/Stirling-PDF/main/docs/stirling.png" width="90" alt="Stirling PDF Logo">
</p>

<h1 align="center">Stirling PDF — Edição Enterprise Customizada (pt-BR)</h1>

<p align="center">
  <b>Plataforma completa e robusta de manipulação e edição de PDF, 100% em Português (Brasil), com recursos Enterprise e suporte a banco de dados separado (PostgreSQL).</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Language-pt--BR-green.svg" alt="Idioma pt-BR">
  <img src="https://img.shields.io/badge/License-Enterprise%20Unlocked-blue.svg" alt="Enterprise Unlocked">
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED.svg?logo=docker" alt="Docker Ready">
  <img src="https://img.shields.io/badge/Database-H2%20%7C%20PostgreSQL-orange.svg" alt="Databases">
</p>

---

## 🚀 Principais Modificações e Melhorias

1. 🇧🇷 **Tradução Completa para Português (Brasil)**:
   - **Menu Lateral e Categorias**: *Recomendadas, Assinatura, Segurança de Documentos, Verificação, Revisão, Formatação, Extração, Remoção, Automação, Geral, etc.*
   - **Painéis de Configurações**: Configurações Gerais, Segurança & Autenticação, Banco de Dados, Auditoria, Licença e Métricas.
   - **Espaço de Trabalho**: Gestão de Pessoas, Equipes, Convites, Funções e Permissões.
   - **Visualizador e Ferramentas**: Anotações, Ocultações, Medições, Carimbos, Assinaturas Digitais e Formulários.

2. ♾️ **Modo Enterprise com Usuários Ilimitados**:
   - Recursos Pro/Enterprise liberados nativamente sem restrição de contagem de usuários.
   - Suporte completo a múltiplos usuários, equipes, controle de permissões por pasta/ferramenta e registro de auditoria.

3. 🔄 **Correção de Reinício Automático no Docker**:
   - Reinício do servidor direto pela interface web com desligamento gracioso e recuperação automática em containers.

4. 🗄️ **Suporte a Banco de Dados Separado (PostgreSQL)**:
   - Opção de usar o banco embutido **H2** ou um container dedicado **PostgreSQL** para alta performance e concorrência sem bloqueio de arquivos.

---

## 🛠️ Como Subir e Executar

### Pré-requisitos
- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/) instalados.
- [Git](https://git-scm.com/) instalado.

---

### Opção 1: Execução com Banco Embutido (H2) — Rápido e Simples

Ideal para testes locais e ambientes menores:

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd stirling-pdf

# 2. Suba o container com build local
docker compose -f docker/compose/docker-compose.yml up -d --build

# 3. Acesse no navegador
# http://localhost:8088
```

---

### Opção 2: Execução com Banco Separado (PostgreSQL) — Recomendado para Produção

Ideal para servidores em produção, ambientes multi-usuário e maior estabilidade:

```bash
# Suba os containers do Stirling PDF + PostgreSQL
docker compose -f docker/compose/docker-compose.postgres.yml up -d --build
```

- **Aplicação**: `http://localhost:8088`
- **PostgreSQL**: Porta `5433` (ou interna na rede Docker na porta 5432)
- **Credenciais do Banco**:
  - Usuário: `stirling`
  - Senha: `stirling_secret_password`
  - Base de dados: `stirling_pdf`

---

## ⚙️ Variáveis de Ambiente Importantes

Você pode ajustar as variáveis no próprio `docker-compose.yml`:

| Variável | Padrão | Descrição |
| :--- | :--- | :--- |
| `SECURITY_ENABLELOGIN` | `true` | Ativa a tela de login e controle de usuários |
| `SYSTEM_DEFAULTLOCALE` | `pt-BR` | Define o idioma padrão como Português do Brasil |
| `SYSTEM_MAXFILESIZE` | `500` | Limite máximo de arquivo PDF em MB |
| `UI_APPNAME` | `Stirling-PDF` | Nome exibido na interface e cabeçalho |
| `SYSTEM_DATASOURCE_ENABLECUSTOMDATABASE` | `true` | Habilita conexão com banco de dados externo |
| `SYSTEM_DATASOURCE_CUSTOMDATABASEURL` | `jdbc:postgresql://postgres:5432/stirling_pdf` | URL JDBC para conexão com PostgreSQL |
| `SYSTEM_DATASOURCE_USERNAME` | `stirling` | Usuário do banco de dados |
| `SYSTEM_DATASOURCE_PASSWORD` | `stirling_secret_password` | Senha do banco de dados |

---

## 🔑 Primeiro Acesso (Administrador)

- **Usuário Padrão**: `admin`
- **Senha Padrão**: `stirling`
- Ao entrar pela primeira vez, acesse **Configurações > Segurança & Autenticação** ou **Espaço de Trabalho > Pessoas** para alterar a senha do administrador ou cadastrar novos membros da sua equipe.

---

## 📋 Comandos Úteis do Dia a Dia

```bash
# Ver status e logs dos containers
docker compose -f docker/compose/docker-compose.yml logs -f

# Reiniciar o container
docker compose -f docker/compose/docker-compose.yml restart

# Parar o serviço
docker compose -f docker/compose/docker-compose.yml down

# Reconstruir após fazer alterações no código
docker compose -f docker/compose/docker-compose.yml up -d --build
```

---

## 📤 Como Subir para o seu GitHub

Para enviar suas alterações para o seu próprio repositório no GitHub:

```bash
# 1. Adicione todas as alterações
git add .

# 2. Faça o commit
git commit -m "feat: traducao pt-BR, usuarios ilimitados, correcao de restart e docker postgres"

# 3. Altere a URL do repositório remoto para o seu GitHub
git remote set-url origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# 4. Envie para o GitHub
git push -u origin main
```

---

## 🛡️ Licença e Créditos

Baseado no projeto open-source [Stirling-Tools/Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF).  
Distribuído sob os termos da licença do projeto com customizações e melhorias locais.
