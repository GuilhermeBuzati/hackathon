import { In, QueryFailedError } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Professor } from "../entities/Professor";
import { EmailJaCadastradoError } from "../../errors/professor/EmailJaCadastradoError";
import { PgErrorCodes } from "../../enums/PgErrorCodes";
import { ProfessorNaoEncontradoError } from "../../errors/professor/ProfessorNaoEncontradoError";
import { EmailNaoEncontradoError } from "../../errors/professor/EmailNaoEncontradoError";

export class ProfessorRepository {
  private repository = AppDataSource.getRepository(Professor);

  async save(professor: Professor): Promise<Professor> {
    try {

      return await this.repository.save(professor);

    } catch (error: unknown) {
      console.error("Erro ao tentar salvar o professor:", error);

      if (error instanceof QueryFailedError) {
        //eslint-disable-next-line
        if ((error as any).code === PgErrorCodes.UNIQUE_VIOLATION) {
          throw new EmailJaCadastradoError(professor.email);
        }
      }
      throw new Error('Erro desconhecido ao tentar salvar o professor');

    }
  }

  async getById(id: number): Promise<Professor> {
    try {

      const result = await this.repository.findOne({
        where: {
          id: id,
        },
      });

      if (!result) {
        throw new ProfessorNaoEncontradoError(id);
      }

      return result;

    } catch (error) {
      console.error("Erro ao buscar o professor:", error);

      if (error instanceof ProfessorNaoEncontradoError) {
        throw error;
      }

      throw new Error('Erro ao tentar buscar o professor');
    }
  }

  async getByEmail(email: string): Promise<Professor> {
    try {

      const result = await this.repository.findOne({
        where: {
          email: email,
        },
      });

      if (!result) {
        throw new EmailNaoEncontradoError(email);
      }

      return result;

    } catch (error) {
      console.error("Erro ao buscar o email de professor:", error);

      if (error instanceof EmailNaoEncontradoError) {
        throw error;
      }

      throw new Error('Erro ao tentar buscar o email de professor');
    }
  }

  async getAll(): Promise<Professor[]> {
    try {

      const result = this.repository.find();
      
      return result;

    } catch (error) {
      console.error("Erro ao buscar os lista de professores:", error);

      throw new Error('Erro ao tentar buscar os professores');
    }
  }

  async patchById(professor: Professor): Promise<Professor> {
    try {
 
      await this.repository.save(professor);
      
      return professor;

    } catch (error: unknown) {

      if (error instanceof QueryFailedError) {
        if ((error as any).code === PgErrorCodes.UNIQUE_VIOLATION) {
          throw new EmailJaCadastradoError(professor.email);
        }
      }
      throw new Error('Erro desconhecido ao tentar alterar o professor');

    }
  }

  async delete(professor: Professor): Promise<void> {
    try{

      await this.repository.delete(professor);

    } catch (error) {
      console.error("Erro desconhecido ao tentar deletar o professor:", error);

      throw new Error('Erro desconhecido ao tentar deletar o professor');
    }

  }
}