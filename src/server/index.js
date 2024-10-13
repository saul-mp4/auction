const express = require("express");
const userRouter = require("./user.js");
const itemsRouter = require("./items.js");

const app = express();

app.use("/api/users", userRouter);
app.use("/api/items", itemsRouter);

app.listen(3000, () => {
  console.log("Server started");
});
