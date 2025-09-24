import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItemsCount$!: Observable<number>;

  constructor(private cartService: CartService) { }


  ngOnInit(): void {
    this.cartItemsCount$ = this.cartService.getCartItemCount();
  }


}
