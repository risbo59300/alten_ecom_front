import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product!: Product;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  addToCart(): void {
    if (this.product.inventoryStatus !== 'OUTOFSTOCK') {
      this.cartService.addToCart(this.product);
      this.snackBar.open(`${this.product.name} ajouté au panier`, 'Fermer', {
        duration: 3000
      });
    }
  }

  getStatusBadgeClass(): string {
    switch (this.product.inventoryStatus) {
      case 'INSTOCK':
        return 'bg-green-100 text-green-800';
      case 'LOWSTOCK':
        return 'bg-yellow-100 text-yellow-800';
      case 'OUTOFSTOCK':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(): string {
    switch (this.product.inventoryStatus) {
      case 'INSTOCK':
        return 'En Stock';
      case 'LOWSTOCK':
        return 'Stock faible';
      case 'OUTOFSTOCK':
        return 'Rupture de stock';
      default:
        return 'Indisponible';
    }
  }

  getRatingStars(): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }

}
