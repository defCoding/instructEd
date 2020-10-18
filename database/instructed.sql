CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE Roles (
  role VARCHAR(20),
  PRIMARY KEY (role)
);

INSERT INTO Roles values('admin');
INSERT INTO Roles values('instructor');
INSERT INTO Roles values('student');

CREATE TABLE Users (
  id uuid DEFAULT uuid_generate_v4(),
  main_role VARCHAR(20) NOT NULL DEFAULT 'student',
  email text UNIQUE, 
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  password VARCHAR(64),
  oauth bool,
  PRIMARY KEY (id),
  FOREIGN KEY (main_role) REFERENCES Roles (role)
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

CREATE TABLE Courses (
  course_id SERIAL,
  course_name VARCHAR(25) NOT NULL,
  --instructor_id uuid NOT NULL,
  term VARCHAR(20) NOT NULL,
  PRIMARY KEY (course_id)
  -- (Depends on future table structure) FOREIGN KEY (instructor_id) REFERENCES Users (id)
);

CREATE TABLE Enrollments (
  user_id uuid,
  course_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES Users (id),
  FOREIGN KEY (course_id) REFERENCES Courses (course_id)
);

CREATE TABLE Instructing (
  user_id uuid,
  course_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES Users (id),
  FOREIGN KEY (course_id) REFERENCES Courses (course_id)
);

CREATE TABLE Assignments (
  assignment_id SERIAL,
  assignment_name VARCHAR(50) NOT NULL,
  assignment_decription TEXT,
  course_id INTEGER NOT NULL,
  deadline TIMESTAMP NOT NULL,
  submission_types VARCHAR(10) ARRAY NOT NULL,
  PRIMARY KEY (assignment_id),
  FOREIGN KEY (course_id) REFERENCES Courses (course_id)
);

CREATE TABLE Announcements (
  announcement_id SERIAL,
  announcement_name VARCHAR(50) NOT NULL,
  announcement_description TEXT,
  course_id INTEGER NOT NULL,
  date_created TIMESTAMP NOT NULL,
  author_id uuid NOT NULL,
  PRIMARY KEY (announcement_id),
  FOREIGN KEY (course_id) REFERENCES Courses (course_id),
  FOREIGN KEY (author_id) REFERENCES Users (id)
);

CREATE TABLE Submissions (
  submission_id uuid DEFAULT uuid_generate_v4(),
  assignment_id INTEGER NOT NULL, --^^
  user_id uuid NOT NULL,
  submission_types VARCHAR(10) ARRAY NOT NULL,
  --content VARCHAR(30) "" ARRAY, "" should be either bytea or large objects, will need a table to store these.
  grade FLOAT,
  time_submitted TIMESTAMP,
  PRIMARY KEY (submission_id),
  FOREIGN KEY (user_id) REFERENCES Users (id),
  FOREIGN KEY (assignment_id) REFERENCES Assignments (assignment_id)
);
