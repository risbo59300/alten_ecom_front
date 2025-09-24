import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  products$!: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  // TrackBy function pour optimiser le rendu
  trackByProductId: TrackByFunction<Product> = (index: number, product: Product) => {
    return product.id;
  };

}
