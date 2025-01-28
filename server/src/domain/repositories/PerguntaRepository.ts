import { In, QueryFailedError } from "typeorm";
import { AppDataSource } from "../../data-source";
import { PgErrorCodes } from "../../enums/PgErrorCodes";
import { Pergunta } from "../entities/Pergunta";
import { PerguntaJaCadastradaError } from "../../errors/pergunta/PerguntaJaCadastradaError";
import { PerguntaNaoEncontradoError } from "../../errors/pergunta/PerguntaNaoEncontradoError";

export class PerguntaRepository {
  private repository = AppDataSource.getRepository(Pergunta);

  async save(pergunta: Pergunta): Promise<Pergunta> {
    try {

      return await this.repository.save(pergunta);

    } catch (error: unknown) {
      console.error("Erro ao tentar salvar o pergunta:", error);

      if (error instanceof QueryFailedError) {
        if ((error as any).code === PgErrorCodes.UNIQUE_VIOLATION) {
          throw new PerguntaJaCadastradaError(pergunta.descricao);
        }
      }
      throw new Error('Erro desconhecido ao tentar salvar o pergunta');

    }
  }

  async getById(id: number): Promise<Pergunta> {
    try {

      const result = await this.repository.findOne({
        where: {
            id: id,
        }
    });

      if (!result) {
        throw new PerguntaNaoEncontradoError(id);
      }

      return result;

    } catch (error) {
      console.error("Erro ao buscar o pergunta:", error);

      if (error instanceof PerguntaNaoEncontradoError) {
        throw error;
      }

      throw new Error('Erro ao tentar buscar o pergunta');
    }
  }

  async getAll(): Promise<Pergunta[]> {
    try {

      const result = this.repository.find();
      
      return result;

    } catch (error) {
      console.error("Erro ao buscar os lista de perguntas:", error);

      throw new Error('Erro ao tentar buscar os perguntas');
    }
  }

  async patchById(pergunta: Pergunta): Promise<Pergunta> {
    try {
 
      await this.repository.save(pergunta);
      
      return pergunta;

    } catch (error: unknown) {

      if (error instanceof QueryFailedError) {
        if ((error as any).code === PgErrorCodes.UNIQUE_VIOLATION) {
          throw new PerguntaJaCadastradaError(pergunta.descricao);
        }
      }
      throw new Error('Erro desconhecido ao tentar alterar o pergunta');

    }
  }

  async delete(pergunta: Pergunta): Promise<void> {
    try{

      await this.repository.remove(pergunta);

    } catch (error) {
      console.error("Erro desconhecido ao tentar deletar o pergunta:", error);

      throw new Error('Erro desconhecido ao tentar deletar o pergunta');
    }

  }
}