import React, { Component } from 'react';
import Calendar from 'react-calendar';
 
class TaskCalendar extends Component {
  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })
  
  //Need to recieve data on all assignments for each class the student is enrolled in, in which they have not made a submission.
  //Then in the same division where the calendar is, the assignments for the day toggled by the calendar will be displayed. (using onClickDay() provided by the Calendar object)
  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}