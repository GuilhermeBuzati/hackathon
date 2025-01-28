import express, { Request, Response } from 'express';
const mainRouter = express.Router();

/* GET home page. */
mainRouter.get('/', (req: Request, res: Response) => {
  res.send('respond with a resource');
});

export default mainRouter;
