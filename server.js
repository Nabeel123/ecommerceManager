const express = require("express");
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const woo_routes = require("./server-routes/woo-commerce");
const shopify_routes = require("./server-routes/Shopify");
const dashboard_routes = require("./server-routes/dashboard");
const user_routes = require("./server-routes/user-account");
const db_routes = require("./server-routes/database");
const catalog_routes = require("./server-routes/catalog");
const restWooCommerce = require("./server-routes/rest-woo-commerce");
const restEbay = require("./server-routes/rest-ebay");
const restCatalog = require("./server-routes/rest-catalog");
const restShopify = require("./server-routes/rest-shopify");
const handleErrors = require("./helpers/handleErrors");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));

// USER ACCOUNTS
app.post("/api/userLogin", user_routes.userLogin);

//DATABASE
app.get("/api/mysql", db_routes.store_connect);

// WooCommerce ROUTES
app.post("/api/connectstore", woo_routes.woo_connectStore);
app.post("/api/add_products", woo_routes.woo_addProducts);
app.post("/api/update_wc_products", woo_routes.woo_updateProducts);
app.post("/api/add_categories_wc", woo_routes.woo_createCategories);
app.post("/api/delete_wp_products", woo_routes.woo_deleteProducts);
app.post("/api/delete_wp_categories", woo_routes.woo_deleteCategories);
app.post("/api/update_wc_categories", woo_routes.update_wc_categories);
app.post("/api/woo_updatestore", woo_routes.woo_updatestore);
// app.get('/api/woocommerce', woo_routes.woo_woocommerce);
app.get("/api/fetch_wp_products", woo_routes.woo_fetchProducts);
app.get("/api/fetch_wp_categories", woo_routes.woo_fetchCategories);
app.get("/api/woo_ConnectedStores", woo_routes.woo_ConnectedStores);
app.get(
  "/api/woo_Delete_ConnectedStores",
  woo_routes.woo_Delete_ConnectedStores
);
app.post("/api/woo_image_upload", woo_routes.image_upload);
app.get("/api/woo_orders", woo_routes.woo_orders);
// app.get("/api/woo_sales_report", woo_routes.woo_sales_report);

//Shopify ROUTES
app.get("/api/shopify_connect", shopify_routes.shopify_connect);
app.post("/api/shopify_fetchProducts", shopify_routes.shopify_fetchProducts);
app.post("/api/shopify_addProducts", shopify_routes.shopify_addProducts);
app.get("/api/shopify_addProducts", shopify_routes.shopify_addProducts);
app.post("/api/shopify_deleteProducts", shopify_routes.shopify_deleteProducts);
app.post(
  "/api/update_shopify_products",
  shopify_routes.update_shopify_products
);
app.get(
  "/api/shopify_deleteCategories",
  shopify_routes.shopify_deleteCategories
);
app.get(
  "/api/shopify_UpdateCategories",
  shopify_routes.shopify_UpdateCategories
);
app.get("/api/shopify_fetchCategories", shopify_routes.shopify_fetchCategories);
app.get("/api/shopify_addCat", shopify_routes.shopify_addCat);
app.get("/api/shopify_ConnectedStores", shopify_routes.shopify_ConnectedStores);
app.get("/api/shopify_update_store", shopify_routes.shopify_update_store);
app.get(
  "/api/shopify_Delete_ConnectedStores",
  shopify_routes.shopify_Delete_ConnectedStores
);
app.post("/api/shopify_image_upload", shopify_routes.image_upload);

// Catalog routes
app.get("/api/catalog_fetchProducts", catalog_routes.catalog_fetchProducts);
app.get("/api/getOneProduct", catalog_routes.catalog_getOneProduct);
app.delete("/api/deleteOneProduct", catalog_routes.catalog_deleteOneProduct);
app.post("/api/catalog_addProducts", catalog_routes.catalog_addProducts);
app.put("/api/catalog_UpdateProduct", catalog_routes.catalog_UpdateProduct);

app.post("/api/catalog_addCategory", catalog_routes.catalog_addCategory);
app.get("/api/catalog_getAllCategory", catalog_routes.catalog_getAllCategory);
// app.get("/api/shopify_orders", shopify_routes.shopify_orders);

//Dashboard Routes
app.get("/api/report_orders", dashboard_routes.report_orders);
app.get("/api/detailed_orders", dashboard_routes.detailed_orders);
app.get("/api/connected_stores", dashboard_routes.connected_stores);
app.get("/api/sales_report", dashboard_routes.sales_report);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

// Ebay routes

//-------------- REST BASED ------------------//

app.use("/api/woo", restWooCommerce);
app.use("/api/ebay", restEbay);
app.use("/api/shopify", restShopify);
app.use("/api/catalog", restCatalog);
app.use(handleErrors);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
