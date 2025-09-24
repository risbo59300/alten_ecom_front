import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { BehaviorSubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
let cartServiceSpy: jasmine.SpyObj<CartService>;

  const mockCartItems: CartItem[] = [
    {
      product: {
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
      },
      quantity: 2
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CartService', [
      'removeFromCart',
      'updateQuantity',
      'clearCart',
      'getCartTotal'
    ], {
      cart$: new BehaviorSubject(mockCartItems)
    });

    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      providers: [
        { provide: CartService, useValue: spy }
      ]
    }).compileComponents();

    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartServiceSpy.getCartTotal.and.returnValue(200);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase quantity', () => {
    component.increaseQuantity(1, 2);
    expect(cartServiceSpy.updateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('should decrease quantity', () => {
    component.decreaseQuantity(1, 2);
    expect(cartServiceSpy.updateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('should remove item when decreasing quantity to 0', () => {
    component.decreaseQuantity(1, 1);
    expect(cartServiceSpy.removeFromCart).toHaveBeenCalledWith(1);
  });

  it('should remove item from cart', () => {
    component.removeFromCart(1);
    expect(cartServiceSpy.removeFromCart).toHaveBeenCalledWith(1);
  });

  it('should clear cart', () => {
    component.clearCart();
    expect(cartServiceSpy.clearCart).toHaveBeenCalled();
  });

  it('should calculate item subtotal', () => {
    const subtotal = component.getItemSubtotal(mockCartItems[0]);
    expect(subtotal).toBe(200); // 100 * 2
  });
});
