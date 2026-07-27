-- =========================================================
-- 03 - PROFESSOR x TURMA
-- =========================================================

------------------------------------------------------------
-- JOÃO SILVA - MATEMÁTICA
------------------------------------------------------------

-- 6º A
INSERT INTO professor_turma (
    professor_id,
    turma_id,
    disciplina_id
)
VALUES (
    (SELECT id FROM usuarios WHERE email = 'joao@radar.com'),
    (
        SELECT id
        FROM turmas
        WHERE ano = 6
          AND sala = 'A'
          AND nivel = 'FUNDAMENTAL'
          AND ano_letivo = 2026
    ),
    (SELECT id FROM disciplinas WHERE nome = 'Matemática')
);

-- 7º B
INSERT INTO professor_turma (
    professor_id,
    turma_id,
    disciplina_id
)
VALUES (
    (SELECT id FROM usuarios WHERE email = 'joao@radar.com'),
    (
        SELECT id
        FROM turmas
        WHERE ano = 7
          AND sala = 'B'
          AND nivel = 'FUNDAMENTAL'
          AND ano_letivo = 2026
    ),
    (SELECT id FROM disciplinas WHERE nome = 'Matemática')
);

-- 8º A
INSERT INTO professor_turma (
    professor_id,
    turma_id,
    disciplina_id
)
VALUES (
    (SELECT id FROM usuarios WHERE email = 'joao@radar.com'),
    (
        SELECT id
        FROM turmas
        WHERE ano = 8
          AND sala = 'A'
          AND nivel = 'FUNDAMENTAL'
          AND ano_letivo = 2026
    ),
    (SELECT id FROM disciplinas WHERE nome = 'Matemática')
);

------------------------------------------------------------
-- MARIA SOUZA - LÍNGUA PORTUGUESA
------------------------------------------------------------

-- 6º A
INSERT INTO professor_turma (
    professor_id,
    turma_id,
    disciplina_id
)
VALUES (
    (SELECT id FROM usuarios WHERE email = 'maria@radar.com'),
    (
        SELECT id
        FROM turmas
        WHERE ano = 6
          AND sala = 'A'
          AND nivel = 'FUNDAMENTAL'
          AND ano_letivo = 2026
    ),
    (SELECT id FROM disciplinas WHERE nome = 'Língua Portuguesa')
);

-- 7º B
INSERT INTO professor_turma (
    professor_id,
    turma_id,
    disciplina_id
)
VALUES (
    (SELECT id FROM usuarios WHERE email = 'maria@radar.com'),
    (
        SELECT id
        FROM turmas
        WHERE ano = 7
          AND sala = 'B'
          AND nivel = 'FUNDAMENTAL'
          AND ano_letivo = 2026
    ),
    (SELECT id FROM disciplinas WHERE nome = 'Língua Portuguesa')
);