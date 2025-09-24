import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return products observable", (done) => {
    service.getProducts().subscribe(products => {
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBeTruthy();
      expect(products.length).toBeGreaterThan(0);
      done();
    });
  });

   it('should return product by id', (done) => {
    const testId = 1;
    service.getProductById(testId).subscribe(product => {
      expect(product).toBeDefined();
      expect(product?.id).toBe(testId);
      done();
    });
  });

  it('should return undefined for non-existent product', (done) => {
    const nonExistentId = 999;
    service.getProductById(nonExistentId).subscribe(product => {
      expect(product).toBeUndefined();
      done();
    });
  });

  it('should return products with correct structure', (done) => {
    service.getProducts().subscribe(products => {
      const product = products[0];
      expect(product.id).toBeDefined();
      expect(product.code).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined();
      expect(product.inventoryStatus).toMatch(/^(INSTOCK|LOWSTOCK|OUTOFSTOCK)$/);
      done();
    });
  });


});
