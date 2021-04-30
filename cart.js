const express = require("express");
const cart = express.Router();

cart.use(express.json());

items = [
  {
    id: "Coke",
    product: "Coke",
    price: 1.25,
    quantity: 5,
  },
  {
    id: "Hat",
    product: "Hat",
    price: 17,
    quantity: 3,
  },
  {
    id: "Watch",
    product: "Watch",
    price: 220,
    quantity: 1,
  },
  {
    id: "Coke",
    product: "Coke",
    price: 1.25,
    quantity: 5,
  },
];

cart.get("/cart-items", (req, res) => {
  res.json(items);
});

cart.get("/cart/:id", (req, res) => {
  console.log(req.params.id);
  res.json("Getting a student..");
});

cart.post("/cart", (req, res) => {
  console.log(req.body);

  res.json("Adding a students..");
});

cart.put("/cart", (req, res) => {
  res.json("Updating students..");
});

cart.delete("/cart", (req, res) => {
  res.json("Deleting a students..");
});

cart.get("/search", (req, res) => {
  console.log(req.query.keyword);
  res.json("Search Results");
});

module.exports = cart;
