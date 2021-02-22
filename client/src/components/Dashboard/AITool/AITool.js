import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';



const AITool = (props) => {


    return (
        <div className="aitoolmain">
            AI Tool
            <h4>44</h4>
            <p><FontAwesome name="long-arrow-up" /> New Suggestions</p>
            <span>Read More</span>
            <div className="aiicon">
            <img src="Images/aitoolnew.png" alt="aitool" />
            </div>
        </div>
    );

}

export default AITool;
