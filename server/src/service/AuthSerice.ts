// src/services/AuthService.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ProfessorRepository } from "../domain/repositories/ProfessorRepository";
import { EmailSenhaInvalidoError } from "../errors/professor/EmailSenhaInvalidosError";
import { LoginDTO } from "../dto/ProfessorDTO";
import { EmailNaoEncontradoError } from "../errors/professor/EmailNaoEncontradoError";

export class AuthService {
  private professorRepository = new ProfessorRepository();

  async login(
    loginDTO: LoginDTO
  ): Promise<{ id: number; nome: string; email: string; token: string }> {
    const email = loginDTO.email;
    const senha = loginDTO.senha;
    try {
      const professor = await this.professorRepository.getByEmail(email);

      const senhaValida = await bcrypt.compare(senha, professor.senha);
      if (!senhaValida) {
        throw new EmailSenhaInvalidoError();
      }

      const token = jwt.sign(
        { professorId: professor.id, email: professor.email },
        process.env.JWT_SECRET || "defaultsecret",
        { expiresIn: "1h" }
      );

      return {
        id: professor.id,
        nome: professor.nome,
        email: professor.email,
        token: token,
      };
    } catch (error) {
      console.error("Problemas ao logar professor", error);

      if (error instanceof EmailSenhaInvalidoError) {
        throw error;
      } else if (error instanceof EmailNaoEncontradoError) {
        throw error;
      }

      throw new Error("Problemas ao logar professor");
    }
  }

  async hashPassword(senha: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(senha, 10);

    return hashedPassword;
  }
}
