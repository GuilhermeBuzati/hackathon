export class TemaJaCadastradoError extends Error {
    public statusCode: number;
    public details: string;
  
    // Construtor da exceção personalizada
    constructor(tema: string) {
      super(`O email ${tema} já está cadastrado.`);
      
      this.name = 'TemaJaCadastradoError'; 
      this.statusCode = 409; 
      this.details = `O tema ${tema} já está cadastrado.`; 
    }
  }
  