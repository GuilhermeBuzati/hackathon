import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { MateriaService } from '../service/MateriaService';


class MateriaController {
    private service = new MateriaService();

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
}

export default new MateriaController();