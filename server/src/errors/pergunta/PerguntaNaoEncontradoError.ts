export class PerguntaNaoEncontradoError extends Error {
    public statusCode: number;
    public details: string;    
  
    // Construtor da exceção personalizada
    constructor(idPergunta: number) {
      super(`A pergunta id ${idPergunta} não encontrada.`);
      
      this.name = "PerguntaNaoEncontradoError"; 
      this.statusCode = 404; 
      this.details = `A pergunta id ${idPergunta} não encontrada.`; 
    }
  }
  