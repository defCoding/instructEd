const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const Duo = require('@duosecurity/duo_web');
const app = express();
const db = require('./queries');
const { withAuth, withDuoAuth } = require('./middleware');

// Serve static file of index.html to allow Router to initialize.
const serveIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '../react-ui/build/index.html'), err => {
	  if (err) {
		  res.status(500).send(err);
		}
	});
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

/**
 * Login and Registration Endpoints
 */
app.post('/users', db.createUser);
app.post('/authenticate', db.loginUser);
app.post('/authenticate/facebook', db.loginFacebook);
app.post('/forgotPassword', db.forgotPassword);
app.post('/updatePassword', db.updatePassword);
app.get('/resetPassword/:token', db.resetPassword, serveIndex);

app.get('/duo_frame', withAuth, (req, res) => {
  const sigRequest = Duo.sign_request(process.env.DUO_IKEY, process.env.DUO_SKEY, process.env.DUO_AKEY, req.userID.toString());
  res.json({sigRequest, host: process.env.DUO_HOST});
});

app.post('/duo_login', withAuth, (req, res) => {
  const signedResponse = req.body.signedResponse;
  const authenticatedUsername = Duo.verify_response(process.env.DUO_IKEY,
    process.env.DUO_SKEY,
    process.env.DUO_AKEY,
    signedResponse);

  if (authenticatedUsername) {
    const userID = req.userID.toString();
    const token = jwt.sign({ userID }, process.env.DUO_JWT_KEY);
    res.cookie('DUO_TOKEN', token, { httpOnly: true }).status(200).send();
  } else {
    res.status(403).send('Duo login failed.');
  }
});

app.get('/authorize', withDuoAuth, (req, res) => {
  res.status(200).send();
});

app.post('/logout', (req, res) => {
  res.clearCookie('LOGIN_TOKEN');
  res.clearCookie('DUO_TOKEN');
  res.status(200).send();
})

/**
 * Course, Assignments, and Announcements
 */
app.get('/roles', withDuoAuth, db.getRole);
app.put('/roles', withDuoAuth, db.setRole);
app.get('/courses', withDuoAuth, db.getAllCourses('admin')); // select all
app.get('/courses/instructor', withDuoAuth, db.getAllCourses('instructor')); // instructing
app.get('/courses/student', withDuoAuth, db.getAllCourses('student')); // enrollments
app.get('/announcements', withDuoAuth, db.getAllAnnouncements('admin'));
app.get('/announcements/instructor', withDuoAuth, db.getAllAnnouncements('instructor'));
app.get('/announcements/student', withDuoAuth, db.getAllAnnouncements('student'));
app.get('/assignments', withDuoAuth, db.getAllAssignments('admin'));
app.get('/assignments/instructor', withDuoAuth, db.getAllAssignments('instructor'));
app.get('/assignments/students', withDuoAuth, db.getAllAssignments('student'));
app.get('/assignments/:ID', withDuoAuth, db.getAssignment);
app.get('/assignments/date/:date', withDuoAuth, db.getAssignmentsByDate);
app.get('/assignments/upcoming/:date', withDuoAuth, db.getUpcomingAssignments);
app.get('/courses/:ID', withDuoAuth, db.getCourse);
app.get('/courses/:ID/assignments', withDuoAuth, db.getCourseAssignments);
app.get('/courses/:ID/announcements', withDuoAuth, db.getCourseAnnouncements);
app.post('/announcements', withDuoAuth, db.addAnnouncement);
app.post('/courses', withDuoAuth, db.addCourse);
app.post('/instructing', withDuoAuth, db.addInstructorToCourse);
app.post('/enrollments', withDuoAuth, db.addStudentToCourse);
app.post('/submissions', withDuoAuth, db.addSubmission);
app.post('/course_files', withDuoAuth, db.addCourseFile);
app.get('/course_files/:courseID', withDuoAuth, db.getCourseFiles);
app.get('/courses/:courseID/students', withDuoAuth, db.getCourseStudents);
app.get('/submissions/assignment/:assignmentID', withDuoAuth, db.getAssignmentSubmissions);
app.get('/submissions/assignment/:assignmentID/student/:studentID', withDuoAuth, db.getAssignmentSubmissions);
// app.post('/course_videos', withDuoAuth, db.addCourseVideo);

// Catch All
app.use(express.static(path.join(__dirname, '../react-ui/build')));
app.get('*', serveIndex);


app.listen(process.env.PORT || 5000);
console.log(`Server started. Listening on port ${process.env.PORT || 5000}`);
