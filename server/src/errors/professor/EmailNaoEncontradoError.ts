export class EmailNaoEncontradoError extends Error {
    public statusCode: number;
    public details: string;    
  
    // Construtor da exceção personalizada
    constructor(email: string) {
      super(`E-mail ${email} não encontrado.`);
      
      this.name = "EmailNaoEncontradoError"; 
      this.statusCode = 404; 
      this.details = `E-mail ${email} não encontrado.`; 
    }
  }
  