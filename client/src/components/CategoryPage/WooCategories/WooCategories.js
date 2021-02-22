import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import WooCatUpdate from "./WooCatUpdate";
const axios = require("axios").default;

class WooCategories extends Component {
  constructor(props) {
    super(props);
    this.state = { active: true, class: "show-option-disable", id: "" };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();

    axios
      .request({
        method: "post",
        url: "/api/delete_wp_categories",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          id: this.props.id,
          store: this.props.store,
          user_id: this.props.user_id,
        },
      })
      .then((response) => {
        setTimeout(() => {
          this.fetchCategories();
          console.log("Hello, World!");
        }, 2000);
      });
  };

  fetchCategories = () => {
    this.props.fetchCategories();
  };
  active() {
    if (this.state.active) {
      this.setState({ active: false, class: "show-option-disable" });
    } else {
      this.setState({ active: true, class: "show-option" });
    }
  }
  render() {
    // const { id } = this.state;
    return (
      <div className="col-md-6 showcategories">
        <div className="categoryblock">
          <h6>{this.props.title}</h6>
          <p>{this.props.products} products</p>
          <div className="categoriesoption" onClick={() => this.active()}>
            <FontAwesome name="ellipsis-h" />
          </div>
          <div className={this.state.class}>
            <a
              value={this.props.id}
              name="id"
              onClick={this.submitHandler}
              onChange={this.changeHandler}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </a>
            <WooCatUpdate
              id={this.props.id}
              name={this.props.title}
              fetchCategories={this.fetchCategories}
              store={this.props.store}
              user_id={this.props.user_id}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WooCategories;
