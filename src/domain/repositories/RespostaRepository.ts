import { In, QueryFailedError } from "typeorm";
import { AppDataSource } from "../../data-source";
import { PgErrorCodes } from "../../enums/PgErrorCodes";
import { Resposta } from "../entities/Resposta";
import { RespostaJaCadastradaError } from "../../errors/resposta/RespostaJaCadastradaError";
import { RespostaNaoEncontradoError } from "../../errors/resposta/RespostaNaoEncontradoError";

export class RespostaRepository {
  private repository = AppDataSource.getRepository(Resposta);

  async save(resposta: Resposta): Promise<Resposta> {
    try {

      return await this.repository.save(resposta);

    } catch (error: unknown) {
      console.error("Erro ao tentar salvar o resposta:", error);

      if (error instanceof QueryFailedError) {
        if ((error as any).code === PgErrorCodes.UNIQUE_VIOLATION) {
          throw new RespostaJaCadastradaError(resposta.descricao);
        }
      }
      throw new Error('Erro desconhecido ao tentar salvar o resposta');

    }
  }

  async getById(id: number): Promise<Resposta> {
    try {

      const result = await this.repository.findOne({
        where: {
          id: id,
        },
      });

      if (!result) {
        throw new RespostaNaoEncontradoError(id);
      }

      return result;

    } catch (error) {
      console.error("Erro ao buscar o resposta:", error);

      if (error instanceof RespostaNaoEncontradoError) {
        throw error;
      }

      throw new Error('Erro ao tentar buscar o resposta');
    }
  }

  async getAll(): Promise<Resposta[]> {
    try {

      const result = this.repository.find();
      
      return result;

    } catch (error) {
      console.error("Erro ao buscar os lista de respostas:", error);

      throw new Error('Erro ao tentar buscar os respostas');
    }
  }

  async patchById(resposta: Resposta): Promise<Resposta> {
    try {
 
      await this.repository.save(resposta);
      
      return resposta;

    } catch (error: unknown) {

      if (error instanceof QueryFailedError) {
        if ((error as any).code === PgErrorCodes.UNIQUE_VIOLATION) {
          throw new RespostaJaCadastradaError(resposta.descricao);
        }
      }
      throw new Error('Erro desconhecido ao tentar alterar o resposta');

    }
  }

  async delete(resposta: Resposta): Promise<void> {
    try{

      await this.repository.delete(resposta);

    } catch (error) {
      console.error("Erro desconhecido ao tentar deletar o resposta:", error);

      throw new Error('Erro desconhecido ao tentar deletar o resposta');
    }

  }
}