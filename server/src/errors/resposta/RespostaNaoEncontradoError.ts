export class RespostaNaoEncontradoError extends Error {
    public statusCode: number;
    public details: string;    
  
    // Construtor da exceção personalizada
    constructor(idResposta: number) {
      super(`A resposta id ${idResposta} não encontrada.`);
      
      this.name = "RespostaNaoEncontradoError"; 
      this.statusCode = 404; 
      this.details = `A resposta id ${idResposta} não encontrada.`; 
    }
  }
  