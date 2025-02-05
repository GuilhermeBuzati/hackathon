
import { Prova } from "../domain/entities/Prova";
import { MateriaRepository } from "../domain/repositories/MateriaRepository";
import { PerguntaRepository } from "../domain/repositories/PerguntaRepository";
import { ProvaRepository } from "../domain/repositories/ProvaRepository";
import { ProvaDTO } from "../dto/ProvaDTO";


export class ProvaService {
  private repository = new ProvaRepository();
  private materiaRepository = new MateriaRepository();
  private perguntRepository = new PerguntaRepository();

  async create(provaDTO: ProvaDTO): Promise<Prova> {

    const materia = await this.materiaRepository.getById(provaDTO.materiaId);
    const perguntas = await this.perguntRepository.getByIds(provaDTO.perguntas);

    const prova = new Prova();
    prova.titulo = provaDTO.titulo;
    prova.materia = materia;
    prova.perguntas = perguntas;

    return await this.repository.save(prova);
  }

  async getById(id: number): Promise<Prova> {
    return await this.repository.getById(id);
  }

  async getAll(): Promise<Prova[]> {
    return await this.repository.getAll();
  }

  async patchById(provaDTO: ProvaDTO): Promise<Prova> {
    const provaExistente = await this.getById(provaDTO.id);

    provaExistente.titulo = provaDTO.titulo || provaExistente.titulo;

    if (provaDTO.materiaId && provaDTO.materiaId !== provaExistente.materia?.id) {
        const materia = await this.materiaRepository.getById(provaDTO.materiaId);
        provaExistente.materia = materia;
    }

    if (provaDTO.perguntas && provaDTO.perguntas.length > 0) {
        const perguntas = await this.perguntRepository.getByIds(provaDTO.perguntas);
        provaExistente.perguntas = perguntas;
    }

    return await this.repository.save(provaExistente);
}


  async deleteById(id: number): Promise<void> {

    const provaExistente = await this.repository.getById(id);

    await this.repository.delete(provaExistente);
  }

}