-- DropForeignKey
ALTER TABLE "bids" DROP CONSTRAINT "bids_auction_id_fkey";

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auctions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
