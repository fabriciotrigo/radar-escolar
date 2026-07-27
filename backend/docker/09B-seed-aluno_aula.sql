-- =========================================================
-- 07A-02 - ALUNO_AULA
-- Matemática - 6º A
-- Arthur Lima
-- Heitor Costa
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

aulas_ref AS (

    SELECT
        a.id,
        a.data,
        a.assunto
    FROM aulas a
    JOIN professor_turma_ref pt
      ON pt.id = a.professor_turma_id

),

alunos_seed (
    nome,
    presenca,
    participacao,
    nota_atividade,
    observacao,
    data,
    assunto
) AS (

VALUES

-- =====================================================
-- Arthur Lima
-- =====================================================

('Arthur Lima',true ,'ALTA',9.4,'Excelente participação','2026-06-02'::date,'Números Inteiros'),
('Arthur Lima',true ,'ALTA',9.6,'Resolveu todos os exercícios','2026-06-04'::date,'Operações com Inteiros'),
('Arthur Lima',true ,'ALTA',9.2,'Bom raciocínio lógico','2026-06-06'::date,'Múltiplos e Divisores'),
('Arthur Lima',true ,'ALTA',9.8,'Muito dedicado','2026-06-09'::date,'Números Primos'),
('Arthur Lima',true ,'ALTA',9.5,'Ótima compreensão','2026-06-11'::date,'Frações'),
('Arthur Lima',true ,'ALTA',9.7,'Excelente atividade','2026-06-13'::date,'Comparação de Frações'),
('Arthur Lima',true ,'ALTA',9.8,'Participou bastante','2026-06-16'::date,'Adição de Frações'),
('Arthur Lima',true ,'ALTA',9.3,'Bom desempenho','2026-06-18'::date,'Subtração de Frações'),
('Arthur Lima',true ,'ALTA',9.6,'Excelente rendimento','2026-06-23'::date,'Multiplicação de Frações'),
('Arthur Lima',true ,'ALTA',9.9,'Ótima revisão','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Heitor Costa
-- =====================================================

('Heitor Costa',true ,'MEDIA',7.8,'Participou da aula','2026-06-02'::date,'Números Inteiros'),
('Heitor Costa',true ,'MEDIA',8.0,'Boa atividade','2026-06-04'::date,'Operações com Inteiros'),
('Heitor Costa',false,'NAO_INFORMADA',0,'Faltou','2026-06-06'::date,'Múltiplos e Divisores'),
('Heitor Costa',true ,'BAIXA',6.9,'Pouca participação','2026-06-09'::date,'Números Primos'),
('Heitor Costa',true ,'MEDIA',7.5,'Compreendeu parcialmente','2026-06-11'::date,'Frações'),
('Heitor Costa',false,'NAO_INFORMADA',0,'Faltou','2026-06-13'::date,'Comparação de Frações'),
('Heitor Costa',true ,'MEDIA',7.9,'Bom desempenho','2026-06-16'::date,'Adição de Frações'),
('Heitor Costa',true ,'MEDIA',8.1,'Participou mais da aula','2026-06-18'::date,'Subtração de Frações'),
('Heitor Costa',true ,'ALTA',8.3,'Evoluiu bastante','2026-06-23'::date,'Multiplicação de Frações'),
('Heitor Costa',true ,'MEDIA',8.0,'Boa revisão','2026-06-25'::date,'Revisão Geral')

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