import React, { useState, useRef, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import axios from 'axios';

export default function ChatCourses({setSelectedCourseID, darkState}) {
  const [courses, setCourses] = useState([]);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(-1);
  const coursesRef = useRef([]);

  function getCoursesFromResponse(res) {
    coursesRef.current = coursesRef.current.concat(res.data);
    setCourses(coursesRef.current);
  }

  useEffect(() => {
    axios.get('/roles')
      .then(res => {
        switch (res.data) {
          case 'admin':
            axios.get('/courses').then(getCoursesFromResponse);
            break;
          case 'instructor':
            axios.get('/courses/instructor').then(getCoursesFromResponse);
            break;
          case 'student':
            axios.get('/courses/instructor').then(getCoursesFromResponse);
            axios.get('/courses/student').then(getCoursesFromResponse);
            break;
          default:
            throw new Error('Invalid role.');
        }
      })
      .catch(console.log);
  }, []);

  return (
    <ListGroup variant="flush">
      {courses.map((course, index) => (
        <ListGroup.Item
          style={index === selectedCourseIndex ? (darkState ? { color: 'white', backgroundColor: '#212121' } : {}) :
            (darkState ? { color: 'white', backgroundColor: '#424242' } : {})}
          key={index}
          action
          onClick={() => {
            setSelectedCourseIndex(index);
            setSelectedCourseID(course.course_id);
          }}
          active={index === selectedCourseIndex}
        >
          {course.course_name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}