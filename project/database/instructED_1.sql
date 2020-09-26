create database instructED_1;

create table users (
	username varchar(20),
	email text not null,
	pword text not null,
	phonenumber varchar(10) not null,	-- For DUO Authentication
	oauth text,	--stores oauth type ex. ('Google', 'Facebook', null if none)
	PRIMARY KEY(username)
);
