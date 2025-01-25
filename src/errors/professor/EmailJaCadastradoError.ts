export class EmailJaCadastradoError extends Error {
    public statusCode: number;
    public details: string;
  
    // Construtor da exceção personalizada
    constructor(email: string) {
      super(`O email ${email} já está cadastrado.`);
      
      this.name = 'EmailJaCadastradoError'; 
      this.statusCode = 409; 
      this.details = `O email ${email} já está cadastrado.`; 
    }
  }
  