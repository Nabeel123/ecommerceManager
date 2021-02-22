import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const axios = require("axios").default;

const ShopifyCatUpdate = (props) => {
  const { fetchCategories, name, id, sp_store, user_id } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(e.target.title.value);

    axios
      .request({
        method: "get",
        url: "/api/shopify_UpdateCategories",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          user_id: props.user_id,
          id: e.target.id.value,
          name: e.target.name.value,
          store: props.sp_store,
          // image: this.state.image,
        },
      })
      .then((response) => {
        if (response.data === "success") {
          setTimeout(() => {
            props.fetchCategories();
            handleClose();
          }, 2000);
        } else if (response.data.status === "fail") {
          alert("Message failed to send.");
        }
      });
  };

  const [product, setProduct] = useState({
    id: id,
    name: name,
  });

  return (
    <>
      <a className="" onClick={handleShow}>
        <i className="fa fa-edit" aria-hidden="true"></i>
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <form className="PublisherForm row bg-white" onSubmit={handleSubmit}>
            <div className="col-md-7">
              <input type="hidden" id="id" name="id" value={id} />
              <div className="form-group" controlId="title">
                <label>Product Title</label>
                <input
                  className="form-control"
                  value={product.name}
                  type="text"
                  name="name"
                  placeholder="Place Your Title Here"
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Update Product
            </button>{" "}
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};
export default ShopifyCatUpdate;
