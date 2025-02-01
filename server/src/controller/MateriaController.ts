import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { MateriaService } from '../service/MateriaService';
import { MateriaDTO } from '../dto/MateriaDTO';
import { validate } from 'class-validator';
import { MateriaDTOInvalidaError } from '../errors/materia/MateriaDTOInvalidaError';


class MateriaController {
    private service = new MateriaService();
    
    async create(req: Request, res: Response): Promise<Response> {

        const temaDTO = plainToInstance(MateriaDTO, req.body, { excludeExtraneousValues: true });

        await this.__validateDTO(temaDTO);

        const materia = await this.service.create(temaDTO);            

        return res.status(201).json(materia);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        const materia = await this.service.getById(id);

        const materiaResponse = instanceToPlain(materia);
        
        return res.status(200).json(materiaResponse);

    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const materias = await this.service.getAll();

        if (materias.length === 0) {
            return res.status(204).json();
        }

        const materiasResponse = materias.map(materia => instanceToPlain(materia));

        return res.status(200).json(materiasResponse);
    }

    async patchById(req: Request, res: Response): Promise<Response> {   

        const materiaDTO = plainToInstance(MateriaDTO, req.body, { excludeExtraneousValues: true });     
        
        await this.__validateDTO(materiaDTO);

        const materia = await this.service.patchById(materiaDTO);

        return res.status(200).json(materia);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        await this.service.deleteById(id);

        return res.status(204).json();        
    }
    

    async __validateDTO(dto: MateriaDTO): Promise<void> {
        const errors = await validate(dto);
        
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new MateriaDTOInvalidaError(errorMessages);
        }

    }
}

export default new MateriaController();