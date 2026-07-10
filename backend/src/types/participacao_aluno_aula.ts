import { z } from "zod";

export const participacaoSchema = z.enum([
    "ALTA",
    "MEDIA",
    "BAIXA",
    "NAO_INFORMADA"
]);

export type Participacao = z.infer<typeof participacaoSchema>;