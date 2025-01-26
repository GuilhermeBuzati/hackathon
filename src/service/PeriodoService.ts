import { Periodo } from "../domain/entities/Periodo";
import { PeriodoRepository } from "../domain/repositories/PeriodoRepository";


export class PeriodoService {
  private repository = new PeriodoRepository();

  async getById(id: number): Promise<Periodo> {
    return await this.repository.getById(id);
  }

  async getAll(): Promise<Periodo[]> {
    return await this.repository.getAll();
  }

}