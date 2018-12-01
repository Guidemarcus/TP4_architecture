const express = require("express");
const router = express.Router();

// Gets all the products in the database.
router.get("/", (req, res) => {
  const error = it.checkError(category,sort);

    if(!(error === "")) {
      return it.res.status(400).json({ error: error })
    } else {
      var inputs = {};
      if(category !== undefined && category !== '') {
        inputs.category = category;
      }
      Product.find(inputs, function (err, products) {
        if (err) {
          return it.res.status(500).json({ error : err });
        }
        
        if(products === undefined || products === null || products.length === 0)
        {
            var empty = [];
            return it.res.status(200).json(empty);
            
        }

        return it.res.status(200).json(it.sortProducts(products,sort));
      });
    }
});

// Gets the product associated with the specified ID.
router.get("/:id", (req, res) => {
  productsManager.getProduct(req.params.id).done(result => {
    if (result.err) {
      res.status(404).send();
    } else {
      res.json(result.data);
    }
  });
});

// Adds a new product in the database.
router.post("/", (req, res) => {
  productsManager.createProduct(req.body).done(err => {
    if (err) {
      res.status(400).send();
    } else {
      res.status(201).send();
    }
  });
});

// Deletes the product associated with the specified ID in the database.
router.delete("/:id", (req, res) => {
  productsManager.deleteProduct(req.params.id).done(err => {
    if (err) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

// Deletes all the products in the database.
router.delete("/", (req, res) =>  {
  productsManager.deleteProducts().done(() => {
    res.status(204).send();
  });
});











function getAll() {
  var it = this;
  var inputs = {};
  
  Product.find(inputs, function (err, products) {
    if (err) {
      return it.res.status(500).json({ error : err });
    }
    
    if(products === undefined || products === null || products.length === 0)
    {
        var empty = [];
        return it.res.status(200).json(empty);
        
    }

    return it.res.status(200).json(products);
  });
  
}

module.exports = router;
