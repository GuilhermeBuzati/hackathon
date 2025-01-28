export class MateriaNaoEncontradoError extends Error {
    public statusCode: number;
    public details: string;    
  
    // Construtor da exceção personalizada
    constructor(idMateria: number) {
      super(`A matéria id ${idMateria} não encontrada.`);
      
      this.name = "MateriaNaoEncontradoError"; 
      this.statusCode = 404; 
      this.details = `A matéria id ${idMateria} não encontrada.`; 
    }
  }
  