import { NewListing } from "../generated/Marketplace/SimpleMarketplaceNativeERC721";
import { Item } from "../generated/schema";

export function handleNewListing(event: NewListing): void {
  let item = new Item(event.params.listId.toHex());
  item.id = event.params.listId.toString();
  item.tokenId = event.params.tokenId.toString();
  item.sellerAddress = event.params.seller.toHex();
  item.price = event.params.price;
  item.sold = false;
  item.save();
}
