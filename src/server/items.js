const { PrismaClient } = require("@prisma/client");
const express = require("express");

const itemsRouter = express.Router();
const prisma = new PrismaClient();

itemsRouter.get("/", async (req, res) => {
  res.json(
    await prisma.item.findMany({
      where: {
        userId: req.user.id,
      },
    }),
  );
});

module.exports = itemsRouter;