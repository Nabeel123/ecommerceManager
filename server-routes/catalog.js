const { response } = require("express");

const express = require("express"),
  mysql = require("mysql"),
  multer = require("multer"),
  cors = require("cors"),
  app = express();

app.use(cors());

const con = mysql.createConnection({
  host: "173.212.212.55",
  user: "ecomaver_wp",
  password: "O*cL%FC[zoBG",
  database: "ecomaver_commerce",
});

const catalog_fetchProducts = (_req, _res) => {
  con.connect(function (err) {
    con.query("SELECT * FROM `product` WHERE `User_Id`= 1", (err, result) => {
      if (err) console.log(err);
      _res.json(result);
    });
  });
};

const catalog_addProducts = (_req, _res) => {
  let data = _req.query["product"];
  let newData = JSON.parse(data);
  console.log("newData", newData);
  let status = "Avaiable";

  con.connect(function (error) {
    var sql =
      "INSERT INTO product (`Name`,`Image`,`Price`,`Desctiption`,`Status`,`User_Id`) VALUES ('" +
      newData.Name +
      "' , '" +
      newData.pImage +
      "' , '" +
      newData.Price +
      "' , '" +
      newData.Description +
      "' , '" +
      status +
      "', 1)";
    con.query(sql, (err, result) => {
      if (err) console.log(err.stack);
    });
    var sql1 = "SELECT * FROM product WHERE Id = (SELECT MAX(Id) FROM product)";
    con.query(sql1, (err, result) => {
      if (err) console.log(err.stack);
      let newRes = JSON.parse(JSON.stringify(result));
      _res.json(newRes);
    });
  });
};

const catalog_getOneProduct = (_req, _res) => {
  let pId = _req.query["id"];
  con.connect((error) => {
    let sql = "Select * FROM `product` where `Id`='" + pId + "'";
    try {
      con.query(sql, function (err, result) {
        if (err) console.log(err);
        let newRes = JSON.stringify(result);
        console.log("result", JSON.parse(newRes));
        _res.json(JSON.parse(newRes));
      });
    } catch (err) {
      console.log(err.stack);
    }
  });
};
const catalog_deleteOneProduct = (_req, _res) => {
  let pId = _req.query["id"];
  con.connect((error) => {
    let sql = "DELETE FROM `product` where `Id`='" + pId + "'";
    console.log("sql", sql);
    try {
      con.query(sql, function (err, result) {
        if (err) console.log("server err", err);
        _res.json(JSON.parse(JSON.stringify(result)));
      });
    } catch (err) {
      console.log("server err", err.stack);
    }
  });
};
const catalog_UpdateProduct = (_req, _res) => {
  let data = _req.query["product"];
  let newData = JSON.parse(data);
  con.connect((error) => {
    let sql =
      "UPDATE `product` SET Name = '" +
      newData.Name +
      "', Desctiption = '" +
      newData.Description +
      "', Price = '" +
      newData.Price +
      "' where Id = '" +
      newData.pId +
      "' ";
    try {
      con.query(sql, function (err, result) {
        if (err) console.log("server err", err);
      });
      var sql1 = "SELECT * FROM product WHERE Id = '" + newData.pId + "'";
      console.log("sql1", sql1);
      con.query(sql1, (err, result) => {
        if (err) console.log(err.stack);
        let newRes = JSON.parse(JSON.stringify(result));
        _res.json(newRes);
      });
    } catch (err) {
      console.log("server err", err.stack);
    }
  });
};
const catalog_addCategory = (_req, _res) => {
  let data = _req.query["category"];
  let new_category = JSON.parse(data);
  console.log(new_category.value);
  try {
    con.connect((error) => {
      let sql =
        "INSERT INTO `category` (`Name`) VALUES ('" + new_category.value + "')";
      try {
        con.query(sql, async (err, result) => {
          if (err) console.log(err.stack);
        });
      } catch (e) {
        console.error("err thrown: " + err.stack);
      }
      var sql1 =
        "SELECT * FROM category WHERE Id = (SELECT MAX(Id) FROM category)";
      con.query(sql1, (err, result) => {
        if (err) console.log(err.stack);
        let newRes = JSON.parse(JSON.stringify(result));
        _res.json(newRes);
      });
    });
  } catch (err) {
    result = false;
  }
};
const catalog_getAllCategory = (_req, _res) => {
  con.connect(function (err) {
    con.query("SELECT * FROM `category`", (err, result) => {
      if (err) console.log(err);
      _res.json(result);
    });
  });
};
module.exports = {
  catalog_fetchProducts,
  catalog_addProducts,
  catalog_deleteOneProduct,
  catalog_getOneProduct,
  catalog_UpdateProduct,
  catalog_addCategory,
  catalog_getAllCategory,
};
