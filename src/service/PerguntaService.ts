import { Pergunta } from "../domain/entities/Pergunta";
import { PerguntaRepository } from "../domain/repositories/PerguntaRepository";
import { ProfessorRepository } from "../domain/repositories/ProfessorRepository";
import { TemaRepository } from "../domain/repositories/TemaRepository";
import { PerguntaDTO } from "../dto/PerguntaDTO";
import { RespostaService } from "./RespostaService";

export class PerguntaService {
  private repository = new PerguntaRepository();
  private temaRepository = new TemaRepository();
  private professorRepository = new ProfessorRepository();
  private respostaService = new RespostaService();

  async create(perguntaDTO: PerguntaDTO): Promise<Pergunta> {

    const tema = await this.temaRepository.getById(perguntaDTO.temaId);
    const professor = await this.professorRepository.getById(perguntaDTO.professorId);

    const pergunta = new Pergunta();
    pergunta.descricao = perguntaDTO.descricao;
    pergunta.tema = tema;
    pergunta.professor = professor;

    const perguntaSaved = await this.repository.save(pergunta);
    
    const respostasPergunta = await Promise.all(
      perguntaDTO.respostasPergunta.map(async (resposta) => {
        resposta.perguntaId = perguntaSaved.id;                
          return await this.respostaService.create(resposta);
      })
    );

    perguntaSaved.respostasPergunta = respostasPergunta;

    return perguntaSaved;
  }

  async getById(id: number): Promise<Pergunta> {
    return await this.repository.getById(id);
  }

  async getAll(): Promise<Pergunta[]> {
    return await this.repository.getAll();
  }

  async patchById(perguntaDTO: PerguntaDTO): Promise<Pergunta> {

    const perguntaExistente = await this.repository.getById(perguntaDTO.id);

    Object.assign(perguntaExistente, perguntaDTO);

    return await this.repository.patchById(perguntaExistente);
  }

  async deleteById(id: number): Promise<void> {

    const perguntaExistente = await this.repository.getById(id);

    await this.repository.delete(perguntaExistente);
  }

}