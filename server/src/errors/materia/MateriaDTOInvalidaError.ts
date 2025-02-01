export class MateriaDTOInvalidaError extends Error {
    public statusCode: number;
    public details: string[];    
  
    // Construtor da exceção personalizada
    constructor(error: string[]) {
      super(`Problemas ao ler materiaDTO.`);
      
      this.name = "MateriaDTOInvalidaError"; 
      this.statusCode = 400; 
      this.details = error; 
    }
  }
  