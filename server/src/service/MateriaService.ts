import { Materia } from "../domain/entities/Materia";
import { MateriaRepository } from "../domain/repositories/MateriaRepository";
import { MateriaDTO } from "../dto/MateriaDTO";

export class MateriaService {
  private repository = new MateriaRepository();

  async create(materiaDTO: MateriaDTO): Promise<Materia> {

    const materia = new Materia();
    materia.descricao = materiaDTO.descricao;

    return await this.repository.save(materia);
  }

  async getById(id: number): Promise<Materia> {
    return await this.repository.getById(id);
  }

  async getAll(): Promise<Materia[]> {
    return await this.repository.getAll();
  }

  async patchById(materiaDTO: MateriaDTO): Promise<Materia> {

    const temaExistente = await this.repository.getById(materiaDTO.id);

    Object.assign(temaExistente, materiaDTO);

    return await this.repository.patchById(temaExistente);
  }

  async deleteById(id: number): Promise<void> {

    const materiaExistente = await this.repository.getById(id);

    await this.repository.delete(materiaExistente);
  }

}