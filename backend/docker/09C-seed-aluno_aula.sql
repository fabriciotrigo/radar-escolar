-- =========================================================
-- 07A-03 - ALUNO_AULA
-- Matemática - 6º A
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
-- Theo Ferreira
-- =====================================================

('Theo Ferreira',true ,'ALTA',9.2,'Participou muito bem','2026-06-02'::date,'Números Inteiros'),
('Theo Ferreira',true ,'ALTA',9.5,'Resolveu todos os exercícios','2026-06-04'::date,'Operações com Inteiros'),
('Theo Ferreira',true ,'ALTA',9.1,'Excelente compreensão','2026-06-06'::date,'Múltiplos e Divisores'),
('Theo Ferreira',true ,'ALTA',9.6,'Boa participação','2026-06-09'::date,'Números Primos'),
('Theo Ferreira',true ,'ALTA',9.3,'Excelente atividade','2026-06-11'::date,'Frações'),
('Theo Ferreira',true ,'ALTA',9.4,'Muito interessado','2026-06-13'::date,'Comparação de Frações'),
('Theo Ferreira',true ,'ALTA',9.7,'Ótimo desempenho','2026-06-16'::date,'Adição de Frações'),
('Theo Ferreira',true ,'ALTA',9.5,'Executou corretamente','2026-06-18'::date,'Subtração de Frações'),
('Theo Ferreira',true ,'ALTA',9.8,'Excelente evolução','2026-06-23'::date,'Multiplicação de Frações'),
('Theo Ferreira',true ,'ALTA',9.9,'Excelente revisão','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Gabriel Souza
-- =====================================================

('Gabriel Souza',true ,'MEDIA',8.2,'Bom desempenho','2026-06-02'::date,'Números Inteiros'),
('Gabriel Souza',true ,'MEDIA',8.0,'Participou da aula','2026-06-04'::date,'Operações com Inteiros'),
('Gabriel Souza',true ,'ALTA',8.6,'Boa resolução de exercícios','2026-06-06'::date,'Múltiplos e Divisores'),
('Gabriel Souza',true ,'MEDIA',8.1,'Participação regular','2026-06-09'::date,'Números Primos'),
('Gabriel Souza',false,'NAO_INFORMADA',0,'Faltou','2026-06-11'::date,'Frações'),
('Gabriel Souza',true ,'MEDIA',7.9,'Demonstrou compreensão','2026-06-13'::date,'Comparação de Frações'),
('Gabriel Souza',true ,'ALTA',8.5,'Boa evolução','2026-06-16'::date,'Adição de Frações'),
('Gabriel Souza',true ,'MEDIA',8.3,'Atividade entregue','2026-06-18'::date,'Subtração de Frações'),
('Gabriel Souza',true ,'ALTA',8.8,'Excelente participação','2026-06-23'::date,'Multiplicação de Frações'),
('Gabriel Souza',true ,'MEDIA',8.4,'Bom desempenho geral','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Pedro Gomes
-- =====================================================

('Pedro Gomes',true ,'MEDIA',8.1,'Bom desempenho','2026-06-02'::date,'Números Inteiros'),
('Pedro Gomes',true ,'ALTA',8.7,'Participou bastante','2026-06-04'::date,'Operações com Inteiros'),
('Pedro Gomes',true ,'MEDIA',8.0,'Boa atividade','2026-06-06'::date,'Múltiplos e Divisores'),
('Pedro Gomes',true ,'MEDIA',7.8,'Demonstrou interesse','2026-06-09'::date,'Números Primos'),
('Pedro Gomes',true ,'ALTA',8.6,'Excelente participação','2026-06-11'::date,'Frações'),
('Pedro Gomes',false,'NAO_INFORMADA',0,'Faltou','2026-06-13'::date,'Comparação de Frações'),
('Pedro Gomes',true ,'MEDIA',8.2,'Bom entendimento','2026-06-16'::date,'Adição de Frações'),
('Pedro Gomes',true ,'MEDIA',8.4,'Atividade concluída','2026-06-18'::date,'Subtração de Frações'),
('Pedro Gomes',true ,'ALTA',8.9,'Excelente evolução','2026-06-23'::date,'Multiplicação de Frações'),
('Pedro Gomes',true ,'MEDIA',8.3,'Boa revisão','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Rafael Alves
-- =====================================================

('Rafael Alves',true ,'BAIXA',6.8,'Pouca participação','2026-06-02'::date,'Números Inteiros'),
('Rafael Alves',true ,'MEDIA',7.4,'Participou quando solicitado','2026-06-04'::date,'Operações com Inteiros'),
('Rafael Alves',false,'NAO_INFORMADA',0,'Faltou','2026-06-06'::date,'Múltiplos e Divisores'),
('Rafael Alves',true ,'MEDIA',7.6,'Bom desempenho','2026-06-09'::date,'Números Primos'),
('Rafael Alves',true ,'MEDIA',7.8,'Realizou a atividade','2026-06-11'::date,'Frações'),
('Rafael Alves',true ,'BAIXA',7.0,'Necessita reforço','2026-06-13'::date,'Comparação de Frações'),
('Rafael Alves',true ,'MEDIA',7.5,'Melhorou durante a aula','2026-06-16'::date,'Adição de Frações'),
('Rafael Alves',true ,'MEDIA',7.9,'Boa participação','2026-06-18'::date,'Subtração de Frações'),
('Rafael Alves',true ,'ALTA',8.2,'Boa evolução','2026-06-23'::date,'Multiplicação de Frações'),
('Rafael Alves',true ,'MEDIA',8.0,'Revisou o conteúdo','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Davi Barbosa
-- =====================================================

('Davi Barbosa',true ,'ALTA',9.6,'Excelente desempenho','2026-06-02'::date,'Números Inteiros'),
('Davi Barbosa',true ,'ALTA',9.5,'Resolveu todos os exercícios','2026-06-04'::date,'Operações com Inteiros'),
('Davi Barbosa',true ,'ALTA',9.8,'Excelente raciocínio','2026-06-06'::date,'Múltiplos e Divisores'),
('Davi Barbosa',true ,'ALTA',9.4,'Muito participativo','2026-06-09'::date,'Números Primos'),
('Davi Barbosa',true ,'ALTA',9.7,'Ótimo desempenho','2026-06-11'::date,'Frações'),
('Davi Barbosa',true ,'ALTA',9.8,'Excelente atividade','2026-06-13'::date,'Comparação de Frações'),
('Davi Barbosa',true ,'ALTA',9.5,'Participou bastante','2026-06-16'::date,'Adição de Frações'),
('Davi Barbosa',true ,'ALTA',9.6,'Muito dedicado','2026-06-18'::date,'Subtração de Frações'),
('Davi Barbosa',true ,'ALTA',9.9,'Excelente evolução','2026-06-23'::date,'Multiplicação de Frações'),
('Davi Barbosa',true ,'ALTA',10.0,'Excelente revisão','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Bernardo Rocha
-- =====================================================

('Bernardo Rocha',true ,'MEDIA',8.0,'Bom desempenho','2026-06-02'::date,'Números Inteiros'),
('Bernardo Rocha',true ,'MEDIA',8.2,'Participou da aula','2026-06-04'::date,'Operações com Inteiros'),
('Bernardo Rocha',true ,'ALTA',8.7,'Boa resolução','2026-06-06'::date,'Múltiplos e Divisores'),
('Bernardo Rocha',true ,'MEDIA',8.1,'Boa participação','2026-06-09'::date,'Números Primos'),
('Bernardo Rocha',false,'NAO_INFORMADA',0,'Faltou','2026-06-11'::date,'Frações'),
('Bernardo Rocha',true ,'MEDIA',7.9,'Compreendeu o conteúdo','2026-06-13'::date,'Comparação de Frações'),
('Bernardo Rocha',true ,'ALTA',8.5,'Boa evolução','2026-06-16'::date,'Adição de Frações'),
('Bernardo Rocha',true ,'MEDIA',8.3,'Atividade concluída','2026-06-18'::date,'Subtração de Frações'),
('Bernardo Rocha',true ,'ALTA',8.8,'Participou bastante','2026-06-23'::date,'Multiplicação de Frações'),
('Bernardo Rocha',true ,'MEDIA',8.4,'Bom desempenho geral','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Laura Martins
-- =====================================================

('Laura Martins',true ,'ALTA',9.1,'Excelente desempenho','2026-06-02'::date,'Números Inteiros'),
('Laura Martins',true ,'ALTA',9.3,'Participou bastante','2026-06-04'::date,'Operações com Inteiros'),
('Laura Martins',true ,'MEDIA',8.8,'Boa resolução','2026-06-06'::date,'Múltiplos e Divisores'),
('Laura Martins',true ,'ALTA',9.2,'Muito dedicada','2026-06-09'::date,'Números Primos'),
('Laura Martins',true ,'ALTA',9.4,'Excelente atividade','2026-06-11'::date,'Frações'),
('Laura Martins',true ,'ALTA',9.5,'Ótima compreensão','2026-06-13'::date,'Comparação de Frações'),
('Laura Martins',true ,'ALTA',9.2,'Boa participação','2026-06-16'::date,'Adição de Frações'),
('Laura Martins',true ,'MEDIA',8.9,'Bom rendimento','2026-06-18'::date,'Subtração de Frações'),
('Laura Martins',true ,'ALTA',9.6,'Excelente evolução','2026-06-23'::date,'Multiplicação de Frações'),
('Laura Martins',true ,'ALTA',9.7,'Excelente revisão','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Alice Ribeiro (Excelente)
-- =====================================================

('Alice Ribeiro',true ,'ALTA',9.5,'Excelente desempenho','2026-06-02'::date,'Números Inteiros'),
('Alice Ribeiro',true ,'ALTA',9.7,'Participou bastante','2026-06-04'::date,'Operações com Inteiros'),
('Alice Ribeiro',true ,'ALTA',9.3,'Boa resolução','2026-06-06'::date,'Múltiplos e Divisores'),
('Alice Ribeiro',true ,'ALTA',9.6,'Muito dedicada','2026-06-09'::date,'Números Primos'),
('Alice Ribeiro',true ,'ALTA',9.4,'Excelente atividade','2026-06-11'::date,'Frações'),
('Alice Ribeiro',true ,'ALTA',9.8,'Ótima compreensão','2026-06-13'::date,'Comparação de Frações'),
('Alice Ribeiro',true ,'ALTA',9.5,'Boa participação','2026-06-16'::date,'Adição de Frações'),
('Alice Ribeiro',true ,'ALTA',9.6,'Bom rendimento','2026-06-18'::date,'Subtração de Frações'),
('Alice Ribeiro',true ,'ALTA',9.8,'Excelente evolução','2026-06-23'::date,'Multiplicação de Frações'),
('Alice Ribeiro',true ,'ALTA',9.9,'Excelente revisão','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Helena Carvalho (Média ~7,2)
-- =====================================================

('Helena Carvalho',true ,'MEDIA',7.0,'Participou da aula','2026-06-02'::date,'Números Inteiros'),
('Helena Carvalho',true ,'MEDIA',7.3,'Boa atividade','2026-06-04'::date,'Operações com Inteiros'),
('Helena Carvalho',true ,'MEDIA',7.1,'Compreendeu parcialmente','2026-06-06'::date,'Múltiplos e Divisores'),
('Helena Carvalho',true ,'MEDIA',6.8,'Necessita reforço','2026-06-09'::date,'Números Primos'),
('Helena Carvalho',true ,'MEDIA',7.5,'Bom desempenho','2026-06-11'::date,'Frações'),
('Helena Carvalho',true ,'MEDIA',7.2,'Participou da atividade','2026-06-13'::date,'Comparação de Frações'),
('Helena Carvalho',true ,'MEDIA',7.0,'Bom entendimento','2026-06-16'::date,'Adição de Frações'),
('Helena Carvalho',true ,'MEDIA',7.4,'Participou da aula','2026-06-18'::date,'Subtração de Frações'),
('Helena Carvalho',true ,'MEDIA',7.3,'Boa evolução','2026-06-23'::date,'Multiplicação de Frações'),
('Helena Carvalho',true ,'MEDIA',7.1,'Revisão satisfatória','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Sophia Fernandes (Excelente)
-- =====================================================

('Sophia Fernandes',true ,'ALTA',9.6,'Excelente desempenho','2026-06-02'::date,'Números Inteiros'),
('Sophia Fernandes',true ,'ALTA',9.4,'Participou bastante','2026-06-04'::date,'Operações com Inteiros'),
('Sophia Fernandes',true ,'ALTA',9.8,'Excelente resolução','2026-06-06'::date,'Múltiplos e Divisores'),
('Sophia Fernandes',true ,'ALTA',9.7,'Muito dedicada','2026-06-09'::date,'Números Primos'),
('Sophia Fernandes',true ,'ALTA',9.5,'Excelente atividade','2026-06-11'::date,'Frações'),
('Sophia Fernandes',true ,'ALTA',9.8,'Ótima compreensão','2026-06-13'::date,'Comparação de Frações'),
('Sophia Fernandes',true ,'ALTA',9.7,'Boa participação','2026-06-16'::date,'Adição de Frações'),
('Sophia Fernandes',true ,'ALTA',9.6,'Bom rendimento','2026-06-18'::date,'Subtração de Frações'),
('Sophia Fernandes',true ,'ALTA',9.9,'Excelente evolução','2026-06-23'::date,'Multiplicação de Frações'),
('Sophia Fernandes',true ,'ALTA',9.8,'Excelente revisão','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Júlia Moreira (Frequência 70%)
-- =====================================================

('Júlia Moreira',true ,'MEDIA',8.1,'Boa participação','2026-06-02'::date,'Números Inteiros'),
('Júlia Moreira',false,'NAO_INFORMADA',0,'Faltou','2026-06-04'::date,'Operações com Inteiros'),
('Júlia Moreira',true ,'MEDIA',8.0,'Boa atividade','2026-06-06'::date,'Múltiplos e Divisores'),
('Júlia Moreira',false,'NAO_INFORMADA',0,'Faltou','2026-06-09'::date,'Números Primos'),
('Júlia Moreira',true ,'MEDIA',7.8,'Participou da aula','2026-06-11'::date,'Frações'),
('Júlia Moreira',true ,'MEDIA',8.2,'Boa compreensão','2026-06-13'::date,'Comparação de Frações'),
('Júlia Moreira',false,'NAO_INFORMADA',0,'Faltou','2026-06-16'::date,'Adição de Frações'),
('Júlia Moreira',true ,'MEDIA',8.1,'Bom desempenho','2026-06-18'::date,'Subtração de Frações'),
('Júlia Moreira',true ,'ALTA',8.4,'Boa evolução','2026-06-23'::date,'Multiplicação de Frações'),
('Júlia Moreira',false,'NAO_INFORMADA',0,'Faltou','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Manuela Castro (Nota crítica - média ~5,4)
-- =====================================================

('Manuela Castro',true ,'MEDIA',5.8,'Dificuldade no conteúdo','2026-06-02'::date,'Números Inteiros'),
('Manuela Castro',true ,'BAIXA',5.2,'Necessita reforço','2026-06-04'::date,'Operações com Inteiros'),
('Manuela Castro',true ,'BAIXA',5.5,'Erros frequentes','2026-06-06'::date,'Múltiplos e Divisores'),
('Manuela Castro',true ,'BAIXA',4.9,'Pouca compreensão','2026-06-09'::date,'Números Primos'),
('Manuela Castro',true ,'MEDIA',5.7,'Realizou parcialmente a atividade','2026-06-11'::date,'Frações'),
('Manuela Castro',true ,'BAIXA',5.1,'Necessita acompanhamento','2026-06-13'::date,'Comparação de Frações'),
('Manuela Castro',true ,'MEDIA',7.8,'Participou da aula','2026-06-16'::date,'Adição de Frações'),
('Manuela Castro',true ,'BAIXA',5.0,'Baixo rendimento','2026-06-18'::date,'Subtração de Frações'),
('Manuela Castro',true ,'MEDIA',5.6,'Melhorou levemente','2026-06-23'::date,'Multiplicação de Frações'),
('Manuela Castro',true ,'MEDIA',5.4,'Ainda apresenta dificuldades','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Lívia Melo (Frequência 60%)
-- =====================================================

('Lívia Melo',true ,'MEDIA',8.2,'Bom desempenho','2026-06-02'::date,'Números Inteiros'),
('Lívia Melo',false,'NAO_INFORMADA',0,'Faltou','2026-06-04'::date,'Operações com Inteiros'),
('Lívia Melo',true ,'MEDIA',8.0,'Boa atividade','2026-06-06'::date,'Múltiplos e Divisores'),
('Lívia Melo',false,'NAO_INFORMADA',0,'Faltou','2026-06-09'::date,'Números Primos'),
('Lívia Melo',true ,'MEDIA',8.3,'Participou da aula','2026-06-11'::date,'Frações'),
('Lívia Melo',false,'NAO_INFORMADA',0,'Faltou','2026-06-13'::date,'Comparação de Frações'),
('Lívia Melo',true ,'ALTA',8.7,'Boa evolução','2026-06-16'::date,'Adição de Frações'),
('Lívia Melo',false,'NAO_INFORMADA',0,'Faltou','2026-06-18'::date,'Subtração de Frações'),
('Lívia Melo',true ,'MEDIA',8.1,'Participou bem','2026-06-23'::date,'Multiplicação de Frações'),
('Lívia Melo',false,'NAO_INFORMADA',0,'Faltou','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Beatriz Cardoso (Média ~7,0)
-- =====================================================

('Beatriz Cardoso',true ,'MEDIA',7.2,'Bom desempenho','2026-06-02'::date,'Números Inteiros'),
('Beatriz Cardoso',true ,'MEDIA',6.9,'Participou da aula','2026-06-04'::date,'Operações com Inteiros'),
('Beatriz Cardoso',true ,'MEDIA',7.1,'Boa atividade','2026-06-06'::date,'Múltiplos e Divisores'),
('Beatriz Cardoso',true ,'MEDIA',6.8,'Necessita praticar','2026-06-09'::date,'Números Primos'),
('Beatriz Cardoso',true ,'MEDIA',7.0,'Compreendeu o conteúdo','2026-06-11'::date,'Frações'),
('Beatriz Cardoso',true ,'MEDIA',7.3,'Boa participação','2026-06-13'::date,'Comparação de Frações'),
('Beatriz Cardoso',true ,'MEDIA',6.9,'Atividade realizada','2026-06-16'::date,'Adição de Frações'),
('Beatriz Cardoso',true ,'MEDIA',7.1,'Bom rendimento','2026-06-18'::date,'Subtração de Frações'),
('Beatriz Cardoso',true ,'MEDIA',7.2,'Evoluiu na aula','2026-06-23'::date,'Multiplicação de Frações'),
('Beatriz Cardoso',true ,'MEDIA',7.0,'Revisão satisfatória','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Valentina Teixeira (Excelente)
-- =====================================================

('Valentina Teixeira',true ,'ALTA',9.8,'Excelente desempenho','2026-06-02'::date,'Números Inteiros'),
('Valentina Teixeira',true ,'ALTA',9.6,'Resolveu todos os exercícios','2026-06-04'::date,'Operações com Inteiros'),
('Valentina Teixeira',true ,'ALTA',9.7,'Excelente raciocínio','2026-06-06'::date,'Múltiplos e Divisores'),
('Valentina Teixeira',true ,'ALTA',9.9,'Muito participativa','2026-06-09'::date,'Números Primos'),
('Valentina Teixeira',true ,'ALTA',9.8,'Excelente atividade','2026-06-11'::date,'Frações'),
('Valentina Teixeira',true ,'ALTA',9.7,'Ótima compreensão','2026-06-13'::date,'Comparação de Frações'),
('Valentina Teixeira',true ,'ALTA',9.9,'Excelente participação','2026-06-16'::date,'Adição de Frações'),
('Valentina Teixeira',true ,'ALTA',9.8,'Ótimo rendimento','2026-06-18'::date,'Subtração de Frações'),
('Valentina Teixeira',true ,'ALTA',10.0,'Excelente evolução','2026-06-23'::date,'Multiplicação de Frações'),
('Valentina Teixeira',true ,'ALTA',9.9,'Excelente revisão','2026-06-25'::date,'Revisão Geral'),

-- =====================================================
-- Isabela Freitas (Nota crítica - média ~5,8)
-- =====================================================

('Isabela Freitas',true ,'MEDIA',6.0,'Dificuldade inicial','2026-06-02'::date,'Números Inteiros'),
('Isabela Freitas',true ,'BAIXA',5.7,'Necessita reforço','2026-06-04'::date,'Operações com Inteiros'),
('Isabela Freitas',true ,'MEDIA',5.9,'Participou da aula','2026-06-06'::date,'Múltiplos e Divisores'),
('Isabela Freitas',true ,'BAIXA',5.3,'Erros recorrentes','2026-06-09'::date,'Números Primos'),
('Isabela Freitas',true ,'MEDIA',5.8,'Compreensão parcial','2026-06-11'::date,'Frações'),
('Isabela Freitas',true ,'BAIXA',5.6,'Necessita revisão','2026-06-13'::date,'Comparação de Frações'),
('Isabela Freitas',true ,'MEDIA',6.1,'Melhorou na atividade','2026-06-16'::date,'Adição de Frações'),
('Isabela Freitas',true ,'BAIXA',5.5,'Baixo rendimento','2026-06-18'::date,'Subtração de Frações'),
('Isabela Freitas',true ,'MEDIA',5.9,'Participou da aula','2026-06-23'::date,'Multiplicação de Frações'),
('Isabela Freitas',true ,'MEDIA',5.8,'Ainda necessita reforço','2026-06-25'::date,'Revisão Geral')

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