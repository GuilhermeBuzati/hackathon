export class TemaUtilizadaError extends Error {
    public statusCode: number;
    public details: string;
  
    constructor() {
     super('Não é possível excluir um tema que possui perguntas associadas');
      
      this.name = 'TemaUtilizadaError'; 
      this.statusCode = 409; 
      this.details = 'Não é possível excluir um tema que possui perguntas associadas'
    }
  }
  