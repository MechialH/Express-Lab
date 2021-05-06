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
    product: "Fancy Hat",
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
  let maxPrice = req.query.maxPrice
  let prefix = req.query.prefix
  let pageSize = req.query.pageSize
  let filtered = items
  if(maxPrice){
    filtered = items.filter(item => item.price <= maxPrice)
  }

  if(prefix){
    filtered = items.filter(item => String(item.product).startsWith(prefix))
  }

  if(pageSize){
    filtered = items.filter(item => item.id <= pageSize)
  }

  // if(filtered){
  //   res.json(filtered)
  // }else{
    res.json(filtered)
  // }
});

cart.get("/cart-items/:id", (req, res) => {
  const found = items.find(item => item.id === +req.params.id )
  
  if(!found){
    res.status(404).send("The cart item could not be found")

  }else{
    res.json(found)
  }
    
});

// cart.get("/cart-items/:id", (req, res) => {
//   console.log(req.params.id);
//   res.json(items.find((item) =>{
//     return +req.params.id === item.id
//   }))
// });

cart.post("/cart-items", (req, res) => {
  
  const quantity = parseInt(req.body.quantity)

  if(!quantity){
    return res.status(400).send('Invalid quantity')
  }

  const price = parseInt(req.body.price)

  if(!price){
    return res.status(400).send('Invalid price')
  }

  const newItem = {
    id: items.length +1,
    product: req.body.product,
    price: req.body.price,
    quantity: req.body.price
}
  items.push(newItem)

  res.status(201).json(newItem)
  
});

cart.put("/cart-items/:id", (req, res) => {
  const quantity = parseInt(req.body.quantity)

  if(!quantity){
    return res.status(400).send('Invalid quantity')
  }

  const price = parseInt(req.body.price)

  if(!price){
    return res.status(400).send('Invalid price')
  }

  const found = items.find(item => item.id === +req.params.id )

  if(!found){
    res.status(404).send("The cart item could not be found")

  }else{
    found.price = req.body.price
    found.product = req.body.product
    found.quantity = req.body.quantity

    res.json(found)
  }
});

cart.delete("/cart-items/:id", (req, res) => {
  for(let item of items){
    if (item.id === +req.params.id){
      console.log(item)
      items.splice((req.params.id - 1), 1)
    }
  };
  res.status(204).json('No content found')
});

module.exports = cart;
