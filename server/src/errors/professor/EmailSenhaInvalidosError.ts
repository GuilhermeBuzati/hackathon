export class EmailSenhaInvalidoError extends Error {
    public statusCode: number;
    public details: string;
  
    // Construtor da exceção personalizada
    constructor() {
      super(`E-mail ou senha inválidos.`);
      
      this.name = 'EmailSenhaInvalidoError'; 
      this.statusCode = 409; 
      this.details = `E-mail ou senha inválidos.`; 
    }
  }
  