import express, { Router } from 'express';
import UserController from './controllers/UserController';
import auth from './middlewares/auth';

const routes = new Router();


routes.use(express.static('./src/public'));
//rotas publicas
routes.post('/signup', UserController.create);   //Criar usuario


//middleware
routes.use(auth);

//rotas privadas
routes.get('/user', UserController.usuarioLogado);


export default routes;