-- =========================================================
-- 07A-01 - ALUNO_AULA
-- Matemática - 6º A
-- Lucas Oliveira
-- Miguel Santos
-- =========================================================

WITH professor_turma_ref AS (

    SELECT pt.id
    FROM professor_turma pt
        JOIN usuarios u ON u.id = pt.professor_id
        JOIN disciplinas d ON d.id = pt.disciplina_id
        JOIN turmas t ON t.id = pt.turma_id
    WHERE u.email = 'joao@radar.com'
      AND d.nome = 'Matemática'
      AND t.ano = 6
      AND t.sala = 'A'

),

aulas_seed(data, assunto) AS (

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

aulas_ref AS (

    SELECT
        a.id,
        a.data,
        a.assunto
    FROM aulas a
    JOIN professor_turma_ref pt
        ON pt.id = a.professor_turma_id

),

alunos_seed(nome, presenca, participacao, nota_atividade, observacao, data, assunto) AS (

VALUES

-- =====================================================
-- Lucas Oliveira
-- =====================================================

('Lucas Oliveira',true ,'ALTA',9.5,'Excelente desempenho','2026-06-02'::date,'Números Inteiros'),
('Lucas Oliveira',true ,'ALTA',9.0,'Participou bastante','2026-06-04'::date,'Operações com Inteiros'),
('Lucas Oliveira',true ,'ALTA',10.0,'Resolveu exercícios corretamente','2026-06-06'::date,'Múltiplos e Divisores'),
('Lucas Oliveira',true ,'ALTA',9.8,'Muito interessado','2026-06-09'::date,'Números Primos'),
('Lucas Oliveira',true ,'ALTA',9.2,'Boa participação','2026-06-11'::date,'Frações'),
('Lucas Oliveira',true ,'ALTA',6.7,'Muito Disperso','2026-06-13'::date,'Comparação de Frações'),
('Lucas Oliveira',true ,'ALTA',10.0,'Atividade completa','2026-06-16'::date,'Adição de Frações'),
('Lucas Oliveira',true ,'ALTA',9.5,'Bom rendimento','2026-06-18'::date,'Subtração de Frações'),
('Lucas Oliveira',true ,'ALTA',9.8,'Excelente aluno','2026-06-23'::date,'Multiplicação de Frações'),
('Lucas Oliveira',true ,'ALTA',9.9,'Ótima revisão','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Miguel Santos
-- =====================================================

('Miguel Santos',true ,'MEDIA',8.0,'Bom desempenho','2026-06-02'::date,'Números Inteiros'),
('Miguel Santos',true ,'ALTA',8.4,'Participou da aula','2026-06-04'::date,'Operações com Inteiros'),
('Miguel Santos',true ,'MEDIA',8.2,'Boa atividade','2026-06-06'::date,'Múltiplos e Divisores'),
('Miguel Santos',false,'NAO_INFORMADA',0,'Faltou','2026-06-09'::date,'Números Primos'),
('Miguel Santos',true ,'MEDIA',7.9,'Bom entendimento','2026-06-11'::date,'Frações'),
('Miguel Santos',true ,'ALTA',8.6,'Resolveu corretamente','2026-06-13'::date,'Comparação de Frações'),
('Miguel Santos',true ,'MEDIA',8.1,'Participação adequada','2026-06-16'::date,'Adição de Frações'),
('Miguel Santos',true ,'MEDIA',7.8,'Realizou atividade','2026-06-18'::date,'Subtração de Frações'),
('Miguel Santos',true ,'ALTA',8.7,'Boa evolução','2026-06-23'::date,'Multiplicação de Frações'),
('Miguel Santos',true ,'MEDIA',8.5,'Bom desempenho geral','2026-06-25'::date,'Revisão Geral')

)

INSERT INTO aluno_aula (
    aluno_id,
    aula_id,
    presenca,
    participacao,
    nota_atividade,
    observacao
)

SELECT
    al.id,
    ar.id,
    s.presenca,
    s.participacao,
    s.nota_atividade,
    s.observacao
FROM alunos_seed s
JOIN alunos al
    ON al.nome = s.nome
JOIN aulas_ref ar
    ON ar.data = s.data
   AND ar.assunto = s.assunto
ORDER BY
    al.nome,
    ar.data;