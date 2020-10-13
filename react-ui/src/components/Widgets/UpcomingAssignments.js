import React, { Component } from 'react';

class UpcomingAssignments extends Component {
    constructor(props){
        super(props);
    }

    //Should return all announcements for courses the student is enrolled in, then in the <div> section display them in a list.
    render() {
        const data = [{"Assignment 1":"This is assignment 1"}, {"Assignment 2":"This is assignment 2"}];
        const listitems = data.map((a) => <li key={a.name}>{a.name}</li>);
        return (
            <div>
                {listitems}
            </div>
        );    
    }
}
