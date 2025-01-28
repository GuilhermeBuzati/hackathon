export class PeriodoNaoEncontradoError extends Error {
    public statusCode: number;
    public details: string;    
  
    // Construtor da exceção personalizada
    constructor(idPeriodo: number) {
      super(`O período id ${idPeriodo} não encontrado.`);
      
      this.name = "PeriodoNaoEncontradoError"; 
      this.statusCode = 404; 
      this.details = `O período id ${idPeriodo} não encontrado.`; 
    }
  }
  