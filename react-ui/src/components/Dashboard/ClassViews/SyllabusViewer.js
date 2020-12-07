import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, FormControl, TextField } from '@material-ui/core';
import gfm from 'remark-gfm';
import axios from 'axios';


export default function SyllabusViewer({ courseID }) {
    const [mode, setMode] = useState(0); // 0 is viewing mode, 1 is editing mode.
    const [role, setRole] = useState(0); // 0 is student, 1 is instructor or admin.
    const [syllabus, setSyllabus] = useState('');
    const [newSyllabus, setNewSyllabus] = useState('');
    const inputRef = useRef();
  
    function toggleMode() {
        setMode(prevMode => 1 - prevMode);
        setNewSyllabus(syllabus);
    }

    function saveAndToggleMode() {
        axios.put('/syllabus', { courseID, syllabus: newSyllabus })
            .catch(console.log);
        setSyllabus(newSyllabus);
        toggleMode();
    }

    useEffect(() => {
        setNewSyllabus(syllabus);
    }, [syllabus]);

    useEffect(() => {
        if (courseID != -1) {
            axios.get('/roles')
            .then(res => {
                if (res.data === 'admin') {
                    setRole(1);
                } else {
                axios.get(`/roles/course/${courseID}`)
                    .then(res => {
                    if (res.data === 'instructor') {
                        setRole(1);
                    }
                    });
                }
            });

            axios.get(`/syllabus/${courseID}`)
                .then(res => {
                    setSyllabus(res.data);
                })
                .catch(console.log);
        }
    }, [courseID]);

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                {role === 1 && mode === 0
                ? <Button variant={'contained'} onClick={toggleMode}>Edit Syllabus</Button>
                : <></>}
                {role === 1 && mode === 1
                ? <Button variant={'contained'} onClick={toggleMode}>Cancel</Button>
                : <></>}
                {role === 1 && mode === 1
                ? <Button variant={'contained'} style={{ marginRight: '1em' }} onClick={saveAndToggleMode}>Save Changes</Button>
                : <></>}
            </div>
            {mode === 0 ? <ReactMarkdown plugins={[gfm]} children={syllabus} /> : <></>}
            {mode === 1 ? <FormControl style={{ width: '100%', marginTop: '1em' }}>
                <TextField variant='outlined' value={newSyllabus} onChange={e => setNewSyllabus(e.target.value)} multiline={true} />
            </FormControl> : <></>}
        </div>
    );
}
