
import { Tema } from "../domain/entities/Tema";
import { MateriaRepository } from "../domain/repositories/MateriaRepository";
import { PerguntaRepository } from "../domain/repositories/PerguntaRepository";
import { TemaRepository } from "../domain/repositories/TemaRepository";
import { TemaDTO } from "../dto/TemaDTO";
import { TemaUtilizadaError } from "../errors/tema/TemaUtilizadaError";


export class TemaService {
  private repository = new TemaRepository();
  private materiaRepository = new MateriaRepository();
  private perguntaRepository = new PerguntaRepository();

  async create(temaDTO: TemaDTO): Promise<Tema> {

    const materia = await this.materiaRepository.getById(temaDTO.materiaId);

    const tema = new Tema();
    tema.descricao = temaDTO.descricao;
    tema.materia = materia;
    tema.periodo = temaDTO.periodo;

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

    const perguntasTema = await this.perguntaRepository.getByTemaId(id);
    
    if (perguntasTema.length > 0) {
      throw new TemaUtilizadaError();
    }

    const temaExistente = await this.repository.getById(id);

    await this.repository.delete(temaExistente);
  }

}