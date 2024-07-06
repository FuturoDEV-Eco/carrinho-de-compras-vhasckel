-- [M2S06] - Ex. 03 - Cadastro de produto

create table categories (
	id serial primary key,
	name varchar(150) not null
);

insert into categories (name) values
    ('Papelaria'),
    ('Bazar'),
    ('Adega'),
    ('Mercearia'),
    ('Frios e Laticínios'),
    ('Eletrônicos'),
    ('Bebidas'),
    ('Saudáveis'),
    ('Higiene'),
    ('Limpeza');

create table products (
	id serial primary key,
	name varchar(150) not null,
	amount varchar(150) unique default '0',
	color varchar(50),
	voltage varchar(3) check (voltage in ('110', '220')),
	description text,
	category_id INTEGER not null,
    foreign key (category_id) references categories(id)
)