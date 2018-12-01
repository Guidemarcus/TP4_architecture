const express = require("express");
const router = express.Router();
var db = require('../lib/db.js');
var Product = db.productModel;
var Order = db.orderModel;

router.get("/", (req, res) => {
  var cartItemsCount = 0;
  if (req.session.shoppingCart !== undefined)
  {
    cartItemsCount = req.session.shoppingCart.length;
  }

  res.render("index", { title: "OnlineShop - Accueil", message: "Ça semble fonctionner!", cartItemsCount: cartItemsCount });
});

router.get("/accueil", (req, res) => {

  var cartItemsCount = 0;
  if (req.session.shoppingCart !== undefined)
  {
    cartItemsCount = req.session.shoppingCart.length;
  }

  res.render("index", { title: "OnlineShop - Accueil", message: "Ça semble fonctionner!", cartItemsCount: cartItemsCount });
});

router.get("/produits", (req, res) => {
  getDefaultProducts().then(function(productsRes) {
    
    sortProducts(productsRes, "price-asc");

    var cartItemsCount = 0;
    if (req.session.shoppingCart !== undefined)
    {
      cartItemsCount = req.session.shoppingCart.length;
    }

    res.render("products", { title: "OnlineShop - Produits", message: "Ça semble fonctionner!", products: productsRes,
         cartItemsCount: cartItemsCount});
  });
  
  
});

router.get("/produits/:id", (req, res) => {
  const id = parseInt(req.params.id);
  getProduct(id).then(function(prodRes) {

    var cartItemsCount = 0;
    if (req.session.shoppingCart !== undefined)
    {
      cartItemsCount = req.session.shoppingCart.length;
    }

    res.render("product", { title: "OnlineShop - Produit", message: "Ça semble fonctionner!", product: prodRes[0], 
      cartItemsCount});
  })
});

router.get("/contact", (req, res) => {
  var cartItemsCount = 0;
  if (req.session.shoppingCart !== undefined)
  {
    cartItemsCount = req.session.shoppingCart.length;
  }

  res.render("contact", { title: "OnlineShop - Contact", message: "Ça semble fonctionner!", cartItemsCount: cartItemsCount});
});

router.get("/panier", (req, res) => {
   if (req.session.shoppingCart == undefined)
  {
    req.session.shoppingCart = [];
  }
  console.log("AAaAAAAAAAAAAAAAAAAAAAAA");
  var shoppingCart = req.session.shoppingCart;
  console.log(shoppingCart);
  for(var i = 0; i < shoppingCart.length; i++)
  {
    getDefaultProducts().then(function(productsList) {
      var total = 0;
      for(var j = 0; j < shoppingCart.length; j++)
      {
          for(var k = 0; k < productsList.length; k++)
          {
            if(shoppingCart[j].productId == productsList[k].id)
            {
              shoppingCart[j].price = productsList[k].price;
              total += (shoppingCart[j].price * shoppingCart[j].quantity);
            }
          }
      }
      shoppingCart.total = total;
      if(shoppingCart === undefined || shoppingCart === null)
        shoppingCart = []
      
      res.render("shopping-cart", { title: "OnlineShop - Panier", shoppingCart: shoppingCart, cartItemsCount: shoppingCart.length});
    });
  }

  if(shoppingCart.length === 0)
    res.render("shopping-cart", { title: "OnlineShop - Panier", shoppingCart: shoppingCart, cartItemsCount: shoppingCart.length});

});

router.get("/commande", (req, res) => {
  var cartItemsCount = 0;
  if (req.session.shoppingCart !== undefined)
  {
    cartItemsCount = req.session.shoppingCart.length;
  }

  res.render("order", { title: "OnlineShop - Commande", message: "Ça semble fonctionner!", cartItemsCount : cartItemsCount});
});

router.get("/confirmation", (req, res) => {
  getAllOrders().then(function(orders){
    
    var cartItemsCount = 0;
    if (req.session.shoppingCart !== undefined)
    {
      cartItemsCount = req.session.shoppingCart.length;
    }

    res.render("confirmation", { title: "OnlineShop - Confirmation", order: orders[orders.length - 1], cartItemsCount: cartItemsCount});
  }
  );
  
});



function getDefaultProducts() {
    var res = [];

    return Product.find({}, function (err, products) { 
        
    });
}

function getProduct(id)
{
    return Product.find({id: id}, function (err, products) { 
        
    });
}

function sortProducts(list, sort) {
    if(list && list.length > 1) {
      switch (sort) {
        case "alpha-asc":
          return sortJSON(list, "name", "asc");
        case "alpha-dsc":
          return sortJSON(list, "name", "dsc");
        case "price-asc":
          return sortJSON(list, "price", "asc");
        case "price-dsc":
          return sortJSON(list, "price", "dsc");
        case undefined :
        case "" :
        default :
          return sortJSON(list, "price", "asc");
      }
    }
    return list;
}

function sortJSON(products, sort, orderBy) {
    products = products.sort(function(a, b) {
      if (orderBy === undefined || orderBy === "asc") {
        if(typeof(a[sort]) === "string") {
          return (a[sort].toLowerCase() > b[sort].toLowerCase()) ? 1 : ((a[sort].toLowerCase() < b[sort].toLowerCase()) ? -1 : 0);
        }
        return (a[sort] > b[sort]) ? 1 : ((a[sort] < b[sort]) ? -1 : 0);
      } else if(orderBy === "dsc") {
        if(typeof(a[sort]) === "string") {
          return (b[sort].toLowerCase() > a[sort].toLowerCase()) ? 1 : ((b[sort].toLowerCase() < a[sort].toLowerCase()) ? -1 : 0);
        }
        return (b[sort] > a[sort]) ? 1 : ((b[sort] < a[sort]) ? -1 : 0);
      }
    });
    return products;
}

function getAllOrders(){
  return Order.find({}, function(err, allOrders)
    {
    });
}


module.exports = router;
