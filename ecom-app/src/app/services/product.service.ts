
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private mockProducts: Product[] = [
    {
      id: 1,
      code: 'LAPTOP001',
      name: 'MacBook Pro 16"',
      description: 'Ordinateur portable haute performance avec puce M2 Pro',
      image: 'assets/images/mc_book 1.jpg',
      category: 'Électronique',
      price: 2999.99,
      quantity: 15,
      internalReference: 'REF-LAPTOP-001',
      shellId: 1001,
      inventoryStatus: 'INSTOCK',
      rating: 4.8,
      createdAt: Date.now() - 86400000,
      updatedAt: Date.now()
    },
    {
      id: 2,
      code: 'PHONE001',
      name: 'iPhone 15 Pro',
      description: 'Smartphone dernière génération avec appareil photo professionnel',
      image: 'assets/images/iphone.jpg',
      category: 'Électronique',
      price: 1199.99,
      quantity: 3,
      internalReference: 'REF-PHONE-001',
      shellId: 1002,
      inventoryStatus: 'LOWSTOCK',
      rating: 4.9,
      createdAt: Date.now() - 172800000,
      updatedAt: Date.now()
    },
    {
      id: 3,
      code: 'WATCH001',
      name: 'Apple Watch Series 9',
      description: 'Montre connectée avec suivi santé avancé',
      image: 'assets/images/apple_watch.jpg',
      category: 'Accessoires',
      price: 429.99,
      quantity: 0,
      internalReference: 'REF-WATCH-001',
      shellId: 1003,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4.6,
      createdAt: Date.now() - 259200000,
      updatedAt: Date.now()
    },
    {
      id: 4,
      code: 'LAPTOP002',
      name: 'MacBook Pro 17"',
      description: 'Ordinateur portable haute performance avec puce M2 Pro',
      image: 'assets/images/mc_book 2.jpg',
      category: 'Électronique',
      price: 2999.99,
      quantity: 10,
      internalReference: 'REF-LAPTOP-002',
      shellId: 1001,
      inventoryStatus: 'INSTOCK',
      rating: 4.8,
      createdAt: Date.now() - 86400000,
      updatedAt: Date.now()
    },
    {
      id: 5,
      code: 'PHONE00',
      name: 'iPhone 16 Pro',
      description: 'Smartphone dernière génération avec appareil photo professionnel',
      image: 'assets/images/iphone.jpg',
      category: 'Électronique',
      price: 1199.99,
      quantity: 18,
      internalReference: 'REF-PHONE-002',
      shellId: 1002,
      inventoryStatus: 'INSTOCK',
      rating: 4.9,
      createdAt: Date.now() - 172800000,
      updatedAt: Date.now()
    },
    {
      id: 6,
      code: 'WATCH002',
      name: 'Apple Watch Series 10',
      description: 'Montre connectée avec suivi santé avancé',
      image: 'assets/images/apple_watch.jpg',
      category: 'Accessoires',
      price: 429.99,
      quantity: 25,
      internalReference: 'REF-WATCH-002',
      shellId: 1003,
      inventoryStatus: 'INSTOCK',
      rating: 4.6,
      createdAt: Date.now() - 259200000,
      updatedAt: Date.now()
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.mockProducts.find(p => p.id === id);
    return of(product);
  }
}
