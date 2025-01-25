export class ProfessorNaoEncontradoError extends Error {
    public statusCode: number;
    public details: string;    
  
    // Construtor da exceção personalizada
    constructor(idProfessor: number) {
      super(`O professor id ${idProfessor} não encontrado.`);
      
      this.name = "ProfessorNaoEncontradoError"; 
      this.statusCode = 404; 
      this.details = `O professor id ${idProfessor} não encontrado.`; 
    }
  }
  