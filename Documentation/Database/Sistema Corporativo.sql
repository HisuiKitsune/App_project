Drop Schema projetointegrador;
CREATE SCHEMA projetointegrador;
use projetointegrador;

CREATE TABLE IF NOT EXISTS produto (
idProduto int (50) not null auto_increment,
nome varchar (100) not null,
descricao varchar (50) not null,
quantidade int (50) not null,
categoria varchar (50) not null,
marca varchar (50) not null,
valor double not null,
PRIMARY KEY(idProduto));

insert into produto (nome, descricao, quantidade, categoria, marca, valor) values ("Casaco sk8 Element", "casaco azul element estampa skate", 80, "Vestuário", "Element", 190);

CREATE TABLE IF NOT EXISTS fornecedor(
idFornecedor smallint not null auto_increment,
cnpj int (50) not null UNIQUE,
produto varchar (50) not null,
nome varchar(50) not null,
telefone varchar (20),
email varchar (50),
endereco varchar (100) not null,
PRIMARY KEY(idFornecedor))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS controle_entrada (
idEntrada smallint not null auto_increment,
quantidadeEntrada int(45) not null,
dataEntrada date,
valorProduto double not null,
nomeProdutoEntrada varchar(50) not null,
IdProduto int (50) not null,
Idfornecedor smallint not null,
PRIMARY KEY(idEntrada),
CONSTRAINT fk_controle_entrada_produto FOREIGN KEY (idProduto) REFERENCES produto(idProduto),
CONSTRAINT fk_controle_entrada_fornecedor FOREIGN KEY (Idfornecedor) REFERENCES fornecedor(idFornecedor));

CREATE TABLE IF NOT EXISTS controle_saida(
idSaida smallint not null auto_increment,
quantidadeSaida int(50) UNSIGNED,
dataSaida varchar(50),
estoque int (50) not null,
idProduto int (50),
valor double not null,
PRIMARY KEY(idSaida),
CONSTRAINT fk_controle_saida_produto FOREIGN KEY (idProduto) REFERENCES produto(idProduto));

drop table controle_saida;
insert into controle_saida (quantidadeSaida, dataSaida, estoque, idProduto, valor) values (8, "2022-05-05", 50, 1, 600);
select * from controle_saida;
update controle_saida set  quantidadeSaida = 8 , dataSaida = curdate() , estoque = 90, valor = 900 where idSaida = 1;
 
CREATE TABLE IF NOT EXISTS funcionario(
id int (100) not null auto_increment,
nome varchar (100) not null,
cpf varchar (50) not null,
email varchar (50) not null,
endereco varchar(50) not null,
telefone varchar(50) not null,
PRIMARY KEY (id))
ENGINE = InnoDB;

Create table if not exists funcionariolog(
id int not null auto_increment,
nome varchar(100) not null,
login varchar(200) not null,
senha varchar(100) not null,
PRIMARY KEY (id))
ENGINE = InnoDB;





