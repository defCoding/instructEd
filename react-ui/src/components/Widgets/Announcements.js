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
}