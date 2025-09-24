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

    // Mise à jour du total à chaque changement du panier
    this.cartItems$.subscribe(items => {
      this.cartTotal = this.cartService.getCartTotal();
    });
  }

  // Augmenter la quantité d'un produit
  increaseQuantity(productId: number, currentQuantity: number): void {
    this.cartService.updateQuantity(productId, currentQuantity + 1);
    this.showQuantityUpdateMessage('Quantité augmentée');
  }

   // Diminuer la quantité d'un produit
  decreaseQuantity(productId: number, currentQuantity: number): void {
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(productId, currentQuantity - 1);
      this.showQuantityUpdateMessage('Quantité diminuée');
    } else {
      this.removeFromCart(productId);
    }
  }

  // Afficher un message de confirmation pour les changements de quantité
  private showQuantityUpdateMessage(message: string): void {
    this.snackBar.open(message, '', {
      duration: 1500,
      panelClass: ['info-snackbar']
    });
  }

  // Calculer le sous-total d'un produit
  getItemSubtotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  // Procéder au paiement (simulation)
  proceedToCheckout(): void {
    this.snackBar.open('Redirection vers le paiement...', 'Fermer', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.snackBar.open('Produit supprimé du panier', 'Fermer', {
      duration: 3000
    });
  }

  getTotalQuantity(cartItems: any[] | null): number {
  if (!cartItems) return 0;
  return cartItems.reduce((total, item) => total + item.quantity, 0);
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
