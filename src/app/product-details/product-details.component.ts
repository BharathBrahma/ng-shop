import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/services/product.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: "ngs-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"]
})
export class ProductDetailsComponent implements OnInit {
  @Input()
  product: Product;
  quantity: number = null;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {}

  addItems() {
    this.shoppingCartService.addItem(this.product.id, this.quantity);
    this.quantity = null;
  }
}
