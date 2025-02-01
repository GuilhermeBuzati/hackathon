export class PeriodoJaCadastradoError extends Error {
    public statusCode: number;
    public details: string;
  
    // Construtor da exceção personalizada
    constructor(periodo: string) {
      super(`O período ${periodo} já está cadastrado.`);
      
      this.name = 'PeriodoJaCadastradoError'; 
      this.statusCode = 409; 
      this.details = `O período ${periodo} já está cadastrado.`; 
    }
  }
  