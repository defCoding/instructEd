const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const Duo = require('@duosecurity/duo_web');
const app = express();
const db = require('./queries');
const server = require('http').createServer(app);
const io = require('socket.io')(server)
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
app.get('/roles/course/:courseID', withDuoAuth, db.getRoleInCourse);
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
app.post('/assignments', withDuoAuth, db.addAssignment);
app.post('/announcements', withDuoAuth, db.addAnnouncement);
app.post('/courses', withDuoAuth, db.addCourse);
app.post('/instructing', withDuoAuth, db.addInstructorToCourse);
app.post('/enrollments', withDuoAuth, db.addStudentToCourse);
app.post('/submissions', withDuoAuth, db.addSubmission);
app.post('/submissions/link', withDuoAuth, db.addLinkSubmission);
app.post('/course_files', withDuoAuth, db.addCourseFile);
app.post('/assignment_files', withDuoAuth, db.addAssignmentFile);
app.post('/course_videos', withDuoAuth, db.addCourseVideo);
app.get('/course_files/approved/:courseID', withDuoAuth, db.getApprovedCourseFiles);
app.get('/assignment_files/:assignmentID', withDuoAuth, db.getAssignmentFiles);
app.get('/assignment_files/approved/:assignmentID', withDuoAuth, db.getApprovedAssignmentFiles);
app.get('/course_videos/:courseID', withDuoAuth, db.getCourseVideos);
app.get('/course_videos/approved/:courseID', withDuoAuth, db.getApprovedCourseVideos);
app.get('/course_files/unapproved/:courseID', withDuoAuth, db.getUnapprovedCourseFiles);
app.get('/assignment_files/:assignmentID', withDuoAuth, db.getAssignmentFiles);
app.get('/assignment_files/unapproved/:assignmentID', withDuoAuth, db.getUnapprovedAssignmentFiles);
app.get('/course_videos/unapproved/:courseID', withDuoAuth, db.getUnapprovedCourseVideos);
app.get('/courses/:courseID/students', withDuoAuth, db.getCourseStudents);
app.get('/courses/:courseID/people', withDuoAuth, db.getCoursePeople);
app.get('/submissions/assignment/:assignmentID', withDuoAuth, db.getAssignmentSubmissions);
app.get('/submissions/assignment/:assignmentID/student/:studentID', withDuoAuth, db.getAssignmentSubmissions);
app.get('/grades/:assignmentID/:studentID', withDuoAuth, db.getStudentGrade);
app.get('/grades/:assignmentID/', withDuoAuth, db.getGrade);
app.post('/grades/', withDuoAuth, db.addGrade);
app.put('/assignment_files', withDuoAuth, db.approveAssignmentFile);
app.put('/course_files', withDuoAuth, db.approveCourseFile);
app.put('/course_videos', withDuoAuth, db.approveCourseVideo);
app.get('/search/users/:query/filter/:role', withDuoAuth, db.searchUsers);
app.get('/search/courses/:query', withDuoAuth, db.searchCourses);
app.get('/userID', withDuoAuth, db.getUserID);
app.get('/chat/conversations/:courseID', withDuoAuth, db.getUserConversations);
app.get('/chat/messages/:conversationID', withDuoAuth, db.getConversationMessages);
app.post('/chat/messages/', withDuoAuth, db.addMessage);
app.post('/chat/conversations', withDuoAuth, db.createConversation);

// Catch All
app.use(express.static(path.join(__dirname, '../react-ui/build')));
app.get('*', serveIndex);


app.listen(process.env.PORT || 5000);
console.log(`Server started. Listening on port ${process.env.PORT || 5000}`);



// Chat
io.on('connection', socket => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on('send-message', ({ recipients, text}) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      });
    });
  });
});
