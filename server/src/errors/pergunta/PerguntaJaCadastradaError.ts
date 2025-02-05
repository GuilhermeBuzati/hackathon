export class PerguntaJaCadastradaError extends Error {
    public statusCode: number;
    public details: string;
  
    // Construtor da exceção personalizada
    constructor(pergunta: string) {
      super(`A pergunta ${pergunta} já está cadastrada para o tema.`);
      
      this.name = 'PerguntaJaCadastradaError'; 
      this.statusCode = 409; 
      this.details = `A pergunta ${pergunta} já está cadastrada para o tema.`; 
    }
  }
  