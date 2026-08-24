# 🔥 Stirling PDF — Customizado por joaogabrielmonte

> Plataforma completa de manipulação de PDFs com autenticação, usuários ilimitados e interface moderna em português.

---

## 🖥️ Acesso Rápido

| | |
|---|---|
| **URL Local** | `http://localhost:8088` |
| **Usuário** | `admin` |
| **Senha** | `stirling` |
| **Repositório** | [github.com/joaogabrielmonte/stirling-test](https://github.com/joaogabrielmonte/stirling-test) |

---

## ✨ Personalizações Aplicadas

### 🎨 Interface & UX
- **Ações Rápidas** — Banner no topo com acesso com 1 clique para Mesclar, Comprimir, Converter, Assinar e Editar Texto
- **Filtros por Categoria** — Barra de pílulas interativas para navegar instantaneamente por categoria de ferramenta
- **Glassmorphism** — Cards com efeito de vidro, bordas coloridas por categoria e sombras dinâmicas
- **Micro-interações fluidas** — Hover lift, active press e transições suaves em todos os elementos
- **Modo escuro** moderno com paleta de cores harmoniosa
- **Interface em Português do Brasil (pt-BR)**

### 🔐 Autenticação & Usuários
- Tela de login personalizada com credenciais padrão visíveis
- **Usuários ilimitados** (limite de licença removido)
- Botão de **Logout** direto na barra lateral com hover vermelho e tooltip "Sair"
- Gerenciamento de usuários pelo painel Admin

### 🐳 Docker & Infraestrutura
- Docker Compose padrão (H2 embutido — pronto para uso)
- Docker Compose com **PostgreSQL separado** (`docker-compose.postgres.yml`)
- Imagem construída localmente como `stirling-pdf-local:latest`

---

## 🚀 Como Subir Localmente

### Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução

### 1. Clonar o Repositório
```bash
git clone https://github.com/joaogabrielmonte/stirling-test.git
cd stirling-test
```

### 2. Subir com Docker (banco H2 embutido — mais simples)
```bash
docker compose -f docker/compose/docker-compose.yml up -d --build
```

### 3. Acessar a Aplicação
```
http://localhost:8088
Usuário: admin
Senha: stirling
```

---

## 🐘 Opção com PostgreSQL Separado

Para usar um banco de dados PostgreSQL dedicado (recomendado para produção):

```bash
docker compose -f docker/compose/docker-compose.postgres.yml up -d --build
```

O banco PostgreSQL ficará disponível em:
- **Host:** `localhost`
- **Porta:** `5433`
- **Banco:** `stirlingpdf`
- **Usuário:** `stirling`
- **Senha:** `stirling`

---

## 🛠️ Ferramentas Disponíveis (68+)

| Categoria | Exemplos |
|---|---|
| ✍️ Assinatura | Assinar com Certificado, Carimbo de Data/Hora, Assinar |
| 🔒 Segurança | Proteger PDF, Marca d'água, Achatar, Sanitizar, Permissões |
| 📄 Formatação de Página | Recortar, Girar, Dividir, Reorganizar, Layout de Páginas |
| 🗑️ Remoção | Remover Páginas, Anotações, Imagem, Páginas em Branco |
| 📤 Extração | Extrair Páginas, Extrair Imagens |
| 🔄 Conversão | PDF → Word, Imagens → PDF e muito mais |
| 🤖 Automação | OCR, Renomear Automaticamente |
| 🔧 Geral | Mesclar, Comprimir, Comparar, Reparar |
| 👨‍💻 Desenvolvedor | API REST, Varredura de Pasta, Configuração Air-Gapped |

---

## ⚙️ Variáveis de Ambiente Importantes

| Variável | Padrão | Descrição |
|---|---|---|
| `DOCKER_ENABLE_SECURITY` | `true` | Ativa autenticação e sistema de usuários |
| `SECURITY_INITIALLOGIN_USERNAME` | `admin` | Usuário padrão criado no primeiro acesso |
| `SECURITY_INITIALLOGIN_PASSWORD` | `stirling` | Senha do usuário padrão |
| `SERVER_PORT` | `8088` | Porta da aplicação |
| `LANGS` | `pt_BR` | Idioma padrão da interface |

---

## 🔄 Atualizar Após Mudanças no Código

```bash
# Reconstruir e reiniciar o container com as últimas alterações
docker compose -f docker/compose/docker-compose.yml up -d --build
```

> ⏱️ O build completo (frontend + backend) leva aproximadamente **4–5 minutos**.

---

## 🛑 Parar a Aplicação

```bash
docker compose -f docker/compose/docker-compose.yml down
```

---

## 📁 Estrutura do Projeto

```
stirling-test/
├── app/                        # Backend Java (Spring Boot)
├── docker/
│   └── compose/
│       ├── docker-compose.yml              # Stack padrão (H2)
│       └── docker-compose.postgres.yml     # Stack com PostgreSQL
├── frontend/
│   └── editor/
│       ├── public/locales/pt-BR/           # Traduções em português
│       └── src/
│           ├── core/components/tools/      # Tela de ferramentas (UI renovada)
│           └── proprietary/auth/           # Tela de login customizada
├── PROJETO.md                  # Este arquivo
└── README.md                   # Documentação original (pt-BR)
```

---

## 📝 Histórico de Customizações

| Data | Alteração |
|---|---|
| 2026-08-24 | Push inicial — todas customizações incluídas |
| 2026-08-24 | Banner Ações Rápidas + Filtros por Categoria |
| 2026-08-24 | Botão de Logout na sidebar |
| 2026-08-24 | Usuários ilimitados (sem limite de licença) |
| 2026-08-24 | Configurações em Português (pt-BR) |
| 2026-08-24 | Docker Compose com PostgreSQL separado |

---

## 🤝 Baseado em

[Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF) — Ferramenta open-source para manipulação de PDFs.
