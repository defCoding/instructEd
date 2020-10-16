import React, { Component } from 'react';

class Announcements extends Component {
    constructor(props){
        super(props);
    }

    //Should return all announcements for courses the student is enrolled in, then in the <div> section display them in a list.

    render() {
        const data = [{"Announcement 1":"This is announcement 1"}, {"Announcement 2":"This is announcement 2"}];
        const listitems = data.map((a) => <li key={a.name}>{a.name}</li>);
        return (
            <div>
                {listitems}
            </div>
        );    
    }
}
