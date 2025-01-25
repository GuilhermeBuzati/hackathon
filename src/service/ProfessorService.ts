import { Professor } from "../domain/entities/Professor";
import { ProfessorRepository } from "../domain/repositories/ProfessorRepository";
import { ProfessorDTO } from "../dto/ProfessorDTO";


export class ProfessorService {
  private professorRepository = new ProfessorRepository();

  async createAlimento(professorDTO: ProfessorDTO): Promise<Professor> {

    const professor = new Professor();
    professor.nome = professorDTO.nome;
    professor.email = professorDTO.email;
    professor.senha = professorDTO.senha;

    return await this.professorRepository.save(professor);
  }

  async getById(id: number): Promise<Professor> {
    return await this.professorRepository.getById(id);
  }

}