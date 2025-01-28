export class TemaNaoEncontradoError extends Error {
    public statusCode: number;
    public details: string;    
  
    // Construtor da exceção personalizada
    constructor(idTema: number) {
      super(`O tema id ${idTema} não encontrado.`);
      
      this.name = "TemaNaoEncontradoError"; 
      this.statusCode = 404; 
      this.details = `O tema id ${idTema} não encontrado.`; 
    }
  }
  