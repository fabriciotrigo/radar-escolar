import { Turmas } from "../../entities/turmas.entity";
import { TurmasRepository } from "../../repositories/turmas.repository";
import { TurmasFilters } from "../../interfaces/findTurmasFilters";

export class FindTurmasUseCase {

    constructor(
        private turmasRepository: TurmasRepository
    ) {}

    async handler(
        filtros: TurmasFilters
    ): Promise<Turmas[]> {

        return await this.turmasRepository.findTurmas(filtros);

    }

}