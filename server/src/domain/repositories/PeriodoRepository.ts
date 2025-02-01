import { QueryFailedError } from "typeorm";
import { AppDataSource } from "../../data-source";
import { PeriodoNaoEncontradoError } from "../../errors/periodo/PeriodoNaoEncontradoError";
import { Periodo } from "../entities/Periodo";
import { PgErrorCodes } from "../../enums/PgErrorCodes";
import { PeriodoJaCadastradoError } from "../../errors/periodo/PeriodoJaCadastradoError";

export class PeriodoRepository {
  private repository = AppDataSource.getRepository(Periodo);

  async save(periodo: Periodo): Promise<Periodo> {
    try {

      return await this.repository.save(periodo);

    } catch (error: unknown) {
      console.error("Erro ao tentar salvar o periodo:", error);

      if (error instanceof QueryFailedError) {
        if ((error as any).code === PgErrorCodes.UNIQUE_VIOLATION) {
          throw new PeriodoJaCadastradoError(periodo.descricao);
        }
      }
      throw new Error('Erro desconhecido ao tentar salvar o periodo');

    }
  }

  async getById(id: number): Promise<Periodo> {
    try {

      const result = await this.repository.findOne({
        where: {
          id: id,
        },
      });

      if (!result) {
        throw new PeriodoNaoEncontradoError(id);
      }

      return result;

    } catch (error) {
      console.error("Erro ao buscar o periodo:", error);

      if (error instanceof PeriodoNaoEncontradoError) {
        throw error;
      }

      throw new Error('Erro ao tentar buscar o periodo');
    }
  }

  async getAll(): Promise<Periodo[]> {
    try {

      const result = this.repository.find();
      
      return result;

    } catch (error) {
      console.error("Erro ao buscar os lista de periodos:", error);

      throw new Error('Erro ao tentar buscar os periodos');
    }
  }

  async patchById(periodo: Periodo): Promise<Periodo> {
      try {
    
        await this.repository.save(periodo);
        
        return periodo;

      } catch (error: unknown) {

        if (error instanceof QueryFailedError) {
          if ((error as any).code === PgErrorCodes.UNIQUE_VIOLATION) {
            throw new PeriodoJaCadastradoError(periodo.descricao);
          }
        }
        throw new Error('Erro desconhecido ao tentar alterar o periodo');

      }
  }

  async delete(periodo: Periodo): Promise<void> {
    try{

      await this.repository.delete(periodo);

    } catch (error) {
      console.error("Erro desconhecido ao tentar deletar o periodo:", error);

      throw new Error('Erro desconhecido ao tentar deletar o periodo');
    }

  }

}