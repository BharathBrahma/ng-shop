import { ShoppingCartService } from './shared/services/shopping-cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'ngs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-shop';
  constructor(private shoppingCartService: ShoppingCartService) { } 
  get cartTotalQuantity(): number {
    return this.shoppingCartService.totalQuantity || null;
  }
}
