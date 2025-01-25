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

    async __validateDTO(dto: ProfessorDTO): Promise<void> {
        const errors = await validate(dto);
        
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new ProfessorDTOInvalidoError(errorMessages);
        }

    }
}

export default new ProfessorController();