-- =========================================================
-- 05 - ALUNO x TURMA
-- =========================================================

------------------------------------------------------------
-- 6º A
------------------------------------------------------------

INSERT INTO aluno_turma (
    aluno_id,
    turma_id
)
SELECT
    a.id,
    (
        SELECT id
        FROM turmas
        WHERE ano = 6
          AND sala = 'A'
          AND nivel = 'FUNDAMENTAL'
          AND ano_letivo = 2026
    )
FROM alunos a
WHERE a.nome IN (
    'Lucas Oliveira',
    'Miguel Santos',
    'Arthur Lima',
    'Heitor Costa',
    'Theo Ferreira',
    'Gabriel Souza',
    'Pedro Gomes',
    'Rafael Alves',
    'Davi Barbosa',
    'Bernardo Rocha',
    'Laura Martins',
    'Alice Ribeiro',
    'Helena Carvalho',
    'Sophia Fernandes',
    'Júlia Moreira',
    'Manuela Castro',
    'Lívia Melo',
    'Beatriz Cardoso',
    'Valentina Teixeira',
    'Isabela Freitas'
);

------------------------------------------------------------
-- 7º B
------------------------------------------------------------

INSERT INTO aluno_turma (
    aluno_id,
    turma_id
)
SELECT
    a.id,
    (
        SELECT id
        FROM turmas
        WHERE ano = 7
          AND sala = 'B'
          AND nivel = 'FUNDAMENTAL'
          AND ano_letivo = 2026
    )
FROM alunos a
WHERE a.nome IN (
    'Enzo Rodrigues',
    'Guilherme Nogueira',
    'Matheus Correia',
    'Samuel Moraes',
    'Henrique Batista',
    'Cauã Pereira' /*,
    'João Vitor Lopes',
    'Felipe Araújo',
    'Nicolas Duarte',
    'Vinícius Moura',
    'Mariana Pires',
    'Clara Monteiro',
    'Emanuelly Dias',
    'Maria Eduarda Pinto',
    'Ana Beatriz Campos',
    'Yasmin Farias',
    'Lorena Rezende',
    'Melissa Cunha',
    'Cecília Andrade',
    'Heloísa Peixoto'*/
);

------------------------------------------------------------
-- 8º A
------------------------------------------------------------

INSERT INTO aluno_turma (
    aluno_id,
    turma_id
)
SELECT
    a.id,
    (
        SELECT id
        FROM turmas
        WHERE ano = 8
          AND sala = 'A'
          AND nivel = 'FUNDAMENTAL'
          AND ano_letivo = 2026
    )
FROM alunos a
WHERE a.nome IN (
    'Bruno Mendes',
    'Leonardo Azevedo',
    'Diego Fernandes',
    'Caio Martins',
    'Eduardo Xavier',
    'Murilo Ribeiro',
    'Thiago Almeida',
    'Vitor Hugo Costa',
    'Otávio Melo',
    'Ryan Carvalho',
    'Amanda Moreira',
    'Bianca Rocha',
    'Gabriela Freitas',
    'Larissa Souza',
    'Natália Gomes',
    'Vitória Barbosa',
    'Eduarda Cardoso',
    'Sarah Teixeira',
    'Fernanda Alves',
    'Nicole Lima'
);