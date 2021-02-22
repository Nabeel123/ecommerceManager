import React, { Component } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import "./DetailProduct.css";
import EditProductDialog from "../EditProduct/EditProductDialog";
class DetailProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
      newP: props.detailproduct,
    };
  }

  handleEditDialog = () => {
    this.setState((prevState) => {
      return {
        show: !prevState.show,
      };
    });
  };
  updateProduct = (updateP) => {
    this.setState({
      detailproduct: updateP,
    });
  };
  editProduct = () => {
    this.handleEditDialog();
  };
  render() {
    const { detailproduct } = this.props;
    const { show } = this.state;
    console.log("NewP", this.state.newP);
    return (
      <div className="detailProduct-main">
        <Row className="p-3">
          <Col className="detail-p-image">
            <img src={detailproduct.Image} alt="" />
          </Col>
          <Col className="detail-p d-flex justify-content-between flex-column pt-3">
            {/* <div className="d-flex justify-content-between flex-column pt-3"> */}
            <h6>{detailproduct.Name}</h6>
            <div className="d-flex justify-content-between align-items-baseline">
              <p>Price</p>
              <span>{`$${detailproduct.Price}`}</span>
            </div>
            <div className="d-flex justify-content-between align-items-baseline">
              <p>Status</p>
              <span>{detailproduct.Status}</span>
            </div>
            <div className="d-flex justify-content-between align-items-baseline">
              <p>Rating</p>
              <span>5 star</span>
            </div>
            <div>
              <p>Description</p>
              <span>{detailproduct.Desctiption}</span>
            </div>
            {/* </div> */}
            <div>
              <Button style={{ width: "100px" }} onClick={this.editProduct}>
                Edit
              </Button>
              <Button
                style={{ float: "right", width: "100px" }}
                onClick={this.props.closeDetail}
              >
                Close
              </Button>
            </div>
          </Col>
        </Row>
        <div>
          {show && (
            <Modal show={show} size="md">
              <EditProductDialog
                detailproduct={detailproduct}
                updateProduct={this.updateProduct}
                close={this.handleEditDialog}
              />
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default DetailProduct;
