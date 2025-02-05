export class ProfessorUtilizadaError extends Error {
    public statusCode: number;
    public details: string;
  
    constructor() {
     super('Não é possível excluir um professor que possui perguntas associadas');
      
      this.name = 'ProfessorUtilizadaError'; 
      this.statusCode = 409; 
      this.details = 'Não é possível excluir um professor que possui perguntas associadas'
    }
  }
  