import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
import { env } from './env'
import { validateJwt } from "./http/middlewares/jwt-validate";
import { usuariosRoutes } from "./http/controllers/usuarios/routes";
import { turmasRoutes } from "./http/controllers/turmas/routes";
import { disciplinasRoutes } from "./http/controllers/disciplinas/routes";
import { alunosRoutes } from "./http/controllers/alunos/routes";

export const app = Fastify();

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: { expiresIn: '15m' }
});

app.addHook('onRequest', validateJwt)

app.register(usuariosRoutes);
app.register(turmasRoutes);
app.register(disciplinasRoutes);
app.register(alunosRoutes);
