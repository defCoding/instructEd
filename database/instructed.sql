create database instructed;
\c instructed;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE Users (
  id uuid DEFAULT uuid_generate_v4(),
  email text UNIQUE, 
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  password VARCHAR(64),
  oauth text,
  PRIMARY KEY (id)
);