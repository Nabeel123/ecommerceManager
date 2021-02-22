import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./AddProductDialog.css";
import Select from "react-select";
import axios from "axios";

class AddProductDialog extends Component {
  state = {
    Name: "",
    Price: "",
    Description: "",
    category: null,
    pImage: null,
    newImage: null,
    imagePreview: false,
    options: this.props.allCategory,
    errors: {
      Name: "",
      Price: "",
      Description: "",
    },
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "Name":
        errors.Name =
          value.length < 5 ? "Product Name must be 5 characters long!" : "";
        break;
      case "Price":
        errors.Price =
          value.length < 0 ? "Price must be greater than zero!" : "";
        break;
      case "Description":
        errors.Description =
          value.length < 10
            ? "Description must be greater than 10 Character!"
            : "";
        break;
      default:
        break;
    }
    this.setState(
      {
        ...this.state,
        errors,
        [name]: value,
      },
      () => {
        console.log(errors);
      }
    );
  };
  uploadImage = () => {
    const formData = new FormData();
    formData.append("image", this.state.newImage);
    return axios.post("api/shopify_image_upload", formData, {});
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { Name, Price, Description, category } = this.state;
    const value = await this.uploadImage();
    if (value.data.imageUrl) {
      this.setState(
        {
          pImage: value.data.imageUrl,
        },
        () => {
          let pImage = this.state.pImage;
          let product = { Name, Price, Description, category, pImage };
          if (this.validateForm(this.state.errors)) {
            console.info("Valid Form");
            this.props.handleProduct(product);
          } else {
            console.log("Invalid Form");
          }
        }
      );
    } else {
      console.log("image upload err");
    }

    // this.props.updateProduct(product)
    this.props.close();
  };
  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let image = event.target.files[0];
      console.log("image", image);
      this.setState({
        newImage: event.target.files[0],
        // imagePreview: true,
      });
    }
  };
  handleDropDown = (selectedOpt) => {
    this.setState({
      category: selectedOpt,
    });
  };
  handleClear = () => {
    this.productFormRef.reset();
    this.inputRef.value = "";
    this.setState({
      imagePreview: false,
    });
  };
  handleCancel = () => {
    this.props.close();
  };
  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  render() {
    const { Name, Price, Description, category, errors, pImage } = this.state;
    return (
      <div className="p-0">
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
              {errors.Name.length > 0 && (
                <span className="error">{errors.Name}</span>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
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
          </Form.Group>
          <Form.Group as={Row} className="d-flex align-items-baseline">
            <Form.Label column sm="3">
              Image of Product
            </Form.Label>
            <Col sm="9">
              <Form.File
                id="fileId"
                name="file"
                onChange={this.onImageChange}
                ref={(ref) => (this.inputRef = ref)}
              />
              {/* <div className="preview-image">
                {this.state.imagePreview && <img src={this.state.pImage} />}
              </div> */}
            </Col>
          </Form.Group>

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
              {errors.Description.length > 10 && (
                <span className="error">{errors.Description}</span>
              )}
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
              {errors.Price.length > 0 && (
                <span className="error">{errors.Price}</span>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="3"></Form.Label>
            <Col sm="9">
              <Button
                type="button"
                onClick={this.handleSubmit}
                className="mr-2"
              >
                Add Product
              </Button>
              <Button type="button" onClick={this.handleClear} className="mr-2">
                Clear
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

export default AddProductDialog;
