import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems$!: Observable<CartItem[]>;
  cartTotal = 0;

   constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cart$;

    this.cartItems$.subscribe(items => {
      this.cartTotal = this.cartService.getCartTotal();
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.snackBar.open('Produit supprimé du panier', 'Fermer', {
      duration: 3000
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    } else {
      this.removeFromCart(productId);
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.snackBar.open('Panier vidé', 'Fermer', {
      duration: 3000
    });
  }

}
