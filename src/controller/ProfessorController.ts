import { Request, Response } from 'express';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ProfessorService } from '../service/ProfessorService';
import { ProfessorDTO } from '../dto/ProfessorDTO';
import { ProfessorDTOInvalidoError } from '../errors/professor/ProfessorDTOInvalidoError';


class ProfessorController {
    private service = new ProfessorService();

    async create(req: Request, res: Response): Promise<Response> {

        const professorDTO = plainToInstance(ProfessorDTO, req.body, { excludeExtraneousValues: true });

        await this.__validateDTO(professorDTO);

        const savedProfessor = await this.service.createAlimento(professorDTO);            

        return res.status(201).json(savedProfessor);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        const professor = await this.service.getById(id);

        const professorResponse = instanceToPlain(professor);
        
        return res.status(200).json(professorResponse);

    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const professores = await this.service.getAll();

        if (professores.length === 0) {
            return res.status(204).json();
        }

        const professoresResponse = professores.map(professor => instanceToPlain(professor));

        return res.status(200).json(professoresResponse);
    }

    async __validateDTO(dto: ProfessorDTO): Promise<void> {
        const errors = await validate(dto);
        
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new ProfessorDTOInvalidoError(errorMessages);
        }

    }
}

export default new ProfessorController();