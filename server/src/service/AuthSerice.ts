// src/services/AuthService.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ProfessorRepository } from '../domain/repositories/ProfessorRepository';
import { EmailSenhaInvalidosError } from '../errors/professor/EmailSenhaInvalidosError';
import { LoginDTO } from '../dto/ProfessorDTO';

export class AuthService {
  private professorRepository = new ProfessorRepository();

  async login(loginDTO: LoginDTO): Promise<string> {
    const email = loginDTO.email;
    const senha = loginDTO.senha;
    try{
        const professor = await this.professorRepository.getByEmail(email);

        const senhaValida = await bcrypt.compare(senha, professor.senha);
        if (!senhaValida) {
          throw new EmailSenhaInvalidosError();
        }
    
        const token = jwt.sign(
          { professorId: professor.id, email: professor.email },
          process.env.JWT_SECRET || 'defaultsecret',
          { expiresIn: '1h' }
        );
    
        return token;
    } catch (error) {
      console.error("Problemas ao logar professor", error);

      if (error instanceof EmailSenhaInvalidosError) {
        throw error;
      }

      throw new Error('Problemas ao logar professor');
    }
  }

  async hashPassword(senha: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(senha, 10);

    return hashedPassword
  }
}
