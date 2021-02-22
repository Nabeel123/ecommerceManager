import React, { Component } from "react";
import Notifications from "../Notifications/Notifications";
import PlatformHeader from "../Publisher/PlatformHeader/PlatformHeader";
import StoreSidebar from "../Publisher/StoreSidebar/StoreSidebar";
import AddProductDialog from "./AddProduct/AddProductDialog";
import { Modal, Button, Card, Row, Col, Form } from "react-bootstrap";
import "./CatalogPage.css";
import axios from "axios";
import DetailProduct from "./DetailProduct/DetailProduct";
import { withRouter } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { confirmAlert } from "react-confirm-alert";
import ShowToast from "../Toast/ShowToast";
import PublishProduct from "../CatalogPage/PublishProduct/PublishProduct";
class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      products: [],
      product: "",
      cetegoryShow: false,
      isbulkPublish: false,
      isDetailClick: false,
      addCategory: "",
      _allCategory: [],
      detailproduct: "",
      isUpdateClick: false,
      id: null,
      isNewCategoryClick: false,
      ispublish: false,
      isloading: true,
    };
  }
  componentDidMount() {
    this.getAllCatalogProduct();
    this.getAllCategory();
  }
  removeCatlogCat = () => {
    console.log("yes");
  };
  closeDetail = () => {
    this.setState({
      isDetailClick: false,
    });
  };

  getAllCategory = async () => {
    let newResult = [];
    let res = await axios.get("/api/catalog_getAllCategory");
    let result =
      (res.data &&
        res.data.forEach((item) => {
          // console.log(item);
          let cate = { value: item.Name, label: item.Name, id: item.Id };
          newResult.push(cate);
        })) ||
      [];
    this.setState({
      ...this.state,
      _allCategory: newResult,
    });
  };
  productDialog = () => {
    this.setState((prevState) => {
      return {
        ...this.state,
        show: !prevState.show,
      };
    });
  };
  categoryDialog = () => {
    this.setState((prevState) => {
      return {
        cetegoryShow: !prevState.cetegoryShow,
        isNewCategoryClick: false,
      };
    });
  };
  handleProduct = (p) => {
    this.setState(
      {
        ...this.state,
        product: p,
      },
      () => {
        this.createProduct(p);
      }
    );
  };
  handleDetailProduct = (id) => {
    this.getOneProduct(id);
    // this.props.history.push('/detail')
    this.setState({
      isDetailClick: true,
    });
  };
  getAllCatalogProduct = async () => {
    let result = await axios.get("/api/catalog_fetchProducts");
    this.setState({
      products: result.data,
    });
    console.log("all products", this.state.products);
  };
  handleCheckBox = (event) => {
    if (event.target.checked) {
      this.setState({
        isbulkPublish: true,
      });
    } else {
      this.setState({
        isbulkPublish: false,
      });
    }
  };
  handleOnChange = (event) => {
    this.setState({
      addCategory: event.target.value,
    });
  };
  addCategory = () => {
    const { addCategory } = this.state;
    let category = { value: addCategory, label: addCategory };
    axios({
      method: "post",
      url: "/api/catalog_addCategory",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: { category },
    }).then((result) => {
      console.log("result.data", result.data);
      let newitem = [];
      result.data.forEach((item) => {
        let cate = { value: item.Name, label: item.Name };
        newitem.push(cate);
      });
      this.setState({
        ...this.state,
        _allCategory: this.state._allCategory.concat(newitem),
      });
    });
    this.addNewCategory();
  };
  createProduct = (newP) => {
    const product = newP;
    axios({
      method: "post",
      url: "/api/catalog_addProducts",
      params: { product },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((result) => {
      console.log("result.data", result.data);
      this.setState({
        ...this.state,
        products: this.state.products.concat(result.data),
      });
    });
  };
  getOneProduct = (id) => {
    return axios
      .get("/api/getOneProduct", {
        params: {
          id,
        },
      })
      .then((response) => {
        let res = response.data[0];
        this.setState({
          ...this.state,
          detailproduct: res,
        });
      })
      .catch(function (error) {});
  };
  deleteOneProduct = (id) => {
    confirmAlert({
      title: "Are you Sure ?",
      message: "You want to delete this item",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const res = await axios.delete(
              "/api/deleteOneProduct",
              {
                params: {
                  id,
                },
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );
            let product = this.state.products;
            let newItem = product.filter((item) => {
              return item.Id !== id;
            });
            this.setState({
              ...this.state,
              products: newItem,
            });
            return res.data;
          },
        },
        {
          label: "No",
          onClick: () => console.log("ok"),
        },
      ],
    });
  };

  addNewCategory = () => {
    this.setState((prevState) => {
      return {
        isNewCategoryClick: !prevState.isNewCategoryClick,
      };
    });
  };

  handlePublish = (id) => {
    this.getOneProduct(id);
    this.setState((prevState) => {
      return {
        ispublish: !prevState.ispublish,
      };
    });
  };

  render() {
    const {
      show,
      cetegoryShow,
      isDetailClick,
      products,
      detailproduct,
    } = this.state;
    return (
      <div className="row">
        <div className="UserHeading col-md-10">
          {isDetailClick ? (
            <DetailProduct
              detailproduct={detailproduct}
              closeDetail={this.closeDetail}
            />
          ) : (
            <>
              <div className="mt-2">
                {/* <AddProductDialog /> */}
                <Button
                  variant="link"
                  className="mr-2"
                  onClick={this.categoryDialog}
                >
                  Add Category
                </Button>
                <Button variant="link" onClick={this.productDialog}>
                  Add Product
                </Button>
                {this.state.isbulkPublish && <span>Bulk Publish </span>}
              </div>
              <div>
                {show && (
                  <Modal
                    show={show}
                    size="lg"
                    onHide={this.productDialog}
                    backdrop="static"
                  >
                    <Modal.Header closeButton>
                      <h5>Add Product</h5>
                    </Modal.Header>
                    <AddProductDialog
                      close={this.productDialog}
                      handleProduct={this.handleProduct}
                      allCategory={this.state._allCategory}
                      updateProduct={this.updateOneProduct}
                      // btnText={this.state.isUpdateClick ? "Update" : "Add Product"}
                    />
                  </Modal>
                )}
              </div>
              <div className="d-flex mt-3 flex-wrap">
                {this.state.products.length > 0 &&
                  this.state.products.map((elem, index) => (
                    <Card
                      className="card-main mt-2 mb-2"
                      style={{ width: "12rem", marginRight: "10px" }}
                      key={index}
                    >
                      <Card.Img
                        style={{ height: "10rem" }}
                        variant="top"
                        src={
                          elem.Image
                            ? elem.Image
                            : "https://cdn.dribbble.com/users/2185384/screenshots/6530153/600__20__2x.jpg"
                        }
                      />
                      <hr className="m-0" />
                      <Card.Body>
                        <Card.Title className=" p-title d-flex justify-content-between">
                          {elem.Name}
                          <span>{`$${elem.Price}`}</span>
                        </Card.Title>
                        <Card.Text className="p-desc">
                          {elem.Desctiption.length > 25
                            ? elem.Desctiption.slice(0, 25) + "..."
                            : elem.Desctiption}
                        </Card.Text>
                        <div className="p-detail">
                          <span
                            onClick={this.handleDetailProduct.bind(
                              this,
                              elem.Id
                            )}
                          >
                            <FontAwesome name="edit" size="1x" />
                          </span>
                          <span
                            onClick={this.deleteOneProduct.bind(this, elem.Id)}
                          >
                            <FontAwesome name="trash" size="1x" />
                          </span>
                          <span
                            onClick={this.handlePublish.bind(this, elem.Id)}
                          >
                            <FontAwesome name="cloud-upload" size="1x" />
                          </span>
                          <Form.Check
                            type="checkbox"
                            onChange={this.handleCheckBox}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
              </div>
              <div className="category-modal-main">
                {cetegoryShow && (
                  <Modal
                    show={cetegoryShow}
                    size="md"
                    onHide={this.categoryDialog}
                    backdrop="static"
                  >
                    <Modal.Header closeButton>
                      <h5>Categories List</h5>
                    </Modal.Header>
                    <div className="mt-2 mb-2">
                      {this.state._allCategory?.length > 0 ? (
                        this.state._allCategory.map((elem, index) => (
                          <div className="StoresList mt-3" key={index}>
                            <div>{elem.label}</div>
                            <div className="catlogCatTrash">
                              <span
                                onClick={this.removeCatlogCat.bind(
                                  this,
                                  elem.label,
                                  elem.id
                                )}
                              >
                                <FontAwesome name="trash" size="1x" />
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <span style={{ color: "red" }}>
                          No categories available
                        </span>
                      )}
                    </div>
                    <Button variant="secondary" onClick={this.addNewCategory}>
                      Add New Category
                    </Button>

                    {this.state.isNewCategoryClick && (
                      <>
                        <input
                          type="text"
                          className="form-control pb-2 mb-2"
                          placeholder="Category Name"
                          onChange={this.handleOnChange}
                        />
                        <div className="p-0">
                          <Button onClick={this.addCategory}>Add</Button>
                          <Button
                            onClick={this.addNewCategory}
                            className="ml-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    )}
                  </Modal>
                )}
                {this.state.ispublish && (
                  <Modal
                    show={this.state.ispublish}
                    close={this.handlePublish}
                    size="lg"
                  >
                    <PublishProduct
                      close={this.handlePublish}
                      detailproduct={detailproduct}
                    />
                  </Modal>
                )}
              </div>
            </>
          )}
        </div>
        <div className="col-md-2">
          <Notifications />
          <ShowToast />
        </div>
      </div>
    );
  }
}

export default withRouter(ProductPage);
