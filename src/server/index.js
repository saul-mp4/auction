const express = require("express");
const passport = require("./passport.js");
const userRouter = require("./user.js");
const itemsRouter = require("./items.js");
const authRouter = require("./auth.js");

const app = express();

app.use(express.json());

app.use("/api", authRouter);

app.use(passport.authenticate("jwt", { session: false }));

app.use("/api/user", userRouter);
app.use("/api/items", itemsRouter);

app.listen(3000, () => {
  console.log("Server started");
});
