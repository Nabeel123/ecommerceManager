import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

export class ShopifyCatSidebar extends Component {
  StoreSidebar = (name, id) => {
    this.props.ShopifyfetchCategories(name, id);
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

export default ShopifyCatSidebar;
