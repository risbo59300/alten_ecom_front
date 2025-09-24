import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ProductCardComponent', () => {
  let productCard: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  const mockProduct: Product = {
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

  beforeEach(async () => {
     const spy = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: CartService, useValue: spy }
      ]
    })
    .compileComponents();

    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    productCard = fixture.componentInstance;
    productCard.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(productCard).toBeTruthy();
  });

  it('should display product information', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain(mockProduct.name);
    expect(compiled.textContent).toContain(mockProduct.description);
    expect(compiled.textContent).toContain(mockProduct.price);
  });

  it('should add product to cart when button clicked', () => {
    productCard.addToCart();
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('should not add out of stock product to cart', () => {
    productCard.product.inventoryStatus = 'OUTOFSTOCK';
    productCard.addToCart();
    expect(cartServiceSpy.addToCart).not.toHaveBeenCalled();
  });

  it('should return correct status color', () => {
    expect(productCard.getStatusColor()).toBe('primary'); // INSTOCK

    productCard.product.inventoryStatus = 'LOWSTOCK';
    expect(productCard.getStatusColor()).toBe('accent');

    productCard.product.inventoryStatus = 'OUTOFSTOCK';
    expect(productCard.getStatusColor()).toBe('warn');
  });

  it('should return correct status text', () => {
    expect(productCard.getStatusText()).toBe('En stock');

    productCard.product.inventoryStatus = 'LOWSTOCK';
    expect(productCard.getStatusText()).toBe('Stock faible');

    productCard.product.inventoryStatus = 'OUTOFSTOCK';
    expect(productCard.getStatusText()).toBe('Rupture de stock');
  });

  it('should generate correct number of rating stars', () => {
    const stars = productCard.getRatingStars();
    expect(stars.length).toBe(5);
    expect(stars).toEqual([1, 2, 3, 4, 5]);
  });
});
