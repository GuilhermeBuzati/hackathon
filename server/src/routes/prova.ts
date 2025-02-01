import express, { NextFunction, Request, Response } from 'express';
import ProvaController from '../controller/ProvaController';
const provaRouter = express.Router();


provaRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ProvaController.create(req, res);
  } catch (error) {
    next(error);
  }
});

provaRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProvaController.getById(req, res);
    } catch (error) {
      next(error);
    }
});

provaRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProvaController.getAll(req, res);
    } catch (error) {
      next(error);
    }
});

provaRouter.patch('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProvaController.patchById(req, res);
    } catch (error) {
      next(error);
    }
});

provaRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProvaController.delete(req, res);
    } catch (error) {
      next(error);
    }
});

export default provaRouter;
