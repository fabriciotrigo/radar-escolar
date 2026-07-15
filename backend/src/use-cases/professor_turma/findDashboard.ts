import { ProfessorTurmaDashboardDTO } from "../../interfaces/professorTurmaDashboardDTO";
import { ProfessorTurmaRepository } from "../../repositories/professor_turma.repository";

export class FindDashboardUseCase {

    constructor(
        private professorTurmaRepository: ProfessorTurmaRepository
    ) {}

    public async handler(
        professorId: number,
        anoLetivo: number
    ): Promise<ProfessorTurmaDashboardDTO[]> {

        const dashboard =
            await this.professorTurmaRepository.findDashboard(
                professorId,
                anoLetivo
            )
        return dashboard
    }
}