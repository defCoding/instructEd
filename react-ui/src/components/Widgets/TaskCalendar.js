import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function TaskCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  };

  const onClickDay = date => {
    //Calls the pop up menu and passes the date to it.
    <AssignmentsPerDay date={date}/>
  }

  return (
    <div>
      <Calendar
        onChange={onChange}
        onClickDay={onClickDay}
        value={date}
      />
    </div>
  );
}
