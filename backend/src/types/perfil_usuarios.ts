import { z } from "zod";

export const perfilSchema = z.enum([
    "PROFESSOR",
    "COORDENADOR",
]);

export type Perfil = z.infer<typeof perfilSchema>;