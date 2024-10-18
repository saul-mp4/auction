const { PrismaClient } = require("@prisma/client");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();
const prisma = new PrismaClient();

userRouter.get("/", async (req, res) => {
  res.json(
    await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    }),
  );
});

module.exports = userRouter;
