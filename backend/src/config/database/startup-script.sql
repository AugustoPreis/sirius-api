CREATE TABLE funcionarios (
	id serial NOT NULL PRIMARY KEY,
	nome varchar(100) NOT NULL,
	data_admissao timestamp NOT NULL,
	observacoes varchar(250),
	ativo bool NOT NULL,
	data_cadastro timestamp NOT NULL
);

CREATE TABLE fotos_funcionario (
	id serial NOT NULL PRIMARY KEY,
	id_funcionario int NOT NULL REFERENCES funcionarios,
  uuid uuid NOT NULL UNIQUE,
	foto bytea NOT NULL,
	data_cadastro timestamp NOT NULL
);

CREATE TABLE usuarios (
	id serial NOT NULL PRIMARY KEY,
	nome varchar(100) NOT NULL,
	login varchar(100) NOT NULL,
	senha text NOT NULL,
	adm bool NOT NULL,
	ativo bool NOT NULL,
	data_cadastro timestamp NOT NULL
);

CREATE TABLE atendimentos (
	id serial NOT NULL PRIMARY KEY,
	id_funcionario int NOT NULL REFERENCES funcionarios,
	data_inicio timestamp NOT NULL,
	data_fim timestamp NOT NULL,
	data_cadastro timestamp NOT NULL
);