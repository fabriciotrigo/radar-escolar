export class TurmaAlreadyExistsError extends Error {
    constructor() {
        super("Já existe uma turma cadastrada com essas informações.");
    }
}