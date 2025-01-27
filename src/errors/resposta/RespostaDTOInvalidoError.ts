export class RespostaDTOInvalidoError extends Error {
    public statusCode: number;
    public details: string[];    
  
    // Construtor da exceção personalizada
    constructor(error: string[]) {
      super(`Problemas ao ler respostaDTO.`);
      
      this.name = "RespostaDTOInvalidoError"; 
      this.statusCode = 400; 
      this.details = error; 
    }
  }
  