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

CREATE TABLE Roles (
  id uuid NOT NULL,
  roles VARCHAR(20),
  FOREIGN KEY (id) REFERENCES Users (id)
);


CREATE TABLE OauthInfo (
  id INT IDENTITY(1,1) NOT NULL,
  name VARCHAR(50) NULL,
  email VARCHAR(50) NULL,
  provider_name VARCHAR(50) NULL,
  image VARCHAR(650) NULL,
  token NVARCHAR(650) NULL,
  CONSTRAINT PK_OauthInfo PRIMARY KEY CLUSTERED ( id ASC )
  WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY])
ON [PRIMARY];

