CREATE TABLE usuarios (
	id serial NOT NULL PRIMARY KEY,
	nome varchar(100) NOT NULL,
	login varchar(100) NOT NULL,
	senha text NOT NULL,
	adm bool NOT NULL,
	ativo bool NOT NULL,
	data_cadastro timestamp NOT NULL
);

INSERT INTO usuarios VALUES --Login sistema/sistema
	(DEFAULT, 'SISTEMA', 'sistema', '$2b$10$y4P8/IM3/pyYXwDTFoXOuuLGjFgfWenLZhsl6rGCQrdJgdUqiQSdK', TRUE, TRUE, current_timestamp);

CREATE TABLE entradas (
	id serial NOT NULL PRIMARY KEY,
	data_entrada timestamp NOT NULL,
	genero char(1) NOT NULL,
	data_cadastro timestamp NOT NULL,
	usuario_id int NOT NULL REFERENCES usuarios
);

CREATE TABLE vendas (
	id serial NOT NULL PRIMARY KEY,
	valor NUMERIC(10, 2) NOT NULL,
	data_venda timestamp NOT NULL,
	genero_cliente char(1) NOT NULL,
	data_cadastro timestamp NOT NULL,
	usuario_id int NOT NULL REFERENCES usuarios
);

CREATE TABLE mapas_calor (
	id serial NOT NULL PRIMARY KEY,
	uuid uuid NOT NULL UNIQUE,
	data_mapa timestamp NOT NULL,
	mapa bytea NOT NULL,
	data_cadastro timestamp NOT NULL,
	usuario_id int NOT NULL REFERENCES usuarios
);