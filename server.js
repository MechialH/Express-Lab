const express = require("express");
const cart = require("./cart");
const app = express();

app.use("/", cart);

const port = 3000;
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(port, () => console.log(`LETS GOOOOO: listening on port: ${port}`));
