import express, { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import auth from './middlewares/auth';

const routes = new Router();


routes.use(express.static('./src/public'));
//rotas publicas
routes.post('/signup', UserController.create);   //Criar usuario
routes.post('/signin', SessionController.create);  // autenticar login


//middleware
routes.use(auth);

//rotas privadas
routes.get('/users', UserController.index);
routes.get('/user', UserController.usuarioLogado);


export default routes;