import {  ProductService } from './../shared/services/product.service';
import { Resolve } from "@angular/router";
import { Product } from "../shared/services/product.service";
import { Injectable } from "@angular/core";
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { forkJoin, of, Observable } from "rxjs";

@Injectable()
export class CartResolver implements Resolve<Product[]> {
  constructor(private productService: ProductService, 
                private shoppingCartService: ShoppingCartService) {}

  resolve(): Observable<Product[]> {
      const productsInCart = Object.keys(this.shoppingCartService.getItems());

      const requests$ = productsInCart.map(productId =>
          this.productService.getProductById(productId));

      return requests$.length ?
          forkJoin(requests$) :
          of([]);
  }

}
