import React, { Component } from "react";
import ImageUploader from "react-images-upload";
const axios = require("axios").default;

class AddShopifyCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      image: "",
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit(e) {
    e.preventDefault();

    axios
      .request({
        method: "get",
        url: "/api/shopify_addCat",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          name: this.state.title,
          sp_store: this.props.sp_store,
          user_id: this.props.user_id,
          // image: this.state.image,
        },
      })
      .then((res) => {
        if (res.data === "success") {
          setTimeout(() => {
            this.props.fetchCategories();
            console.log("Hello, World!");
          }, 3000);
        } else if (res.data.status === "fail") {
          alert("Message failed to send.");
        }
      });
  }

  render() {
    const { title } = this.state;
    return (
      <div className="bg-white addnewcategory row">
        <form
          method="post"
          className="col-md-12 connectforms"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Category Name</label>
            <input
              value={title}
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter Category"
              onChange={this.changeHandler}
            />
            <small id="emailHelp" className="form-text text-muted">
              Slug will be created Automatically
            </small>
          </div>
          <button type="submit" className="connectbtn btn">
            Add New
          </button>{" "}
          &nbsp;
          <input type="button" value="Reset" className="btn btn-light" />
        </form>
      </div>
    );
  }
}

export default AddShopifyCategory;
