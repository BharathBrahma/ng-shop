import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from "../shared/services/product.service";
import { ActivatedRoute } from '@angular/router';
import { flatMap, tap } from 'rxjs/operators'; 

@Component({
  selector: 'ngs-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product;
  constructor(ProductService: ProductService, route: ActivatedRoute) { 
    route.params.pipe(  
      tap((prodId) => console.log('Here is product id : ', prodId)),    
      flatMap(({ productId }) => ProductService.getProductById(productId)))
      .subscribe(product => {
        console.log(product.price);
        this.product = product
      });
  }

  ngOnInit() {
  }

}
