import React, { Component, useState } from "react";
const axios = require("axios").default;

const EbayForm = () => {
  const [errorResult, setErrorResult] = useState("");
  const userData = JSON.parse(localStorage.getItem("user"));
  const [storeName, setStoreName] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const resetAddStore = () => {
    setStoreName("");
    setClientId("");
    setClientSecret("");
  };

  // Ebay Form Connection generate access token

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .request({
        method: "get",
        url: process.env.REACT_APP_BACKEND_URL + "/api/ebay/getAccessToken",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // params: {
        //   user_id: userData.user_id,
        //   clientId: clientId,
        //   storeName: storeName,
        //   clientSecret: clientSecret,
        // },
      })
      .then((response) => {
        console.log("response", response.data);
        setTimeout(() => {
          window.open(response.data);
        }, 5000);
        // const { access_token, expires_in } = response.data;
        // if (access_token) {
        //   setErrorResult("Added Successfully");
        //   resetAddStore();
        // } else {
        //   setErrorResult("Something went wrong");
        // }
      });
  };

  return (
    <React.Fragment>
      <div className="form form-connect bg-white row">
        <form
          onSubmit={submitHandler}
          method="post"
          className="col-md-12 connectforms"
        >
          <section className="create-s-za">
            <h6 className="mt-4">STORE NAME</h6>
            <input
              type="text"
              value={storeName}
              name="storeName"
              placeholder="Enter Store Name"
              required
              className="form-control"
              onChange={(e) => setStoreName(e.target.value)}
            />
            <h6 className="mt-4">CLIENT ID</h6>
            <input
              type="text"
              value={clientId}
              name="clientId"
              placeholder="Enter Client ID"
              required
              className="form-control"
              onChange={(e) => setClientId(e.target.value)}
            />
            <h6 className="mt-4">CLIENT SECRET</h6>
            <input
              type="text"
              value={clientSecret}
              name="clientSecret"
              placeholder="Enter Client Secret"
              required
              className="form-control"
              onChange={(e) => setClientSecret(e.target.value)}
            />
            <div className="clearfix"></div>
            <br />
            <p id="result">{errorResult}</p>
            <div className="clearfix"></div>
            <button type="submit" className="connectbtn btn">
              Add Store
            </button>{" "}
          </section>
        </form>
      </div>
    </React.Fragment>
  );
};
export default EbayForm;
