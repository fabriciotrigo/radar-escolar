export class ProfessorTurma {
    id?: number;
    professor_id: number;
    turma_id: number;
    disciplina_id: number;

    constructor(
        professor_id: number,
        turma_id: number,
        disciplina_id: number
    ) {
        this.professor_id = professor_id;
        this.turma_id = turma_id;
        this.disciplina_id = disciplina_id;
    }
}