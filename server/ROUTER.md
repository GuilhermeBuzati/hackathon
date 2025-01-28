# DTOs para a Aplicação

Este documento descreve a estrutura dos DTOs utilizados na aplicação para os seguintes objetos: **ProfessorDTO**, **PerguntaDTO** e **TemaDTO**. Ele inclui exemplos de payloads para as operações POST e PATCH.

## ProfessorDTO

### Descrição

O `ProfessorDTO` representa os dados de um professor na aplicação. Ele inclui informações como nome, email e senha.

### Estrutura - POST - "/professor"

Input
```typescript
class ProfessorDTO {
  nome!: string;
  email!: string;
  senha!: string;
}
```
Output

    {
        "id": 5,
        "nome": "User",
        "email": "user@gmail.com",
        "senha": "password"
    }

### Estrutura - PATCH - "/professor"

```typescript
class ProfessorDTO {
  id: number
  nome!: string;
  email!: string;
  senha!: string;
}
```
Output

    {
        "id": 5,
        "nome": "User",
        "email": "user@gmail.com",
        "senha": "password"
    }


### Estrutura - GET - "/professor/:id"

Output

    {
        "id": 5,
        "nome": "User",
        "email": "user@gmail.com"
    }


### Estrutura - GET - "/professor"

Output

    [
        {
            "id": 1,
            "nome": "User",
            "email": "user@gmail.com"
        },
        {
            "id": 2,
            "nome": "Aluno",
            "email": "aluno@gmail.com"
        }
    ]

---

## PerguntaDTO

### Descrição

O `PerguntaDTO` representa os dados de uma pergunta na aplicação. 

### Estrutura - POST - "/pergunta"

Input
```typescript
class PerguntaDTO {
  descricao: string;
  temaId: number;
  respostas: string[];
}
```
Output

    {
        "descricao": "Pergunta 1",
        "tema": {
            "id": 1,
            "descricao": "Brasil"
        },
        "professor": {
            "id": 1,
            "nome": "Professor",
            "email": "professor@gmail.com"
        },
        "respostas": [
            "Resposta 1",
            "Resposta 2",
            "Resposta 3"
        ],
        "id": 1
    }

### Estrutura - PATCH - "/pergunta"

```typescript
class PerguntaDTO {
  id: number;
  descricao: string;
  temaId: number;
  respostas: string[];
}
```
Output

    {
        "descricao": "Pergunta 1",
        "temaId": 1
        "professor": {
            "id": 1,
        },
        "respostas": [
            "Resposta 1",
            "Resposta 2",
            "Resposta 3"
        ],
        "id": 1
    }


### Estrutura - GET - "/pergunta/:id"

Output

    {
        "id": 1,
        "descricao": "Pergunta 1",
        "respostas": [
            "Resposta 1",
            "Resposta 2",
            "Resposta 3"
        ]
    }


### Estrutura - GET - "/pergunta"

Output

    [
      {
          "id": 1,
          "descricao": "Pergunta 1",
          "respostas": [
              "Resposta 1",
              "Resposta 2",
              "Resposta 3"
          ]
      },
      {
        "id": 2,
        "descricao": "Pergunta 2",
        "respostas": [
            "Resposta 1",
            "Resposta 2",
            "Resposta 3"
        ]
      }
    ]

---

## TemaDTO

### Descrição

O `TemaDTO` representa os dados de um tema na aplicação. 

### Estrutura - POST - "/tema"

Input
```typescript
class TemaDTO {
  descricao: string;
  periodoId: number;
  materiaId: number;
}
```
Output

    {
        "descricao": "Brasil",
        "materia": {
            "id": 1,
            "descricao": "História"
        },
        "periodo": {
            "id": 1,
            "descricao": "9º série"
        },
        "id": 1
    }

### Estrutura - PATCH - "/tema"

```typescript
class TemaDTO {
  id: number;
  descricao: string;
  materiaId: number;
  periodoId: number;
}
```
Output

    {
        "id": 1,
        "descricao": "Brasil",
        "materiaId": 1,
        "periodoId": 1
    }


### Estrutura - GET - "/tema/:id"

Output

    {
        "id": 1,
        "descricao": "Brasil"
    }


### Estrutura - GET - "/tema"

Output

    [
      {
          "id": 1,
          "descricao": "Brasil"
      },
      {
          "id": 2,
          "descricao": "Guerra Mundial"
      }
    ]