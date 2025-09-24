import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  const mockProducts: Product[] = [
    {
      id: 1,
      code: 'TEST001',
      name: 'Test Product 1',
      description: 'Test description 1',
      image: 'test1.jpg',
      category: 'Test Category',
      price: 100,
      quantity: 10,
      internalReference: 'REF001',
      shellId: 1001,
      inventoryStatus: 'INSTOCK',
      rating: 4.5,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getProduct']);

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductCardComponent],
      providers: [
        {provide: ProductService, useValue: spy}
      ]
    })
    .compileComponents();

    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productServiceSpy.getProducts.and.returnValue(of(mockProducts));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
  });

  it('should display products', (done) => {
    component.products$.subscribe(products => {
      expect(products).toEqual(mockProducts);
      done();
    });
  });

  it('should track products by id', () => {
    const product = mockProducts[0];
    const trackResult = component.trackByProductId(0, product);
    expect(trackResult).toBe(product.id);
  });


});
