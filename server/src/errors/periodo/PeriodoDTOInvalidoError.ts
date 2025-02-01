export class PeriodoDTOInvalidoError extends Error {
    public statusCode: number;
    public details: string[];    
  
    // Construtor da exceção personalizada
    constructor(error: string[]) {
      super(`Problemas ao ler periodoDTO.`);
      
      this.name = "PeriodoDTOInvalidoError"; 
      this.statusCode = 400; 
      this.details = error; 
    }
  }
  