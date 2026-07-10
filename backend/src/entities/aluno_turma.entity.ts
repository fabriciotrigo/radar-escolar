export class AlunoTurma {
    id?: number;
    aluno_id: number;
    turma_id: number;

    constructor(
        aluno_id: number,
        turma_id: number
    ) {
        this.aluno_id = aluno_id;
        this.turma_id = turma_id;
    }
}