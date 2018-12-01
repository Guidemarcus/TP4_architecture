const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Bill = mongoose.model("Bill");

// Gets all the bills in the database.
router.get("/api/bills", (req, res) => {
  Bill.find({}, (err, allBills) =>
    {
        if (err) { res.status(500);};

        res.status(200).json(allBills);
    });
});

// Gets the bill associated with the specified ID.
router.get("/api/bills/:id", (req, res) => {
  var param = parseInt(req.params.id);

    Bill.find({ id : param}, function(err, bill)
    {
        if (err) { res.status(500);};
        
        if(bill === undefined || bill === null || bill.length === 0)
        {
            res.status(404).send("Bill not found in DB");
            return;
        }
        else{
            res.status(200).json(bill[0]);
        }
    });
});

// Adds a new bill in the database.
router.post("/api/post/bills", (req, res) => {
  var bill = {
    id: req.body.id,
    products: req.body.products,
    totalPrice: req.body.totalPrice
  };


  Bill.create(bill, function (err, bill) {
    if (err) {res.status(500).send("Could not create bill, may already be in DB"); return;}

    res.status(201).send("Bill created successfully");  
  });

});

// Deletes the bill associated with the specified ID in the database.
router.delete("/api/bills/:id", (req, res) => {
  var param = parseInt(req.params.id);

    Bill.findOneAndRemove({id: param}, function(err, doc)
    {
        if (err) { res.status(404).send("Bill not found in DB");};

        res.status(204).send("Bill successfully deleted from DB");
    });
});

// Deletes all the bills in the database.
router.delete("/api/bills", (req, res) => {
  Bill.remove({}, function(err, doc)
    {
        if (err) { res.status(500);};

        res.status(204).send("All bills succesfully deleted from DB");
    });
});

module.exports = router;
