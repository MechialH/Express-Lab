const express = require("express");
const cart = express.Router();

cart.use(express.json());

items = [
  {
    id: 1,
    product: "Coke",
    price: 1.25,
    quantity: 5
  },
  {
    id: 2,
    product: "Hat",
    price: 17,
    quantity: 3
  },
  {
    id: 3,
    product: "Watch",
    price: 220,
    quantity: 1
  },
  {
    id: 4,
    product: "Cheetos",
    price: .59,
    quantity: 3
  },
];

cart.get("/cart-items", (req, res) => {
  res.json(items);
});

cart.get("/cart-items/:id", (req, res) => {
  console.log(req.params.id);
  res.json(items.find((item) =>{
    return +req.params.id === item.id
  }))
});

cart.post("/cart-items", (req, res) => {
  console.log(req.body);
  items.push(req.body)
  
  items[items.length-1].id = items.length
  console.log(items)
  res.json(items.find((item)=>{
    return items.length === item.id
  }));
  
});

cart.put("/cart-items/:id", (req, res) => {
  for (let item of items){
    if(item.id === +req.params.id){
      item.product = req.body.product
      item.price = req.body.price
      item.quantity = req.body.quantity
    }
  }
  res.json(items.find((item) =>{
    return +req.params.id === item.id
  }))
});

cart.delete("/cart-items/:id", (req, res) => {
  for(let item of items){
    if (+req.params.id === item.id){
      console.log(item)
      items.splice((req.params.id - 1), 1)
    }
  };
});

cart.get("/search", (req, res) => {
  console.log(req.query.keyword);
  res.json("Search Results");
});

module.exports = cart;
