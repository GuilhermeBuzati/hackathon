export class ProvaNaoEncontradaError extends Error {
    public statusCode: number;
    public details: string;    
  
    // Construtor da exceção personalizada
    constructor(idProva: number) {
      super(`A prova id ${idProva} não encontrada.`);
      
      this.name = "ProvaNaoEncontradaError"; 
      this.statusCode = 404; 
      this.details = `A prova id ${idProva} não encontrada.`; 
    }
  }
  