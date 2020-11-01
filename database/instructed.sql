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
  id SERIAL,
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
  id INTEGER NOT NULL UNIQUE,
  token VARCHAR(40),
  expiration TIMESTAMP,
  PRIMARY KEY (token),
  FOREIGN KEY (id) REFERENCES Users (id)
);


CREATE TABLE FacebookUsers (
  id INTEGER,
  fb_id text NOT NULL UNIQUE,
  access_token text NOT NULL,
  signed_request text NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES Users (id)
);

CREATE TABLE Courses (
  course_id SERIAL,
  course_dept VARCHAR(5) NOT NULL,
  course_number INTEGER NOT NULL,
  course_name VARCHAR(25) NOT NULL,
  term VARCHAR(20) NOT NULL,
  PRIMARY KEY (course_id)
);

CREATE TABLE Enrollments (
  user_id INTEGER,
  course_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES Users (id),
  FOREIGN KEY (course_id) REFERENCES Courses (course_id)
);

CREATE TABLE Instructing (
  user_id INTEGER,
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
  author_id INTEGER NOT NULL,
  PRIMARY KEY (announcement_id),
  FOREIGN KEY (course_id) REFERENCES Courses (course_id),
  FOREIGN KEY (author_id) REFERENCES Users (id)
);

CREATE TABLE Submissions (
  submission_id SERIAL,
  assignment_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  time_submitted TIMESTAMP,
  PRIMARY KEY (submission_id),
  FOREIGN KEY (user_id) REFERENCES Users (id),
  FOREIGN KEY (assignment_id) REFERENCES Assignments (assignment_id)
);

CREATE TABLE Grades (
  assignment_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  grade FLOAT,
  PRIMARY KEY (assignment_id, user_id),
  FOREIGN KEY (user_id) REFERENCES Users (id),
  FOREIGN KEY (assignment_id) REFERENCES Assignments (assignment_id)
);

CREATE TABLE CourseFiles (
  course_id INTEGER NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  upload_date TIMESTAMP NOT NULL,
  approved BOOLEAN NOT NULL,
  PRIMARY KEY (course_id, file_name),
  FOREIGN KEY (course_id) REFERENCES Courses (course_id)
);

CREATE TABLE CourseVideos (
  course_id INTEGER NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  upload_date TIMESTAMP NOT NULL,
  approved BOOLEAN NOT NULL,
  PRIMARY KEY (course_id, file_name),
  FOREIGN KEY (course_id) REFERENCES Courses (course_id)
);
