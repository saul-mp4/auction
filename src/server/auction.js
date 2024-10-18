const { PrismaClient } = require("@prisma/client");
const express = require("express");

const auctionRouter = express.Router();
const prisma = new PrismaClient();

auctionRouter.get("/:userId", async (req, res) => {
  res.json(
    await prisma.item.findMany({
      where: {
        userId: req.params.userId,
      },
    }),
  );
});

module.exports = auctionRouter;
