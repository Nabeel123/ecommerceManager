import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

export class WooCatSidebar extends Component {
  StoreSidebar = (name, id) => {
    this.props.fetchCategories(name, id);
  };

  const = () => {};

  render() {
    return (
      <div
        className="StoreSidebar"
        onClick={() => this.StoreSidebar(this.props.storename, this.props.id)}
      >
        {this.props.storename}
      </div>
    );
  }
}

export default WooCatSidebar;
