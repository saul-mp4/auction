const { PrismaClient } = require("@prisma/client");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
const prisma = new PrismaClient();

authRouter.post("/register", async (req, res) => {
  const { email, password, fullName } = req.body;
  const hashed = await bcrypt.hash(password, +process.env.BCRYPT_SALT);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      fullName,
    },
  });

  res.json(user);
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const compare = await bcrypt.compare(password, user.password);

    if (compare) {
      res
        .status(200)
        .send(
          jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
          }),
        );
    } else {
      res.status(401).send("Wrong email or password");
    }
  } catch {
    res.status(401).send("Wrong email or password");
  }
});

module.exports = authRouter;
