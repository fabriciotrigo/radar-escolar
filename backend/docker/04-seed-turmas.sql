-- =========================================================
-- 02 - TURMAS
-- =========================================================

INSERT INTO turmas (
    ano,
    sala,
    nivel,
    ano_letivo
)
VALUES
(6,'A','FUNDAMENTAL',2026),
(7,'B','FUNDAMENTAL',2026),
(8,'A','FUNDAMENTAL',2026)
ON CONFLICT (
    ano,
    sala,
    nivel,
    ano_letivo
) DO NOTHING;