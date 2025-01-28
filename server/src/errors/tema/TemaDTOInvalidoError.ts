export class TemaDTOInvalidoError extends Error {
    public statusCode: number;
    public details: string[];    
  
    // Construtor da exceção personalizada
    constructor(error: string[]) {
      super(`Problemas ao ler temaDTO.`);
      
      this.name = "TemaDTOInvalidoError"; 
      this.statusCode = 400; 
      this.details = error; 
    }
  }
  