import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';



const AnalyticsCards = (props) => {




    return (
        <div className="bg-white p-2 mb-2">
            <p className="analyticscardtitle">{props.title}</p>
            <div className="analyticscardcounter">
                <span className={`${(props.change >= 1) ? "arrowup" : "arrowdown"}`}>
                    <FontAwesome name={`${(props.change >= 1) ? "long-arrow-up" : "long-arrow-down"}`} />
                    {props.change}
                </span>
                <h4>{props.amount}</h4>
            </div>
        </div>
    );
}

export default AnalyticsCards;
