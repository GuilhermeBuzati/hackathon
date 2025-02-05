import { Professor } from "../domain/entities/Professor";
import { PerguntaRepository } from "../domain/repositories/PerguntaRepository";
import { ProfessorRepository } from "../domain/repositories/ProfessorRepository";
import { ProfessorDTO } from "../dto/ProfessorDTO";
import { ProfessorUtilizadaError } from "../errors/professor/ProfessorUtilizadaError";


export class ProfessorService {
  private professorRepository = new ProfessorRepository();
  private perguntasRepository = new PerguntaRepository();

  async create(professorDTO: ProfessorDTO): Promise<Professor> {

    const professor = new Professor();
    professor.nome = professorDTO.nome;
    professor.email = professorDTO.email;
    professor.senha = professorDTO.senha;

    return await this.professorRepository.save(professor);
  }

  async getById(id: number): Promise<Professor> {
    return await this.professorRepository.getById(id);
  }

  async getAll(): Promise<Professor[]> {
    return await this.professorRepository.getAll();
  }

  async patchById(professorDTO: ProfessorDTO): Promise<Professor> {

    const professorExistente = await this.professorRepository.getById(professorDTO.id);

    Object.assign(professorExistente, professorDTO);

    return await this.professorRepository.patchById(professorExistente);
  }

  async deleteById(id: number): Promise<void> {

    const perguntasProfessor = await this.perguntasRepository.getByProfessorId(id);

    if (perguntasProfessor.length > 0) {
      throw new ProfessorUtilizadaError();
    }

    const professorExistente = await this.professorRepository.getById(id);

    await this.professorRepository.delete(professorExistente);
  }

}