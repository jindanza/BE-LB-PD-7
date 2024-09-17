const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;
const multer = require("multer");

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create a new product
exports.create = (req, res) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({
        message: "Multer Error: " + err.message,
        code: 400,
        data: null,
      });
    } else if (err) {
      return res.status(500).send({
        message: "Error while uploading the image: " + err.message,
        code: 500,
        data: null,
      });
    }

    if (!req.body.store_name || !req.body.product_name || !req.body.price) {
      return res.status(400).send({
        message: "Required fields must not be empty",
        code: 400,
        data: null,
      });
    }

    const product = {
      store_name: req.body.store_name,
      product_name: req.body.product_name,
      category: req.body.category,
      price: req.body.price,
      discount: req.body.discount || 0,
      sold: req.body.sold || 0,
      rating: req.body.rating || 0,
      location: req.body.location || '',
      pre_order: req.body.pre_order || false,
      pdn: req.body.pdn || false,
      pkp: req.body.pkp || false,
      tkdn: req.body.tkdn || 0,
      promo: req.body.promo || false,
      image: req.file ? req.file.path : null,
    };

    Product.create(product)
      .then((data) => {
        res.status(201).send({
          message: "Product created successfully",
          code: 201,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the product.",
          code: 500,
          data: null,
        });
      });
  });
};

// Update an existing product
exports.update = (req, res) => {
  const id = req.params.id;

  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({
        message: "Multer Error: " + err.message,
        code: 400,
        data: null,
      });
    } else if (err) {
      return res.status(500).send({
        message: "Error while uploading the image: " + err.message,
        code: 500,
        data: null,
      });
    }

    const product = {
      store_name: req.body.store_name,
      product_name: req.body.product_name,
      category: req.body.category,
      price: req.body.price,
      discount: req.body.discount,
      sold: req.body.sold,
      rating: req.body.rating,
      location: req.body.location,
      pre_order: req.body.pre_order,
      pdn: req.body.pdn,
      pkp: req.body.pkp,
      tkdn: req.body.tkdn,
      promo: req.body.promo,
    };

    if (req.file) {
      product.image = req.file.path;
    }

    Product.update(product, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.status(200).send({
            message: "Product updated successfully",
            code: 200,
            data: null,
          });
        } else {
          res.status(404).send({
            message: `Cannot update product with id=${id}. Product was not found or request body is empty.`,
            code: 404,
            data: null,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating product with id=" + id,
          code: 500,
          data: null,
        });
      });
  });
};

// Find all products
exports.findAll = (req, res) => {
  const product_name = req.query.product_name;
  let condition = product_name ? { product_name: { [Op.iLike]: `%${product_name}%` } } : null;

  Product.findAll({ where: condition })
    .then((data) => {
      res.status(200).send({
        message: "Products retrieved successfully",
        code: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products.",
        code: 500,
        data: null,
      });
    });
};

// Find one product by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Product retrieved successfully",
          code: 200,
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Product with id=${id} not found`,
          code: 404,
          data: null,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving product with id=" + id,
        code: 500,
        data: null,
      });
    });
};

// Delete a product by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Product deleted successfully!",
          code: 200,
          data: null,
        });
      } else {
        res.status(404).send({
          message: `Cannot delete product with id=${id}. Product not found!`,
          code: 404,
          data: null,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete product with id=" + id,
        code: 500,
        data: null,
      });
    });
};

// Delete all products
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false,
  })
    .then((num) => {
      res.status(200).send({
        message: `${num} products were deleted successfully!`,
        code: 200,
        data: null,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all products.",
        code: 500,
        data: null,
      });
    });
};
