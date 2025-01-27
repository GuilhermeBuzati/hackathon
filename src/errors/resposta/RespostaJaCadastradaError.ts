export class RespostaJaCadastradaError extends Error {
    public statusCode: number;
    public details: string;
  
    // Construtor da exceção personalizada
    constructor(resposta: string) {
      super(`A resposta ${resposta} já está cadastrada.`);
      
      this.name = 'RespostaJaCadastradaError'; 
      this.statusCode = 409; 
      this.details = `A resposta ${resposta} já está cadastrada.`; 
    }
  }
  