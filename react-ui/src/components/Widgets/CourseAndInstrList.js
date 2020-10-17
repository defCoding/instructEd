import React, { useEffect } from 'react';
import axios from 'axios';
import { List, ListItemText, ListItem, Divider } from '@material-ui/core'

export default function CourseAndInstrList(){
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios.get('/courses').then(getCoursesFromResponse);
    });

    function getCoursesFromResponse(res){
        coursesRef.current = coursesRef.current.concat(res.data);
        setCourses(coursesRef.current);
    }

 return (
        <List>
            {courses.map((course) =>
                <>
                    <ListItem>
                        <ListItemText primary={course.course_name} secondary={course.course_id}
                        secondary={course.term} />
                    </ListItem>
                    <Divider />
                </>
            )}
        </List>
    );

}