import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import mainRouter from './routes/main';
import professorRouter from './routes/professor';
import { errorHandler } from './errors/errorHandler';
import periodoRouter from './routes/periodo';
import materiaRouter from './routes/materia';
import temaRouter from './routes/tema';
import perguntaRouter from './routes/pergunta';
import provaRouter from './routes/prova';
import { authMiddleware } from './middlewares/AuthMiddleware';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3002;

// Definindo o uso do middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authMiddleware);

app.use("/", mainRouter);
app.use("/professor", professorRouter)
app.use("/periodo", periodoRouter)
app.use("/materia", materiaRouter)
app.use("/tema", temaRouter)
app.use("/pergunta", perguntaRouter)
app.use("/prova", provaRouter)

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados');
  })
  .catch((error) => {  // Corrigido para capturar o erro
    console.error('Erro ao conectar ao banco de dados', error);
  });


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
  
export default app;
