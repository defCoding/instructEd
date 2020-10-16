<<<<<<< HEAD
import React from 'react';
import { List, ListItemText, ListItem, Divider } from '@material-ui/core';

const data = [{"header":"P465", "body":"This is announcement 1"}, {"header":"P465", "body":"This is announcement 2"}];

export default function Announcements() {
    return (
        <List>
            {data.map((announcement) => (
                <>
                    <ListItem>
                        <ListItemText primary={announcement.header} secondary={announcement.body} />
                    </ListItem>
                    <Divider />
                </>
            ))}
        </List>
    );
=======
import React, { useState } from 'react';

export default function Announcements() {
    const data = [{"Announcement 1":"This is announcement 1"}, {"Announcement 2":"This is announcement 2"}];
    const listitems = data.map((a) => <li key={a.name}>{a.name}</li>);
    //Should return all announcements for courses the student is enrolled in, then in the <div> section display them in a list.

    return (
        <div>
            {listitems}
        </div>
    );    
    
>>>>>>> 213fb335f05939b841f97732fede5a13556d86b8
}
