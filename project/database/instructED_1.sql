create database instructED_1;

create table users (
	email text,
	firstname text,
	lastname text,
	pword text not null,
	phonenumber varchar(10) not null,	-- For DUO Authentication
	oauth text,	--stores oauth type ex. ('Google', 'Facebook', null if none)
	PRIMARY KEY(email)
);
