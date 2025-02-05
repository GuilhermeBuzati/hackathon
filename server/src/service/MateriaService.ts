import { Materia } from "../domain/entities/Materia";
import { MateriaRepository } from "../domain/repositories/MateriaRepository";
import { ProvaRepository } from "../domain/repositories/ProvaRepository";
import { TemaRepository } from "../domain/repositories/TemaRepository";
import { MateriaDTO } from "../dto/MateriaDTO";
import { MateriaUtilizadaError } from "../errors/materia/MateriaUtilizadaError";

export class MateriaService {
  private repository = new MateriaRepository();
  private temaRepository = new TemaRepository();
  private provaRepository = new ProvaRepository();

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

    const temas = await this.temaRepository.getByMateriaId(id);

    const provas = await this.provaRepository.getByMateriaId(id);

    if (temas.length > 0 || provas.length > 0) {
      throw new MateriaUtilizadaError();
    }

    await this.repository.delete(materiaExistente);
  }

}