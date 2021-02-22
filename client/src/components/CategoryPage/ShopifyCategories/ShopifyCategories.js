import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import ShopifyCatUpdate from "./ShopifyCatUpdate";
import { Card } from "antd";
const { Meta } = Card;
const axios = require("axios").default;

class ShopifyCategories extends Component {
  constructor(props) {
    super(props);
    this.state = { active: true, class: "show-option-disable", id: "" };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchCategories = () => {
    this.props.fetchCategories();
  };
  submitHandler = (e) => {
    e.preventDefault();

    axios
      .request({
        method: "get",
        url: "/api/shopify_deleteCategories",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          user_id: this.props.user_id,
          id: this.props.id,
          store: this.props.sp_store,
        },
      })
      .then((response) => {
        setTimeout(() => {
          this.props.fetchCategories();
          console.log("Hello, World!");
        }, 2000);
      });
  };

  active() {
    if (this.state.active) {
      this.setState({ active: false, class: "show-option-disable" });
    } else {
      this.setState({ active: true, class: "show-option" });
    }
  }
  render() {
    const { id } = this.state;
    return (
      <div className="col-md-6 showcategories mb-1">
        <div className="categoryblock">
          <Card
            hoverable
            style={{}}
            cover={
              this.props.image != null ? (
                <img
                  style={{ width: "100%" }}
                  alt="image"
                  src={this.props.image.src}
                />
              ) : null
            }
          >
            <Meta title={this.props.title} />
          </Card>
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
            <ShopifyCatUpdate
              user_id={this.props.user_id}
              id={this.props.id}
              name={this.props.title}
              fetchCategories={this.fetchCategories}
              sp_store={this.props.sp_store}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ShopifyCategories;
