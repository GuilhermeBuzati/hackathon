export class ProfessorDTOInvalidoError extends Error {
    public statusCode: number;
    public details: string[];    
  
    // Construtor da exceção personalizada
    constructor(error: string[]) {
      super(`Problemas ao ler professorDTO.`);
      
      this.name = "ProfessorDTOInvalidoError"; 
      this.statusCode = 400; 
      this.details = error; 
    }
  }
  