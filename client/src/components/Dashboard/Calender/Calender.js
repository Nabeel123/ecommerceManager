import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calender = (props) => {

    const state = {
        date: new Date(),
      }


    return (
        <div className="bg-white calender">
           <Calendar className="calenderdata"/>
        </div>
    );
}

export default Calender;
