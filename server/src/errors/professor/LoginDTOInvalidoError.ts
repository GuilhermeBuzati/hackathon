export class LoginDTOInvalidoError extends Error {
    public statusCode: number;
    public details: string[];    
  
    // Construtor da exceção personalizada
    constructor(error: string[]) {
      super(`Problemas ao ler loginDTO.`);
      
      this.name = "LoginDTOInvalidoError"; 
      this.statusCode = 400; 
      this.details = error; 
    }
  }
  