import { Periodo } from "../domain/entities/Periodo";
import { PeriodoRepository } from "../domain/repositories/PeriodoRepository";
import { PeriodoDTO } from "../dto/PeriodoDTO";


export class PeriodoService {
  private repository = new PeriodoRepository();

  async create(periodoDTO: PeriodoDTO): Promise<Periodo> {

    const periodo = new Periodo();
    periodo.descricao = periodoDTO.descricao;

    return await this.repository.save(periodo);
  }

  async getById(id: number): Promise<Periodo> {
    return await this.repository.getById(id);
  }

  async getAll(): Promise<Periodo[]> {
    return await this.repository.getAll();
  }

  async patchById(PeriodoDTO: PeriodoDTO): Promise<Periodo> {

    const periodoExistente = await this.repository.getById(PeriodoDTO.id);

    Object.assign(periodoExistente, PeriodoDTO);

    return await this.repository.patchById(periodoExistente);
  }

  async deleteById(id: number): Promise<void> {

    const periodoExistente = await this.repository.getById(id);

    await this.repository.delete(periodoExistente);
  }
  

}