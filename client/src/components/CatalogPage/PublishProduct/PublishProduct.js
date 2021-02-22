import React, { Component } from "react";
import { Button, Row, Col } from "react-bootstrap";
import "./PublishProduct.css";
import axios from "axios";
import { shopify_ConnectedStores } from "../../../helpers/Shopify/ShopifyApiCalls";
const platformarray = [{ id: 4, title: "Shopify" }];

class PublishProduct extends Component {
  state = {
    isPublish: false,
    currentSelected: null,
    UserData: JSON.parse(localStorage.getItem("user")),
    shopifyStores: [],
    detailProduct: this.props.detailproduct,
    body_html: "",
    storeName: "",
    allStores: [],
    isloading: false,
  };
  filterStore = (arr) => {
    return arr.filter((item) => item.checked === true);
  };
  async handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isloading: true,
    });
    // if (this.state.allStores.length > 0 ) {
    axios
      .request({
        method: "post",
        url: "/api/shopify_addProducts",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          title: this.props.detailproduct.Name,
          price: this.props.detailproduct.Price,
          weight_unit: "kg",
          weight: 1,
          body_html: this.state.body_html,
          store: this.state.allStores,
          user_id: this.state.UserData.user_id,
          image: this.props.detailproduct.Image,
        },
      })
      .then((res) => {
        if (res.data === "success") {
          this.setState(
            {
              isloading: false,
            },
            () => {
              alert("Product Add Successfully");
              this.props.close();
            }
          );
        } else if (res.data === "fail") {
          alert("Product failed to Publish.");
        }
      });
    // } else {
    //   alert("please select store first! ");
    // }
  }
  componentDidMount() {
    this.shopify_ConnectedStores();
  }
  handleCancel = () => {
    this.props.close();
  };
  handlePlatForm = (id) => {
    this.setState({
      isPlatFormClicked: true,
      currentSelected: id,
    });
  };
  shopify_ConnectedStores = () => {
    const params = {
      user_id: this.state.UserData.user_id,
    };
    shopify_ConnectedStores(params).then((stores) =>
      this.setState(
        {
          shopifyStores: stores,
        },
        () => {
          var newStore = [];
          this.state.shopifyStores.forEach((item) => {
            var store = {
              id: item.id,
              user_id: item.user_id,
              storeName: item.shop_name,
              checked: false,
            };
            newStore.push(store);
          });
          this.setState({
            allStores: newStore,
          });
        }
      )
    );
  };
  handleCheckBox = (id, event) => {
    let newItems = this.state.allStores.slice();
    newItems[id].checked = !newItems[id].checked;
    this.setState({
      allStores: newItems,
    });
  };
  render() {
    const { shopifyStores } = this.state;
    return (
      <div>
        <h6 className="text-center">Publish Product</h6>
        <Row>
          <Col md="3">
            <div className="pb-plateform">
              {platformarray.map((elem) => (
                <a
                  className="catalog-publish-store"
                  onClick={this.handlePlatForm.bind(this, elem.id)}
                >
                  {elem.title}
                </a>
              ))}
            </div>
          </Col>
          <Col md="9" className="allStore">
            {shopifyStores.length > 0
              ? shopifyStores.map((elem, index) => (
                  <span className="user-store" key={index}>
                    {elem.shop_name}
                    <input
                      type="checkbox"
                      name="isPublish"
                      onChange={this.handleCheckBox.bind(this, index)}
                    ></input>
                  </span>
                ))
              : "User Do not have Any Store Yet ! "}
          </Col>
        </Row>
        <div className="text-center mt-2">
          <Button onClick={this.handleSubmit.bind(this)}>Publish</Button>
          <Button onClick={this.handleCancel} className="ml-2">
            Cancel
          </Button>
        </div>
        <div className="text-center">
          {this.state.isloading && <span>publish processing ...</span>}
        </div>
      </div>
    );
  }
}
export default PublishProduct;
