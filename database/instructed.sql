CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE Users (
  id uuid DEFAULT uuid_generate_v4(),
  email text UNIQUE, 
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  password VARCHAR(64),
  oauth bool,
  PRIMARY KEY (id)
);

CREATE TABLE PasswordTokens (
  id uuid NOT NULL UNIQUE,
  token VARCHAR(40),
  expiration TIMESTAMP,
  PRIMARY KEY (token),
  FOREIGN KEY (id) REFERENCES Users (id)
);


CREATE TABLE FacebookUsers (
  id uuid,
  fb_id text NOT NULL UNIQUE,
  access_token text NOT NULL,
  signed_request text NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES Users (id)
);
