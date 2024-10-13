const { PrismaClient } = require("@prisma/client");
const express = require("express");

const userRouter = express.Router();
const prisma = new PrismaClient();

userRouter.get("/", async (_, res) => {
  res.json(await prisma.user.findMany());
});

module.exports = userRouter;
