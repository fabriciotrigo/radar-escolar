# 📚 Radar Escolar
## Pós Tech FIAP - Hackaton (7FSDT)

Sistema web para acompanhamento pedagógico que permite o gerenciamento de turmas, aulas e alunos, oferecendo relatórios e indicadores de desempenho para professores e coordenadores.

---

# 📖 Sobre o projeto

O Radar Escolar tem como objetivo facilitar o acompanhamento do desempenho dos alunos através de indicadores como:

- Frequência
- Participação em aula
- Média de notas
- Histórico individual
- Relatórios por turma
- Relatórios individuais

O sistema possui autenticação por perfil de usuário e disponibiliza diferentes funcionalidades para coordenadores e professores.

---

# 🚀 Tecnologias

## Backend

- Node.js
- TypeScript
- Fastify
- PostgreSQL
- JWT
- Docker
- Docker Compose

## Frontend

- Next.js
- React
- Tailwind CSS
- Recharts
- Lucide React

---

# 🏛 Arquitetura

O backend foi desenvolvido utilizando o padrão:

```
Controller
    ↓
Use Case
    ↓
Repository
    ↓
PostgreSQL
```

Essa separação facilita manutenção, testes e evolução da aplicação.

---

# 🔐 Perfis de usuário

O sistema possui dois perfis.

## Coordenador

Implementação em breve:

- cadastrar turmas e atribuí-las aos professores
- cadastrar alunos e distribuí-los nas turmas
- visualizar todas as turmas
- visualizar relatórios
- acompanhar indicadores
- consultar desempenho dos alunos

## Professor

Pode:

- registrar aulas
- registrar frequência
- registrar participação
- lançar notas
- consultar suas turmas

---

# 📊 Funcionalidades

## Autenticação

- Login com JWT
- Controle por perfil

## Turmas

- Listagem
- Consulta

## Aulas

- Cadastro de aulas
- Assunto
- Data

## Registro de aula

Para cada aluno é possível registrar:

- Presença
- Participação
- Nota
- Observação

---

# 📈 Relatórios

O sistema possui diversos relatórios.

### Relatório Geral de Turmas

Exibe:

- média das notas
- frequência média
- participação média
- quantidade de alunos

---

### Relatório de uma turma

Exibe:

- indicadores baseados em notas, frequência e participação
- gráficos
- lista alunos da turma

---

### Relatório Individual

Apresenta:

- histórico completo do aluno
- notas
- frequência
- participação
- observações
- indicadores

---

# 📊 Indicadores

O sistema destaca automaticamente alunos em situação de atenção.

## Frequência

- 🟢 acima de 90%
- 🟡 entre 75% e 90%
- 🔴 abaixo de 75%

## Nota

- 🟢 acima de 8
- 🟡 entre 6 e 8
- 🔴 abaixo de 6

---

# 🗄 Banco de dados

Principais tabelas:

- usuarios
- disciplinas
- turmas
- alunos
- professor_turma
- aluno_turma
- aulas
- aluno_aula

---

# 📝 Principais API's Utilizadas Pelos Professores  

| Método   | Endpoint                                                 | Descrição                                            |
| -------- | -------------------------------------------------------- | ---------------------------------------------------- |
| `POST`   | `/users/signin`                                          | Realiza login (gera token JWT)                       |
| `POST`   | `/aulas`                                                 | Cria uma nova aula e associa aos alunos da turma     |
| `GET`    | `/professor-turma/:id/aulas`                             | Exibe a lista de aulas da turma e professor          |
| `GET`    | `/aulas/:id/chamada`                                     | Retorna os dados dos alunos na aula                  |
| `PUT`    | `/aulas/:id/chamada`                                     | Atualiza os dados dos alunos na aula                 |
| `GET`    | `/professor-turma/dashboard`                             | Exibe todas as turmas do professor com alguns dados  |
| `GET`    | `/turmas/:turma_id/alunos`                               | Retorna a lista de alunos de uma turma               |
| `GET`    | `/turmas/:turma_id/alunos/id`                            | Retorna um array contendos apenas os ID's dos alunos |
| `GET`    | `/relatorios/turmas`                                     | Retorna os dados para compor o card da turma         |
| `GET`    | `/relatorios/turmas/:professor_turma_id`                 | Retorna um resumo dos dados/indicadores das turmas   |
| `GET`    | `/relatorios/turmas/:professor_turma_id/notas`           | Retorna as notas médias da turma por aula            |
| `GET`    | `/relatorios/turmas/:professor_turma_id/participacao`    | Retorna a participação média da turma no geral       |
| `GET`    | `/relatorios/turmas/:professor_turma_id/alunos`          | Retorna a lista de alunos da turma com indicadores   |
| `GET`    | `/relatorios/turmas/:professor_turma_id/alunos/:aluno_id`| Resumo de dados e histórico de aulas do aluno        |

---

# 🐳 Executando o projeto

## Clonar

```bash
git clone https://github.com/fabriciotrigo/radar-escolar
```

---

## Backend

```bash
cd backend
npm install
```

---

## Frontend

```bash
cd frontend
npm install
```

---

## Configuração das Variáveis de Ambiente do Backend

Crie e configure um arquivo .env na raíz do projeto da mesma forma como demonstrado em ./backend/.env.example:

```bash
PORT=  
ENV=  
DATABASE_USER=  
DATABASE_HOST=  
DATABASE_NAME=  
DATABASE_PASSWORD=  
DATABASE_PORT=  
JWT_SECRET= 
```

## Configuração da Variável de Ambiente do Frontend

Para execução com docker crie um arquivo .env.production na pasta ./frontend com o conteúdo abaixo:

```bash
NETX_PUBLIC_API_URL=http://api:8000
```

---

## Docker

```bash
docker compose up --build
```

---

## Banco

Os scripts SQL criam automaticamente:

- usuários
- disciplinas
- turmas
- alunos
- aulas
- registros
- dados para demonstração

---

# 🔑 Usuários de teste

## Coordenador

```
Email:
coordenador@radar.com

Senha:
123456
```

---

## Professor

```
Email:
joao@radar.com

Senha:
123456
```

---

# 📌 Melhorias futuras

- Criar CRUD completo para o Coordenador cadastrar alunos e turmas
- Evolução dos indicadores (implementar filtros por data)
- Exportação para PDF
- Exportação para Excel
- Dashboard do aluno
- Dashboard do responsável
- Notificações

---

# 👨‍💻 Autor

**Fabrício Trigo**
