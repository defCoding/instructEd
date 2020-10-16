import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function TaskCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
      />
    </div>
  );
}
