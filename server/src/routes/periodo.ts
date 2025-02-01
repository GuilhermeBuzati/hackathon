import express, { NextFunction, Request, Response } from 'express';
import PeriodoController from '../controller/PeriodoController';
const periodoRouter = express.Router();

periodoRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await PeriodoController.create(req, res);
    } catch (error) {
      next(error);
    }
});

periodoRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await PeriodoController.getById(req, res);
    } catch (error) {
      next(error);
    }
});

periodoRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await PeriodoController.getAll(req, res);
    } catch (error) {
      next(error);
    }
});

periodoRouter.patch('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await PeriodoController.patchById(req, res);
    } catch (error) {
      next(error);
    }
});

export default periodoRouter;
