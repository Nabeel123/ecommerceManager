import React, { Component } from "react";
import Notifications from "../Notifications/Notifications";
import PlatformHeader from "../Publisher/PlatformHeader/PlatformHeader";
import StoreSidebar from "../Publisher/StoreSidebar/StoreSidebar";
import AddWooCategory from "./WooCategories/AddWooCategory";
import WooCategories from "./WooCategories/WooCategories";
import ShopifyCategories from "./ShopifyCategories/ShopifyCategories";
import AddShopifyCategory from "./ShopifyCategories/AddShopifyCategory";
import { Woo_ConnectedStores } from "../../helpers/WooCommerce/WooApiCalls";
import WooCatSidebar from "./WooCategories/WooCatSidebar";
import { shopify_ConnectedStores } from "../../helpers/Shopify/ShopifyApiCalls";
import ShopifySidebar from "../ProductsPage/ShopifyProducts/ShopifySidebar";
import ShopifyCatSidebar from "./ShopifyCategories/ShopifyCatSidebar";
import { platformarray } from "../../helpers/html-utils";
const axios = require("axios").default;

class CategoryPage extends Component {
  constructor() {
    super();
    this.state = {
      UserData: JSON.parse(localStorage.getItem("user")),
      platform: "WooCommerce",
      categories: [],
      shopifyCategories: [],
      woconnected: [],
      shopifyconnected: [],
      store: "",
      sp_store: "",
    };
  }

  componentDidMount() {
    const params = {
      user_id: this.state.UserData.user_id,
    };
    if (this.state.platform === "WooCommerce") {
      this.fetchCategories();
      Woo_ConnectedStores(params).then((stores) => {
        this.setState({ woconnected: stores });
      });
    }
  }

  fetchCategories = (name, id) => {
    axios
      .request({
        method: "get",
        url: "/api/fetch_wp_categories",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          name: name,
          id: id,
          user_id: this.state.UserData.user_id,
        },
      })
      .then((res) => res.data)
      .then((categories) =>
        this.setState(
          { categories: categories.categories, store: categories.store },
          () => console.log("categories Fetched ....", categories.categories)
        )
      );
  };

  shopify_fetchCategories = (name, id) => {
    axios
      .request({
        method: "get",
        url: "/api/shopify_fetchCategories",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          name: name,
          id: id,
          user_id: this.state.UserData.user_id,
        },
      })
      .then((res) => res.data)
      .then((shopifyCategories) =>
        this.setState(
          {
            shopifyCategories: shopifyCategories.products,
            sp_store: shopifyCategories.store,
          },
          () => console.log("categories Fetched ....", shopifyCategories)
        )
      );
  };

  shopify_ConnectedStores = () => {
    const params = {
      user_id: this.state.UserData.user_id,
    };
    shopify_ConnectedStores(params).then((stores) => {
      this.setState({ shopifyconnected: stores });
    });
  };

  PlatformChange = (title) => {
    this.setState({ platform: title }, () => {
      if (this.state.platform === "WooCommerce") {
        this.fetchCategories();
      } else if (this.state.platform === "Shopify") {
        this.shopify_ConnectedStores();
        this.shopify_fetchCategories();
      }
    });
  };

  render() {
    return (
      <div className="row mt-3">
        <div className="col-md-10">
          <div className="bg-white ml-2 row">
            <ul className="connectheadermain col-md-12">
              {platformarray.map((platform, i) => (
                <PlatformHeader
                  key={i}
                  id={platformarray[i].id}
                  title={platformarray[i].title}
                  icon={platformarray[i].icon}
                  PlatformChange={this.PlatformChange}
                />
              ))}
            </ul>
          </div>

          <div className="mt-3 ml-2 row">
            {this.state.platform === "WooCommerce" && (
              <div className="UserHeading col-md-3">
                <p className="selectstore">Connected Stores</p>

                {(!this.state.woconnected || this.state.woconnected <= 0) && (
                  <div>No Store</div>
                )}

                {this.state.woconnected &&
                  this.state.woconnected.length > 0 &&
                  this.state.woconnected.map((woconnected, i) => (
                    <WooCatSidebar
                      key={i}
                      id={woconnected.id}
                      storename={woconnected.store_url}
                      fetchCategories={this.fetchCategories}
                    />
                  ))}
              </div>
            )}

            {this.state.platform === "Shopify" && (
              <div className="UserHeading col-md-3">
                <p className="selectstore">Connected Stores</p>

                {(!this.state.shopifyconnected ||
                  this.state.shopifyconnected <= 0) && <div>No Store</div>}

                {this.state.shopifyconnected &&
                  this.state.shopifyconnected.length > 0 &&
                  this.state.shopifyconnected.map((shopifyconnected, i) => (
                    <ShopifyCatSidebar
                      key={i}
                      id={shopifyconnected.id}
                      storename={shopifyconnected.shop_name}
                      ShopifyfetchCategories={this.shopify_fetchCategories}
                    />
                  ))}
              </div>
            )}

            <div className="UserHeading col-md-9">
              {this.state.platform === "Shopify" && (
                <h5>Categories for {this.state.sp_store} Store</h5>
              )}
              {this.state.platform === "WooCommerce" && (
                <h5>Categories for {this.state.platform} Store</h5>
              )}
              {(this.state.platform == "Amazon" ||
                this.state.platform == "Ebay" ||
                this.state.platform == "Magento" ||
                this.state.platform == "Ali Express") && (
                <div>
                  <h1 className="h1-coming">Coming Soon....</h1>
                </div>
              )}

              {this.state.platform === "WooCommerce" && (
                <div className="row">
                  <div className="col-md-7">
                    <div className="row">
                      {this.state.categories.map((categories, i) => (
                        <WooCategories
                          key={i}
                          id={this.state.categories[i].id}
                          title={this.state.categories[i].name}
                          products={this.state.categories[i].count}
                          fetchCategories={this.fetchCategories}
                          store={this.state.store}
                          user_id={this.state.UserData.user_id}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="col-md-5">
                    <AddWooCategory
                      fetchCategories={this.fetchCategories}
                      store={this.state.store}
                      user_id={this.state.UserData.user_id}
                    />
                  </div>
                </div>
              )}

              {this.state.platform === "Shopify" && (
                <div className="row">
                  <div className="col-md-7">
                    <div className="row">
                      {this.state.shopifyCategories.map(
                        (shopifyCategories, i) => (
                          <ShopifyCategories
                            key={i}
                            id={this.state.shopifyCategories[i].id}
                            title={this.state.shopifyCategories[i].handle}
                            image={this.state.shopifyCategories[i].image}
                            // products={this.state.shopifyCategories[i].count}
                            fetchCategories={this.shopify_fetchCategories}
                            sp_store={this.state.sp_store}
                            user_id={this.state.UserData.user_id}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="col-md-5">
                    <AddShopifyCategory
                      fetchCategories={this.shopify_fetchCategories}
                      sp_store={this.state.sp_store}
                      user_id={this.state.UserData.user_id}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <Notifications />
        </div>
      </div>
    );
  }
}

export default CategoryPage;
