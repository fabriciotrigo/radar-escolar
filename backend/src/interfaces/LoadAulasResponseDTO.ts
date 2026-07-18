export interface AulaResumoDTO {
    aula_id: number
    data: Date
    assunto: string
    percentual_presenca: number
    participacao_media: string
    nota_media: number | null
}

export interface LoadAulasResponseDTO {
    data: AulaResumoDTO[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}