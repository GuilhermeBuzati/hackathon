import { Request, Response } from 'express';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { TemaService } from '../service/TemaService';
import { TemaDTO } from '../dto/TemaDTO';
import { TemaDTOInvalidoError } from '../errors/tema/TemaDTOInvalidoError';


class TemaController {
    private service = new TemaService();

    async create(req: Request, res: Response): Promise<Response> {

        const temaDTO = plainToInstance(TemaDTO, req.body, { excludeExtraneousValues: true });

        await this.__validateDTO(temaDTO);

        const savedTema = await this.service.create(temaDTO);            

        return res.status(201).json(savedTema);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        const tema = await this.service.getById(id);

        const temaResponse = instanceToPlain(tema);
        
        return res.status(200).json(temaResponse);

    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const temas = await this.service.getAll();

        if (temas.length === 0) {
            return res.status(204).json();
        }

        const temasResponse = temas.map(tema => instanceToPlain(tema));

        return res.status(200).json(temasResponse);
    }

    async patchById(req: Request, res: Response): Promise<Response> {   

        const temaDTO = plainToInstance(TemaDTO, req.body, { excludeExtraneousValues: true });     
        
        await this.__validateDTO(temaDTO);

        const professor = await this.service.patchById(temaDTO);

        return res.status(200).json(professor);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);

        await this.service.deleteById(id);

        return res.status(204).json();        
    }


    async __validateDTO(dto: TemaDTO): Promise<void> {
        const errors = await validate(dto);
        
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new TemaDTOInvalidoError(errorMessages);
        }

    }
}

export default new TemaController();