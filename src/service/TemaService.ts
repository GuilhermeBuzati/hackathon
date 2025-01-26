
import { Tema } from "../domain/entities/Tema";
import { MateriaRepository } from "../domain/repositories/MateriaRepository";
import { PeriodoRepository } from "../domain/repositories/PeriodoRepository";
import { TemaRepository } from "../domain/repositories/TemaRepository";
import { TemaDTO } from "../dto/TemaDTO";


export class TemaService {
  private repository = new TemaRepository();
  private materiaRepository = new MateriaRepository();
  private periodoRepository = new PeriodoRepository();

  async create(temaDTO: TemaDTO): Promise<Tema> {

    const materia = await this.materiaRepository.getById(temaDTO.materiaId);
    const periodo = await this.periodoRepository.getById(temaDTO.periodoId);

    const tema = new Tema();
    tema.descricao = temaDTO.descricao;
    tema.materia = materia;
    tema.periodo = periodo;

    return await this.repository.save(tema);
  }

  async getById(id: number): Promise<Tema> {
    return await this.repository.getById(id);
  }

  async getAll(): Promise<Tema[]> {
    return await this.repository.getAll();
  }

  async patchById(temaDTO: TemaDTO): Promise<Tema> {

    const temaExistente = await this.repository.getById(temaDTO.id);

    Object.assign(temaExistente, temaDTO);

    return await this.repository.patchById(temaExistente);
  }

  async deleteById(id: number): Promise<void> {

    const temaExistente = await this.repository.getById(id);

    await this.repository.delete(temaExistente);
  }

}