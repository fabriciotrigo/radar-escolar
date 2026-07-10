import { NivelEnsino } from "../types/nivel_turmas";

export interface TurmasFilters {
    ano?: number | undefined;
    sala?: string | undefined;
    nivel?: NivelEnsino | undefined;
    ano_letivo?: number | undefined;
}