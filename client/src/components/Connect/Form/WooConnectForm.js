import React, { Component } from "react";
const axios = require("axios").default;

export class WooConnectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      ConsumerKey: "",
      ConsumerSecret: "",
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
        method: "post",
        url: "/api/connectstore",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          url: this.state.url,
          ConsumerKey: this.state.ConsumerKey,
          ConsumerSecret: this.state.ConsumerSecret,
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
              errorresult: response.data,
            });
          }
        } else {
          if (response.data == "200") {
            this.setState({
              errorresult: "Working Fine",
            });
          } else {
            this.setState({
              errorresult: response.data,
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
    const { url, ConsumerKey, ConsumerSecret } = this.state;
    return (
      <div className="form form-connect bg-white row">
        <form
          onSubmit={this.submitHandler}
          method="post"
          className="col-md-12 connectforms"
        >
          <section className="create-s-za">
            <h6>URL</h6>
            <input
              type="text"
              value={url}
              name="url"
              placeholder="Enter Store URL here"
              required
              className="form-control"
              onChange={this.changeHandler}
            />
            <h6>CONSUMER_KEY</h6>
            <input
              type="text"
              value={ConsumerKey}
              name="ConsumerKey"
              placeholder="Enter Consumer Key"
              required
              className="form-control"
              onChange={this.changeHandler}
            />
            <h6 className="mt-4">CONSUMER_SECRET</h6>
            <input
              type="text"
              value={ConsumerSecret}
              name="ConsumerSecret"
              placeholder="Enter Secret Key"
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
            &nbsp;
          </section>
        </form>
      </div>
    );
  }
}

export default WooConnectForm;
