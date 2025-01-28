import { In, QueryFailedError } from "typeorm";
import { AppDataSource } from "../../data-source";
import { PgErrorCodes } from "../../enums/PgErrorCodes";
import { Tema } from "../entities/Tema";
import { TemaJaCadastradoError } from "../../errors/tema/TemaJaCadastradoError";
import { TemaNaoEncontradoError } from "../../errors/tema/TemaNaoEncontradoError";

export class TemaRepository {
  private repository = AppDataSource.getRepository(Tema);

  async save(tema: Tema): Promise<Tema> {
    try {

      return await this.repository.save(tema);

    } catch (error: unknown) {
      console.error("Erro ao tentar salvar o tema:", error);

      if (error instanceof QueryFailedError) {
        if ((error as any).code === PgErrorCodes.UNIQUE_VIOLATION) {
          throw new TemaJaCadastradoError(tema.descricao);
        }
      }
      throw new Error('Erro desconhecido ao tentar salvar o tema');

    }
  }

  async getById(id: number): Promise<Tema> {
    try {

      const result = await this.repository.findOne({
        where: {
          id: id,
        },
      });

      if (!result) {
        throw new TemaNaoEncontradoError(id);
      }

      return result;

    } catch (error) {
      console.error("Erro ao buscar o tema:", error);

      if (error instanceof TemaNaoEncontradoError) {
        throw error;
      }

      throw new Error('Erro ao tentar buscar o tema');
    }
  }

  async getAll(): Promise<Tema[]> {
    try {

      const result = this.repository.find();
      
      return result;

    } catch (error) {
      console.error("Erro ao buscar os lista de temas:", error);

      throw new Error('Erro ao tentar buscar os temas');
    }
  }

  async patchById(tema: Tema): Promise<Tema> {
    try {
 
      await this.repository.save(tema);
      
      return tema;

    } catch (error: unknown) {

      if (error instanceof QueryFailedError) {
        if ((error as any).code === PgErrorCodes.UNIQUE_VIOLATION) {
          throw new TemaJaCadastradoError(tema.descricao);
        }
      }
      throw new Error('Erro desconhecido ao tentar alterar o tema');

    }
  }

  async delete(tema: Tema): Promise<void> {
    try{

      await this.repository.delete(tema);

    } catch (error) {
      console.error("Erro desconhecido ao tentar deletar o tema:", error);

      throw new Error('Erro desconhecido ao tentar deletar o tema');
    }

  }
}