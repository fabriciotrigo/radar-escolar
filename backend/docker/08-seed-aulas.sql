-- =========================================================
-- 06 - AULAS
-- =========================================================

WITH professor_turma_ids AS (

    SELECT
        pt.id,
        u.email,
        d.nome AS disciplina,
        t.ano,
        t.sala
    FROM professor_turma pt
        JOIN usuarios u ON u.id = pt.professor_id
        JOIN disciplinas d ON d.id = pt.disciplina_id
        JOIN turmas t ON t.id = pt.turma_id

),

-- =========================================================
-- MATEMÁTICA - 6º A
-- =========================================================

matematica_6a(data, assunto) AS (

    VALUES
        ('2026-06-02'::date,'Números Inteiros'),
        ('2026-06-04'::date,'Operações com Inteiros'),
        ('2026-06-06'::date,'Múltiplos e Divisores'),
        ('2026-06-09'::date,'Números Primos'),
        ('2026-06-11'::date,'Frações'),
        ('2026-06-13'::date,'Comparação de Frações'),
        ('2026-06-16'::date,'Adição de Frações'),
        ('2026-06-18'::date,'Subtração de Frações'),
        ('2026-06-23'::date,'Multiplicação de Frações'),
        ('2026-06-25'::date,'Revisão Geral')

),

-- =========================================================
-- PORTUGUÊS - 6º A
-- =========================================================

portugues_6a(data, assunto) AS (

    VALUES
        ('2026-06-02'::date,'Substantivos'),
        ('2026-06-04'::date,'Adjetivos'),
        ('2026-06-06'::date,'Artigos'),
        ('2026-06-09'::date,'Pronomes'),
        ('2026-06-11'::date,'Verbos'),
        ('2026-06-13'::date,'Tempos Verbais'),
        ('2026-06-16'::date,'Interpretação de Texto'),
        ('2026-06-18'::date,'Produção Textual'),
        ('2026-06-23'::date,'Ortografia'),
        ('2026-06-25'::date,'Revisão Geral')

)

INSERT INTO aulas (
    professor_turma_id,
    data,
    assunto
)

-- Matemática 6º A
SELECT pt.id, a.data, a.assunto
FROM professor_turma_ids pt
CROSS JOIN matematica_6a a
WHERE pt.email='joao@radar.com'
  AND pt.disciplina='Matemática'
  AND pt.ano=6
  AND pt.sala='A';