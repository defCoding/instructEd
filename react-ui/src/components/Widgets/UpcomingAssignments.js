import React, { useState } from 'react';

export default function Announcements() {
    const data = [{"Announcement 1":"This is announcement 1"}, {"Announcement 2":"This is announcement 2"}];
    const listitems = data.map((a) => <li key={a.name}>{a.name}</li>);
    //Should return all assignments for courses the student is enrolled in, then in the <div> section display them in a list.

    return (
        <div>
            {listitems}
        </div>
    );    
    
}