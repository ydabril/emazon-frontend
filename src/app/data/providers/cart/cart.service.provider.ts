import { Provider } from "@angular/core";
import { CartService } from "src/app/application/services/cart/cart.service";

export const CartServiceProvider: Provider = {
  provide: 'cartService',
  useClass: CartService
}