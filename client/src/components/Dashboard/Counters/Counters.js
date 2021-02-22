import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';



const Counters = (props) => {


    return (
        <div className="col-md-3">
            <div className="counter-card">
                <span className="counter-price">{props.amount}</span>
                <p className="counter-title">{props.title}</p>
                <div className="counter-card-icon">
                    <FontAwesome name="check-circle-o" />
                </div>
            </div>
        </div>
    );

}

export default Counters;
