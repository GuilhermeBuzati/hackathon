# 🚀 Hackathon Grupo 38

Bem-vindo ao repositório do projeto! Aqui você encontrará todas as instruções necessárias para iniciar e rodar o projeto em seu ambiente local utilizando **Docker**.

---

## 📌 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- 🌐 **Frontend:** Vue.js (Vite) + Axios
- 🖥 **Backend:** Express + TypeScript + TypeORM
- 🗄 **Banco de Dados:** PostgreSQL

---

## 🛠 Como Rodar o Projeto

### 🔹 Passo 1: Pré-requisitos
Certifique-se de ter o **Docker** e **Docker Compose** instalados na sua máquina.

### 🔹 Passo 2: Clonar o Repositório
```sh
 git clone git@github.com:GuilhermeBuzati/hackathon.git
 cd hackathon
```

### 🔹 Passo 3: Criar e iniciar os containers

Como os arquivos **.env** já estão presentes no projeto (pois os dados são locais), basta rodar o seguinte comando:

```sh
 docker compose up --build
```

Esse comando vai:
- Construir as imagens do **frontend** e **backend**
- Criar um container para o **banco de dados** PostgreSQL
- Iniciar todos os serviços interligados

### 🔹 Passo 4: Acessar a aplicação
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend (API):** [http://localhost:9876](http://localhost:9876)
- **Banco de Dados:** Conecte-se ao PostgreSQL utilizando os dados do `.env`

---

## 📂 Estrutura do Projeto
```
/
├── frontend/    # Aplicação Vue.js
├── server/      # Backend Express com TypeScript
├── docker-compose.yml  # Configuração dos containers
├── .env         # Variáveis de ambiente (já incluídas)
└── README.md    # Este arquivo
```

---

## ⚙️ Configuração Adicional
Se necessário, você pode modificar o arquivo `.env` para ajustar configurações como porta do servidor ou credenciais do banco de dados.

Caso precise parar os containers, utilize:
```sh
 docker compose down
```

Para rodar os containers em segundo plano:
```sh
 docker compose up -d --build
```

---

💡 **Dúvidas ou sugestões?** Fique à vontade para abrir uma issue ou contribuir com o projeto! 🚀

