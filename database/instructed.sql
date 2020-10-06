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

CREATE TABLE Courses (
  course_id VARCHAR(20),
  course_name VARCHAR(25) NOT NULL,
  --instructor_id uuid NOT NULL,
  term_id VARCHAR(20) NOT NULL,
  PRIMARY KEY (course_id),
  -- (Depends on future table structure) FOREIGN KEY (instructor_id) REFERENCES Users (id)
);

CREATE TABLE Enrollments (
  student_id uuid,
  course_id VARCHAR(20),
  PRIMARY KEY (student_id, course_id);
  FOREIGN KEY (student_id) REFERENCES Users (id),
  FOREIGN KEY (course_id) REFERENCES Courses (course_id)
);

CREATE TABLE Instructing (
  instructor_id uuid,
  course_id VARCHAR(20),
  PRIMARY KEY (instructor_id, course_id),
  FOREIGN KEY (instructor_id) REFERENCES Users (id),
  FOREIGN KEY (course_id) REFERENCES Courses (course_id)
);

CREATE TABLE Submissions (
  submission_id VARCHAR(40), --May need to be changed to a randomly generated id
  assignment_id VARCHAR(40) NOT NULL, --^^
  submission_types VARCHAR(10) ARRAY NOT NULL,
  --content VARCHAR(30) "" ARRAY, "" should be either bytea or large objects, will need a table to store these.
  grade VARCHAR(5),
  time_submitted TIMESTAMP,
  PRIMARY KEY (submission_id),
  FOREIGN KEY (assignment_id) REFERENCES Assignments (assignment_id)
);

CREATE TABLE Assignments (
  assignment_id VARCHAR(40),
  assignment_name VARCHAR(50) NOT NULL,
  assignment_decription VARCHAR(500),
  course_id VARCHAR(20) NOT NULL,
  deadline TIMESTAMP NOT NULL,
  submission_types VARCHAR(10) ARRAY NOT NULL,
);
