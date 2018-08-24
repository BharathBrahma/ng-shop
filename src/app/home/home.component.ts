import { Product ,ProductService } from './../shared/services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, map } from "rxjs/operators";
import { MatTabGroup } from '@angular/material';

@Component({
  selector: "ngs-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  productService: ProductService;
  products$: Observable<Product[]>;
  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;
  readonly categories = ['all','featured','latest','sport'];

  constructor(private router: Router,
    private route: ActivatedRoute,
    productService: ProductService,) {
    this.productService = productService;
  }

  ngOnInit() {
    this.products$ = this.route.paramMap
    .pipe(
      map( params => params.get('category')),
           switchMap((category) => {
           this.matTabGroup.selectedIndex = this.categories.indexOf(category);
           return category === 'all' ?
           this.productService.getAll() :
           this.productService.getProductsByCategoryName(category);
      })
    )    
  }
  onTabChange(tabIndex: number){
    const category = this.categories[tabIndex];
    this.router.navigate([category],{ relativeTo: this.route.parent});
  }
}
