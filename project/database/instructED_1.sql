create database instructED_1;

create table users (
	username text,
	email text not null,
	pword text not null,
	phonenumber text not null,	-- For DUO Authentication
	oauth text,	--stores oauth type ex. ('Google', 'Facebook', null if none)
	PRIMARY KEY(username));
