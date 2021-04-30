const express = require("express");
const cart = require("./cart");
const app = express();

app.use("/", cart);

const port = 3000;

app.listen(port, () => console.log(`listening on port: ${port}`));
