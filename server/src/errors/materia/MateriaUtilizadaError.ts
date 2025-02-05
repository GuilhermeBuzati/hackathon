export class MateriaUtilizadaError extends Error {
    public statusCode: number;
    public details: string;
  
    constructor() {
     super('Não é possível excluir uma matéria que possui vínculos (Provas ou Temas)');
      
      this.name = 'MateriaUtilizadaError'; 
      this.statusCode = 409; 
      this.details = 'Não é possível excluir uma matéria que possui vínculos (Provas ou Temas)'
    }
  }
  