import { In, QueryFailedError } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Professor } from "../entities/Professor";
import { EmailJaCadastradoError } from "../../errors/professor/EmailJaCadastradoError";
import { PgErrorCodes } from "../../enums/PgErrorCodes";

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
}