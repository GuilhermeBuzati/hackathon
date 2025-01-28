export class PerguntaDTOInvalidoError extends Error {
    public statusCode: number;
    public details: string[];    
  
    // Construtor da exceção personalizada
    constructor(error: string[]) {
      super(`Problemas ao ler perguntaDTO.`);
      
      this.name = "PerguntaDTOInvalidoError"; 
      this.statusCode = 400; 
      this.details = error; 
    }
  }
  