-- =========================================================
-- 01 - USUÁRIOS
-- =========================================================
------------------------------------------------------------
-- COORDENADOR
------------------------------------------------------------

INSERT INTO usuarios (
    email,
    senha,
    nome,
    perfil
)
VALUES (
    'coordenador@radar.com',
    '$2b$08$PZxTn1Wm9zbw3BMEH6dqeu902fcv.HZESqmn.GOxB2AKCOw6Lf1.u',
    'Carlos Henrique',
    'COORDENADOR'
)
ON CONFLICT (email) DO NOTHING;

------------------------------------------------------------
-- PROFESSOR
------------------------------------------------------------

INSERT INTO usuarios (
    email,
    senha,
    nome,
    perfil
)
VALUES (
    'joao@radar.com',
    '$2b$08$PZxTn1Wm9zbw3BMEH6dqeu902fcv.HZESqmn.GOxB2AKCOw6Lf1.u',
    'João Silva',
    'PROFESSOR'
)
ON CONFLICT (email) DO NOTHING;

------------------------------------------------------------
-- PROFESSORA
------------------------------------------------------------

INSERT INTO usuarios (
    email,
    senha,
    nome,
    perfil
)
VALUES (
    'maria@radar.com',
    '$2b$08$PZxTn1Wm9zbw3BMEH6dqeu902fcv.HZESqmn.GOxB2AKCOw6Lf1.u',
    'Maria Souza',
    'PROFESSOR'
)
ON CONFLICT (email) DO NOTHING;