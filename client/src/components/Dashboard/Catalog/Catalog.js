import React, { Component } from "react";
import { Switch, HashRouter, Route, Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { Button } from "react-bootstrap";

const Catalog = (props) => {
  return (
    <div className="catalogmain bg-white">
      <b>Catalog</b>
      {/* <div className="catalogcounter">
        <p>15</p>
      </div> */}
      <h5>Manage Catalogs</h5>
      <div className="button_cont">
        <Link to="/catalog" className="example_e">
          + Create new Catalog
        </Link>
      </div>
    </div>
  );
};

export default Catalog;
