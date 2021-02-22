import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const axios = require("axios").default;

const WooCatUpdate = (props) => {
  const { id, name, fetchCategories, store, user_id } = props;

  const [product, setProduct] = useState({
    id: id,
    name: name,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(e.target.title.value);

    axios
      .request({
        method: "post",
        url: "/api/update_wc_categories",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          user_id: props.user_id,
          id: e.target.id.value,
          name: e.target.name.value,
          store: props.store,
          // image: this.state.image,
        },
      })
      .then((response) => {
        if (response.data === "success") {
          setTimeout(() => {
            if (fetchCategories && typeof fetchCategories === "function") {
              fetchCategories();
              handleClose();
            }
          }, 2000);
        } else if (response.data.status === "fail") {
          alert("Message failed to send.");
        }
      });
  };

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
                <label>Category Title</label>
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
export default WooCatUpdate;
