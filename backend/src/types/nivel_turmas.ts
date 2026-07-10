import { z } from "zod";

export const nivelSchema = z.enum([
    "FUNDAMENTAL",
    "MEDIO",
]);

export type NivelEnsino = z.infer<typeof nivelSchema>;