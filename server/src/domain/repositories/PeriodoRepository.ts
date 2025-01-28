import { AppDataSource } from "../../data-source";
import { PeriodoNaoEncontradoError } from "../../errors/periodo/PeriodoNaoEncontradoError";
import { Periodo } from "../entities/Periodo";

export class PeriodoRepository {
  private repository = AppDataSource.getRepository(Periodo);

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

}