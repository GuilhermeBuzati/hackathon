# DTOs para a Aplicação

Este documento descreve a estrutura dos DTOs utilizados na aplicação para os seguintes objetos: **ProfessorDTO**, **PerguntaDTO** e **TemaDTO**. Ele inclui exemplos de payloads para as operações POST e PATCH.

## ProfessorDTO

### Descrição

O `ProfessorDTO` representa os dados de um professor na aplicação. Ele inclui informações como nome, email e senha.

### Estrutura - POST - "/professor"

Input

    {
        "nome": "User",
        "email": "user@gmail.com",
        "senha": "password"
    }

Output

    {
        "nome": "Professor",
        "email": "aluno152@gmail.com",
        "id": 8,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9mZXNzb3JJZCI6OCwiZW1haWwiOiJhbHVubzE1MkBnbWFpbC5jb20iLCJpYXQiOjE3Mzg3MjAxMTcsImV4cCI6MTczODcyMzcxN30.WfZDHdlG7CmYrBTyvWDPN0pLjAOMZPYVNTD4kldiZns"
    }

### Estrutura - PATCH - "/professor"

Input

    {
        "id": 5,
        "nome": "Update User",
        "email": "user@gmail.com",
        "senha": "password"
    }


Output

    {
        "id": 5,
        "nome": "Update User",
        "email": "user@gmail.com"
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

### Estrutura - POST - "/professor/login"

Input

    {
        "email": "aluno@gmail.com",
        "senha": "senha123"
    }

Output

    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9mZXNzb3JJZCI6NywiZW1haWwiOiJhbHVub0BnbWFpbC5jb20iLCJpYXQiOjE3MzgzODQxNzcsImV4cCI6MTczODM4Nzc3N30.e8ehJWWXHDwzDYELLgV4IVjCYrMBT3mC_HjOttf7zxk"

---

## PerguntaDTO

### Descrição

O `PerguntaDTO` representa os dados de uma pergunta na aplicação. 

### Estrutura - POST - "/pergunta"

Input

    {   
        "descricao": "Pergunta 1",
        "temaId": 1,
        "respostas": ["Resposta 1","Resposta 2","Resposta 3"]
    }
    
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

Input 

    {   
        "id": 1
        "descricao": "Pergunta 1",
        "temaId": 1,
        "professor": {
            "id": 1 //Sessão
        },
        "respostas": ["Resposta 1","Resposta 2","Resposta 3"]
    }

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
            "23",
            "24",
            "25"
        ],
        "tema": {
            "id": 2,
            "descricao": "História",
            "periodo": "9 Serie"
        }
    }


### Estrutura - GET - "/pergunta"

Output

    [
        {
            "id": 11,
            "descricao": "Pergunta 1",
            "respostas": [
                "23",
                "24",
                "25"
            ],
            "tema": {
                "id": 2,
                "descricao": "História",
                "periodo": "9 Serie"
            }
        },
        {
            "id": 3,
            "descricao": "Pergunta 2",
            "respostas": [
                "23",
                "24",
                "25"
            ],
            "tema": {
                "id": 2,
                "descricao": "Geografia",
                "periodo": "9 Serie"
            }
        }
    ]

---

## TemaDTO

### Descrição

O `TemaDTO` representa os dados de um tema na aplicação. 

### Estrutura - POST - "/tema"

Input

    {
        "descricao": "Brasil",
        "materiaId": 1,
        "periodo": "9 Serie",
    }

Output

    {
        "descricao": "Brasil",
        "materia": {
            "id": 1,
            "descricao": "123"
        },
        "periodo": "9 Serie",
        "id": 3
    }


### Estrutura - PATCH - "/tema"

Input

    {
        "descricao": "Brasil",
        "materiaId": 1,
        "periodo": "10 Serie",
        "id": 3
    }


Output

    {
        "id": 3,
        "descricao": "Brasil",
        "periodo": "10 Serie",
        "materiaId": 1
    }


### Estrutura - GET - "/tema/:id"

Output

    {
        "id": 3,
        "descricao": "Brasil",
        "periodo": "9 Serie",
        "materia": {
            "id": 1,
            "descricao": "Historia"
        }
    }


### Estrutura - GET - "/tema"

Output

    [
        {
            "id": 2,
            "descricao": "2313111",
            "periodo": "9 Serie",
            "materia": {
                "id": 1,
                "descricao": "Geografia"
            }
        },
        {
            "id": 3,
            "descricao": "Brasil",
            "periodo": "8 Serie",
            "materia": {
                "id": 1,
                "descricao": "História"
            }
        }
    ]

---

## ProvaDTO

### Descrição

O `ProvaDTO` representa os dados de um tema na aplicação. 

### Estrutura - POST - "/prova"

Input

    {
        "titulo": "Prova de teste",
        "materiaId": 1,
        "perguntas": [1,2,3]
    }

Output

    {
        "titulo": "Prova de teste",
        "materia": {
            "id": 1,
            "descricao": "História"
        },
        "perguntas": [
            {
                "id": 2,
                "descricao": "Pergunta 1?",
                "respostas": [
                    "r1",
                    "r2",
                    "r3"
                ]
            },
            {
                "id": 1,
                "descricao": "Pergunta 12?",
                "respostas": [
                    "r1",
                    "r2",
                    "r3"
                ]
            },
            {
                "id": 3,
                "descricao": "Pergunta 12?",
                "respostas": [
                    "r1",
                    "r2",
                    "r3"
                ]
            }
        ],
        "id": 3
    }

### Estrutura - PATCH - "/prova"

Input

    {
        "titulo": "Prova de teste",
        "materiaId": 1,
        "perguntas": [1],
        "id": 23
    }

Output

    {
        "id": 1,
        "titulo": "Prova de teste",
        "materia": {
            "id": 1,
            "descricao": "História"
        },
        "perguntas": [
            {
                "id": 1,
                "descricao": "Pergunta 12?",
                "respostas": [
                    "r1111",
                    "r10",
                    "r3"
                ]
            }
        ]
    }


### Estrutura - GET - "/prova/:id"

Output

    {
        "id": 2,
        "titulo": "Prova de teste",
        "materia": {
            "id": 1,
            "descricao": "História"
        },
        "perguntas": [
            {
                "id": 1,
                "descricao": "Pergunta 12?",
                "respostas": [
                    "r1111",
                    "r10",
                    "r3"
                ]
            }
        ]
    }


### Estrutura - GET - "/prova"

Output

    [
        {
            "id": 2,
            "titulo": "Prova de teste",
            "materia": {
                "id": 1,
                "descricao": "História"
            },
            "perguntas": [
                {
                    "id": 1,
                    "descricao": "Pergunta 12?",
                    "respostas": [
                        "r1111",
                        "r10",
                        "r3"
                    ]
                }
            ]
        },
        {
            "id": 1,
            "titulo": "Prova de teste",
            "materia": {
                "id": 1,
                "descricao": "História"
            },
            "perguntas": [
                {
                    "id": 1,
                    "descricao": "Pergunta 12?",
                    "respostas": [
                        "r1111",
                        "r10",
                        "r3"
                    ]
                }
            ]
        }
    ]

---

## MateriaDTO

### Descrição

O `MateriaDTO` representa os dados de um tema na aplicação. 

### Estrutura - POST - "/materia"

Input

    {
        "descricao": "Brasil",
        "id": 1
    }

Output

    {
        "descricao": "Brasil",
        "id": 2
    }

### Estrutura - PATCH - "/materia"

Input

    {
        "descricao": "Matematica",
        "id": 2
    }

Output

    {
        "id": 2,
        "descricao": "Matematica"
    }

### Estrutura - GET - "/materia/:id"

Output

    {
        "id": 1,
        "descricao": "123",
        "temaMateria": [
            {
                "id": 2,
                "descricao": "2313111",
                "periodo": "9 Serie"
            },
            {
                "id": 3,
                "descricao": "Brasil",
                "periodo": "10 Serie"
            }
        ]
    }

### Estrutura - GET - "/materia"

Output

    [
        {
            "id": 1,
            "descricao": "123",
            "temaMateria": [
                {
                    "id": 2,
                    "descricao": "2313111",
                    "periodo": "9 Serie"
                },
                {
                    "id": 3,
                    "descricao": "Brasil",
                    "periodo": "10 Serie"
                }
            ]
        }
    ]
---