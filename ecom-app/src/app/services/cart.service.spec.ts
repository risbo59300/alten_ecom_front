import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { Product } from '../models/product';

describe('CartService', () => {
  let service: CartService;
  let mockProduct: Product;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);

     mockProduct = {
      id: 1,
      code: 'TEST001',
      name: 'Test Product',
      description: 'Test description',
      image: 'test.jpg',
      category: 'Test Category',
      price: 100,
      quantity: 10,
      internalReference: 'REF001',
      shellId: 1001,
      inventoryStatus: 'INSTOCK',
      rating: 4.5,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty cart', (done) => {
    service.cart$.subscribe(cartItems => {
      expect(cartItems).toEqual([]);
      done();
    });
  });

  it('should add product to cart', (done) => {
    service.addToCart(mockProduct);

    service.cart$.subscribe(cartItems => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].product.id).toBe(mockProduct.id);
      expect(cartItems[0].quantity).toBe(1);
      done();
    });
  });

   it('should increase quantity when adding same product', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct);

    service.cart$.subscribe(cartItems => {
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].quantity).toBe(2);
    });
  });

  it('should remove product from cart', () => {
    service.addToCart(mockProduct);
    service.removeFromCart(mockProduct.id);

    service.cart$.subscribe(cartItems => {
      expect(cartItems.length).toBe(0);
    });
  });

  it('should update product quantity', () => {
    service.addToCart(mockProduct);
    service.updateQuantity(mockProduct.id, 5);

    service.cart$.subscribe(cartItems => {
      expect(cartItems[0].quantity).toBe(5);
    });
  });

  it('should remove product when quantity is 0 or negative', () => {
    service.addToCart(mockProduct);
    service.updateQuantity(mockProduct.id, 0);

    service.cart$.subscribe(cartItems => {
      expect(cartItems.length).toBe(0);
    });
  });

  it('should calculate cart total correctly', () => {
    service.addToCart(mockProduct, 2);
    const total = service.getCartTotal();
    expect(total).toBe(200); // 100 * 2
  });

  it('should clear cart', () => {
    service.addToCart(mockProduct);
    service.clearCart();

    service.cart$.subscribe(cartItems => {
      expect(cartItems.length).toBe(0);
    });
  });

});
