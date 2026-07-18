import { AulasRepository } from "../../repositories/aulas.repository";
import { LoadAulasResponseDTO } from "../../interfaces/LoadAulasResponseDTO";

interface LoadAulasUseCaseRequest {
    professorTurmaId: number;
    page: number;
    limit: number;
}

export class LoadAulasUseCase {

    constructor(
        private aulasRepository: AulasRepository
    ) {}

    async execute({
        professorTurmaId,
        page,
        limit
    }: LoadAulasUseCaseRequest): Promise<LoadAulasResponseDTO> {

        const result = await this.aulasRepository.loadAulas(
            professorTurmaId,
            page,
            limit
        );

        return {
            data: result.data,
            page,
            limit,
            total: result.total,
            totalPages: Math.ceil(result.total / limit)
        };
    }

}