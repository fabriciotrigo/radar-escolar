-- ==========================================
-- USUÁRIOS
-- ==========================================

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    perfil VARCHAR(20) NOT NULL
        CHECK (perfil IN ('PROFESSOR', 'COORDENADOR'))
);

-- ==========================================
-- DISCIPLINAS
-- ==========================================

CREATE TABLE disciplinas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

-- ==========================================
-- TURMAS
-- ==========================================

CREATE TABLE turmas (
    id SERIAL PRIMARY KEY,

    ano INTEGER NOT NULL
        CHECK (ano BETWEEN 1 AND 9),

    sala CHAR(1) NOT NULL,

    nivel VARCHAR(20) NOT NULL
        CHECK (nivel IN ('FUNDAMENTAL', 'MEDIO')),

    ano_letivo INTEGER NOT NULL,

    CONSTRAINT uk_turma
        UNIQUE (
            ano,
            sala,
            nivel,
            ano_letivo
        )
);

-- ==========================================
-- ALUNOS
-- ==========================================

CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    data_nasc DATE NOT NULL
);

-- ==========================================
-- PROFESSOR x TURMA
-- ==========================================

CREATE TABLE professor_turma (
    id SERIAL PRIMARY KEY,

    professor_id INTEGER NOT NULL,

    turma_id INTEGER NOT NULL,

    disciplina_id INTEGER NOT NULL,

    CONSTRAINT fk_professor
        FOREIGN KEY (professor_id)
        REFERENCES usuarios(id),

    CONSTRAINT fk_turma_professor
        FOREIGN KEY (turma_id)
        REFERENCES turmas(id),

    CONSTRAINT fk_disciplina
        FOREIGN KEY (disciplina_id)
        REFERENCES disciplinas(id)
);

-- ==========================================
-- ALUNO x TURMA
-- ==========================================

CREATE TABLE aluno_turma (
    id SERIAL PRIMARY KEY,

    aluno_id INTEGER NOT NULL,

    turma_id INTEGER NOT NULL,

    CONSTRAINT fk_aluno
        FOREIGN KEY (aluno_id)
        REFERENCES alunos(id),

    CONSTRAINT fk_turma_aluno
        FOREIGN KEY (turma_id)
        REFERENCES turmas(id)
);

-- ==========================================
-- AULAS
-- ==========================================

CREATE TABLE aulas (
    id SERIAL PRIMARY KEY,

    professor_turma_id INTEGER NOT NULL,

    data DATE NOT NULL,

    assunto VARCHAR(255) NOT NULL,

    CONSTRAINT fk_professor_turma
        FOREIGN KEY (professor_turma_id)
        REFERENCES professor_turma(id)
);

-- ==========================================
-- ALUNO x AULA
-- ==========================================

CREATE TABLE aluno_aula (
    id SERIAL PRIMARY KEY,

    aluno_id INTEGER NOT NULL,

    aula_id INTEGER NOT NULL,

    presenca BOOLEAN NOT NULL,

    participacao VARCHAR(15)
        CHECK (participacao IN ('ALTA', 'MEDIA', 'BAIXA', 'NAO_INFORMADA')),

    nota_atividade NUMERIC(4,2),

    observacao TEXT,

    CONSTRAINT fk_aluno_aula_aluno
        FOREIGN KEY (aluno_id)
        REFERENCES alunos(id),

    CONSTRAINT fk_aluno_aula
        FOREIGN KEY (aula_id)
        REFERENCES aulas(id)
);
