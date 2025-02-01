export class MateriaJaCadastradaError extends Error {
    public statusCode: number;
    public details: string;
  
    // Construtor da exceção personalizada
    constructor(materia: string) {
      super(`A matéria ${materia} já está cadastrado.`);
      
      this.name = 'MateriaJaCadastradaError'; 
      this.statusCode = 409; 
      this.details = `A matéria ${materia} já está cadastrado.`; 
    }
  }
  