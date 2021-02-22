import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
export class EditProductDialog extends Component {
  
    state = {
    Name: this.props.detailproduct.Name,
    Price: this.props.detailproduct.Price,
    Description: this.props.detailproduct.Desctiption,
    category: null,
    pImage: null,
    imagePreview: false,
    pId:this.props.detailproduct.Id
  };
  componentDidMount(){
   console.log('props',this.props.detailproduct)
  }
  handleChange = (event) => {
    let value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };
  handleCancel = () => {
    this.props.close();
  };
  updateProduct=(e)=>{
    e.preventDefault();
    const { Name, Price, Description, category , pId } = this.state;
    let product = { Name, Price, Description, category , pId };
    axios({
      method:'put',
      url:'/api/catalog_UpdateProduct',
      params:{product},
      header : {
          "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(result => this.setState({
      updatedProduct:result.data
    },()=>{
      this.props.updateProduct(this.state.updatedProduct);
      this.props.close();
    }));
  }
  render() {
    const { Name, Price, Description, category } = this.state;
    return (
      <div>
        <h5 className="text-center">Update Product </h5>
        <Form ref={(el) => (this.productFormRef = el)}>
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Product Name
            </Form.Label>
            <Col sm="9">
              <Form.Control
                placeholder="Product Name"
                name="Name"
                onChange={this.handleChange}
                value={Name}
              />
            </Col>
          </Form.Group>
          {/* <Form.Group as={Row}>
            <Form.Label column sm="3">
              Product Category
            </Form.Label>
            <Col sm="9">
              <Select
                value={this.state.category}
                onChange={this.handleDropDown}
                options={this.state.options}
              />
            </Col>
          </Form.Group> */}
          {/* <Form.Group as={Row} className="d-flex align-items-baseline">
            <Form.Label column sm="3">
              Image of Product
            </Form.Label>
            <Col sm="9">
              <Form.File
                id="fileId"
                onChange={this.onImageChange}
                ref={(ref) => (this.inputRef = ref)}
              />
              <div className="preview-image">
                {this.state.imagePreview && <img src={this.state.pImage} />}
              </div>
            </Col>
          </Form.Group> */}

          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Product Description
            </Form.Label>
            <Col sm="9">
              <Form.Control
                as="textarea"
                name="Description"
                onChange={this.handleChange}
                className="p-desc"
                placeholder="Product Descripion"
                rows="3"
                value={Description}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Product Price
            </Form.Label>
            <Col sm="9">
              <Form.Control
                placeholder="ex:$10"
                name="Price"
                onChange={this.handleChange}
                value={Price}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="3"></Form.Label>
            <Col sm="9">
              <Button
                type="button"
                onClick={this.updateProduct}
                className="mr-2"
              >
                Update
              </Button>
              <Button type="button" onClick={this.handleCancel}>
                Cancel
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default EditProductDialog;
