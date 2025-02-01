import express, { NextFunction, Request, Response } from 'express';
import ProfessorController from '../controller/ProfessorController';
const professorRouter = express.Router();


professorRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ProfessorController.create(req, res);
  } catch (error) {
    next(error);
  }
});

professorRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProfessorController.getById(req, res);
    } catch (error) {
      next(error);
    }
});

professorRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProfessorController.getAll(req, res);
    } catch (error) {
      next(error);
    }
});

professorRouter.patch('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProfessorController.patchById(req, res);
    } catch (error) {
      next(error);
    }
});

professorRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProfessorController.delete(req, res);
    } catch (error) {
      next(error);
    }
});

professorRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ProfessorController.login(req, res);
  } catch (error) {
    next(error);
  }
});

export default professorRouter;
