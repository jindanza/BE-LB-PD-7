module.exports = (app) => {
    const product = require("../controllers/product.controller");
  
    let router = require("express").Router();
  
    // create
    router.post("/", product.create);
  
    // findAll
    router.get("/", product.findAll);
  
    // findone
    router.get("/:id", product.findOne);
  
    // update
    router.put("/:id", product.update);
  
    // delete by id
    router.delete("/:id", product.delete);
  
    // delete all
    router.delete("/", product.deleteAll);
  
    app.use("/api/products", router);
  };