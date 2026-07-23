import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
import { env } from './env'
import { validateJwt } from "./http/middlewares/jwt-validate";
import { usuariosRoutes } from "./http/controllers/usuarios/routes";
import { turmasRoutes } from "./http/controllers/turmas/routes";
import { disciplinasRoutes } from "./http/controllers/disciplinas/routes";
import { alunosRoutes } from "./http/controllers/alunos/routes";
import { aulasRoutes } from "./http/controllers/aulas/routes";
import { alunosTurmaRoutes } from "./http/controllers/aluno_turma/routes";
import { professorTurmaRoutes } from "./http/controllers/professor_turma/routes";
import { alunoAulaRoutes } from "./http/controllers/aluno_aula/routes";
import { relatoriosRoutes } from "./http/controllers/relatorios/routes";

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
app.register(aulasRoutes);
app.register(alunosTurmaRoutes);
app.register(professorTurmaRoutes);
app.register(alunoAulaRoutes);
app.register(relatoriosRoutes);