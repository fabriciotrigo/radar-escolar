export class Aulas {
    id?: number;
    professor_turma_id: number;
    data: Date;
    assunto: string;

    constructor(
        professor_turma_id: number,
        data: Date,
        assunto: string
    ) {
        this.professor_turma_id = professor_turma_id;
        this.data = data;
        this.assunto = assunto;
    }
}