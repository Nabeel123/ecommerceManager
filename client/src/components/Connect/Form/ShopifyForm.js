import React, { Component } from "react";
const axios = require("axios").default;

export class ShopifyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopName: "",
      apiKey: "",
      password: "",
      errorresult: "",
      addstore: "",
      UserData: JSON.parse(localStorage.getItem("user")),
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addstore = () => {
    this.setState({ addstore: "1" });
  };

  resaddstore = () => {
    this.setState({ addstore: "" });
  };

  submitHandler = (e) => {
    e.preventDefault();

    axios
      .request({
        method: "get",
        url: "/api/shopify_connect",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          shopName: this.state.shopName,
          apiKey: this.state.apiKey,
          password: this.state.password,
          addstore: this.state.addstore,
          user_id: this.state.UserData.user_id,
        },
      })
      .then((response) => {
        // alert(response.data);
        if (this.state.addstore === "1") {
          if (response.data == "200") {
            this.setState({
              errorresult: "Added Successfully",
            });
          } else {
            this.setState({
              errorresult: "Something went wrong",
            });
          }
        } else {
          if (response.data == "200") {
            this.setState({
              errorresult: "Working Fine",
            });
          } else {
            this.setState({
              errorresult: "Something went wrong",
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  Form = (title) => {
    this.props.FormChange(title);
  };

  render() {
    const { shopName, apiKey, password } = this.state;
    return (
      <div className="form form-connect bg-white row">
        <form
          onSubmit={this.submitHandler}
          method="post"
          className="col-md-12 connectforms"
        >
          <section className="create-s-za">
            <h6>SHOP_NAME</h6>
            <input
              type="text"
              value={shopName}
              name="shopName"
              placeholder="Enter store Url"
              required
              className="form-control"
              onChange={this.changeHandler}
            />
            <h6 className="mt-4">API_KEY</h6>
            <input
              type="text"
              value={apiKey}
              name="apiKey"
              placeholder="Enter Api key"
              required
              className="form-control"
              onChange={this.changeHandler}
            />
            <h6 className="mt-4">PASSWORD</h6>
            <input
              type="text"
              value={password}
              name="password"
              placeholder="Enter Secret key"
              required
              className="form-control"
              onChange={this.changeHandler}
            />
            <div className="clearfix"></div>
            <br />
            <p id="result">{this.state.errorresult}</p>
            <div className="clearfix"></div>
            <button
              type="submit"
              onClick={this.resaddstore}
              className="connectbtn btn"
            >
              Test Connection
            </button>{" "}
            &nbsp;
            <button
              type="submit"
              onClick={this.addstore}
              name="addstore"
              className="connectbtn btn"
            >
              Add Store
            </button>{" "}
          </section>
        </form>
      </div>
    );
  }
}

export default ShopifyForm;
