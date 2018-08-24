import { ShoppingCartState } from './../shared/services/shopping-cart.service';
import { Product } from './../shared/services/product.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";


@Component({
  selector: 'ngs-cart',
  styleUrls: ['./cart.component.scss'],
  templateUrl: './cart.component.html'
})
export class CartComponent {

  products: Product[];
  quantity: ShoppingCartState; // map of productID/Quantity
  formModel: FormGroup;

  constructor(private cartService: ShoppingCartService, route: ActivatedRoute) {
    this.products = route.snapshot.data['products'];
    const cartItems = this.cartService.getItems();

    const controls = this.products.reduce((accumulator, product) => {
      const control = new FormControl(cartItems[product.id], positive);
      return Object.assign(accumulator, { [product.id]: control });
    }, {});

    this.formModel = new FormGroup(controls);
    this.formModel.valueChanges
      .subscribe(value => {
        if (this.formModel.valid) {
          this.cartService.setItems(value);
        }
      });
  }

  get total() {
    const cartItems = this.cartService.getItems();
    return Object.keys(cartItems).reduce((total, productId) => {
      const product = this.products.find(p => p.id === productId);
      const qty = cartItems[productId];
      return total + product.price * qty;
    }, 0);
  }

  removeItem(productId: string) {
    const index = this.products.findIndex(p => p.id === productId);
    this.products.splice(index, 1);
    this.cartService.removeItem(productId);
  }
}



function positive(control: AbstractControl): { [key: string]: boolean } {
  const valid = Number.isInteger(control.value) && control.value > 0;
  return valid ? null : { positive: true };
}

