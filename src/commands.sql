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



-- [M2S06] - Ex. 06 - Cadastro de carrinho

create table orders (
	id serial primary key,
	client_id integer not null,
	total decimal(10,2),
	address text,
	observations text,
	foreign key (client_id) references clients(id)
);

create table orders_items (
	id serial primary key,
	order_id integer not null,
	product_id integer not null,
	amount text,
	price decimal(10,2),
	foreign key (order_id) references orders(id),
	foreign key (product_id) references products(id)
);