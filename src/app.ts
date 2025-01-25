import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import mainRouter from './routes/main';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3002;

// Definindo o uso do middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", mainRouter);

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados');
  })
  .catch((error) => {  // Corrigido para capturar o erro
    console.error('Erro ao conectar ao banco de dados', error);
  });


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
  
export default app;
