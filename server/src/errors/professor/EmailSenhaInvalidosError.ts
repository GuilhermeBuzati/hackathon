export class EmailSenhaInvalidosError extends Error {
    public statusCode: number;
    public details: string;
  
    // Construtor da exceção personalizada
    constructor() {
      super(`E-mail ou senha inválidos.`);
      
      this.name = 'EmailSenhaInvalidosError'; 
      this.statusCode = 409; 
      this.details = `E-mail ou senha inválidos.`; 
    }
  }
  