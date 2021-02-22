import React, { Component } from "react";
import Notifications from "../Notifications/Notifications";
import PlatformHeader from "../Publisher/PlatformHeader/PlatformHeader";
import StoreSidebar from "../Publisher/StoreSidebar/StoreSidebar";
import ShopifyForm from "./Form/ShopifyForm";
import EbayForm from "./Form/EbayForm";
import WooConnectForm from "./Form/WooConnectForm";
import { shopify_ConnectedStores } from "../../helpers/Shopify/ShopifyApiCalls";
import { Woo_ConnectedStores } from "../../helpers/WooCommerce/WooApiCalls";
import { platformarray, FormText } from "../../helpers/html-utils";

class Connect extends Component {
  constructor() {
    super();
    this.state = {
      platform: "WooCommerce",
      woconnected: [],
      shopifyconnected: [],
      UserData: JSON.parse(localStorage.getItem("user")),
    };
  }

  PlatformChange = (title) => {
    this.setState({ platform: title }, async () => {
      this.fetchplatformConnectedStores();
    });
  };

  componentDidMount() {
    const params = {
      user_id: this.state.UserData.user_id,
    };
    if (this.state.platform === "WooCommerce") {
      Woo_ConnectedStores(params).then((stores) => {
        this.setState({ woconnected: stores });
      });
    }
  }

  async fetchplatformConnectedStores() {
    const params = {
      user_id: this.state.UserData.user_id,
    };
    if (this.state.platform === "Shopify") {
      const stores = await shopify_ConnectedStores(params);
      this.setState({
        shopifyconnected: stores,
      });
    }
  }

  render() {
    return (
      <div className="row mt-3">
        <div className="col-md-10">
          <div className="bg-white ml-2 row">
            <ul className="connectheadermain col-md-12">
              {platformarray.map((platform, i) => (
                <PlatformHeader
                  key={i}
                  id={[i].platformarrayid}
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
                    <StoreSidebar
                      key={i}
                      id={woconnected.id}
                      storename={woconnected.store_url}
                      fetchProducts={this.fetchCategories}
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
                    <StoreSidebar
                      key={i}
                      id={shopifyconnected.id}
                      storename={shopifyconnected.shop_name}
                      fetchProducts={this.fetchCategories}
                    />
                  ))}
              </div>
            )}

            <div className="UserHeading col-md-9">
              {console.log(this.state.platform)}
              {this.state.platform == "WooCommerce" ||
                this.state.platform == "Shopify" ||
                (this.state.platform == "Ebay" && (
                  <h5>Connect New {this.state.platform} Store</h5>
                ))}
              {FormText.map((form, i) => {
                if (
                  form.title === "WooCommerce" &&
                  this.state.platform === "WooCommerce"
                ) {
                  return <WooConnectForm key={i} />;
                }
                if (
                  form.title === "Shopify" &&
                  this.state.platform === "Shopify"
                ) {
                  return <ShopifyForm key={i} />;
                }
                if (
                  form.title === "Amazon" &&
                  this.state.platform === "Amazon"
                ) {
                  return (
                    <div>
                      <h1 className="h1-coming">Coming Soon....</h1>
                    </div>
                  );
                }
                if (form.title === "Ebay" && this.state.platform === "Ebay") {
                  return <EbayForm key={i} />;
                }
                if (
                  form.title === "Ali Express" &&
                  this.state.platform === "Ali Express"
                ) {
                  return (
                    <div>
                      <h1 className="h1-coming">Coming Soon....</h1>
                    </div>
                  );
                }
                if (
                  form.title === "Magento" &&
                  this.state.platform === "Magento"
                ) {
                  return (
                    <div>
                      <h1 className="h1-coming">Coming Soon....</h1>
                    </div>
                  );
                }
              })}
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

export default Connect;
