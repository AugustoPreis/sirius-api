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