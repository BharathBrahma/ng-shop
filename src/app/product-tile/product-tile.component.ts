import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/services/product.service';

@Component({
  selector: 'ngs-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent {

  @Input() product: Product;

}
