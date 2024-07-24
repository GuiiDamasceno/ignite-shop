import { Product } from "use-shopping-cart/core";

export type IProduct = Product & {
  defaultPriceId?: string
  quantity?: string
}