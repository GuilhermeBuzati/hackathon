export class ProvaDTOInvalidoError extends Error {
    public statusCode: number;
    public details: string[];    
  
    // Construtor da exceção personalizada
    constructor(error: string[]) {
      super(`Problemas ao ler provaDTO.`);
      
      this.name = "ProvaDTOInvalidoError"; 
      this.statusCode = 400; 
      this.details = error; 
    }
  }
  