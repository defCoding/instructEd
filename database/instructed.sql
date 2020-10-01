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

CREATE TABLE PasswordTokens (
  id uuid NOT NULL,
  token VARCHAR(40),
  expiration TIMESTAMP,
  PRIMARY KEY (token),
  FOREIGN KEY (id) REFERENCES Users (id)
);
