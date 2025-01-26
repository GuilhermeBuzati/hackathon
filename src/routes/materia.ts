import express, { NextFunction, Request, Response } from 'express';
import MateriaController from '../controller/MateriaController';
const materiaRouter = express.Router();


materiaRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await MateriaController.getById(req, res);
    } catch (error) {
      next(error);
    }
});

materiaRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await MateriaController.getAll(req, res);
    } catch (error) {
      next(error);
    }
});


export default materiaRouter;
