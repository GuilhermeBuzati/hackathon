import express, { NextFunction, Request, Response } from 'express';
import PeriodoController from '../controller/PeriodoController';
const periodoRouter = express.Router();


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


export default periodoRouter;
