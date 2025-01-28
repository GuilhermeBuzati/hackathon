import { Materia } from "../domain/entities/Materia";
import { MateriaRepository } from "../domain/repositories/MateriaRepository";

export class MateriaService {
  private repository = new MateriaRepository();

  async getById(id: number): Promise<Materia> {
    return await this.repository.getById(id);
  }

  async getAll(): Promise<Materia[]> {
    return await this.repository.getAll();
  }

}