import { Resposta } from "../domain/entities/Resposta";
import { PerguntaRepository } from "../domain/repositories/PerguntaRepository";
import { RespostaRepository } from "../domain/repositories/RespostaRepository";
import { RespostaDTO } from "../dto/RespostaDTO";

export class RespostaService {
  private repository = new RespostaRepository();
  private repositoryPergunta = new PerguntaRepository();

  async create(respostaDTO: RespostaDTO): Promise<Resposta> {

    const pergunta = await this.repositoryPergunta.getById(respostaDTO.perguntaId);

    const resposta = new Resposta();
    resposta.descricao = respostaDTO.descricao;
    resposta.pergunta = pergunta;

    return await this.repository.save(resposta);
  }

  async getById(id: number): Promise<Resposta> {
    return await this.repository.getById(id);
  }

  async getAll(): Promise<Resposta[]> {
    return await this.repository.getAll();
  }

  async patchById(respostaDTO: RespostaDTO): Promise<Resposta> {

    const temaExistente = await this.repository.getById(respostaDTO.id);

    Object.assign(temaExistente, respostaDTO);

    return await this.repository.patchById(temaExistente);
  }

  async deleteById(id: number): Promise<void> {

    const temaExistente = await this.repository.getById(id);

    await this.repository.delete(temaExistente);
  }

}