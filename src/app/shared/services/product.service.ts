import { Product } from './product.service';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products/all.json');
  }

  getProductsByCategoryName(category: String): Observable<Product[]>{
    return this.http.get<Product[]>(`/data/products/${category}.json`);
  }

  getProductById(productId: string): Observable<Product>{
    return this.http.get<Product[]>('/data/products/all.json')
      .pipe(
        map(products => products.find(p => p.id === productId))
      );
  }

}

export interface Product {
  description: string;
  featured: boolean;
  imageUrl: string;
  price: number;
  title: string;
  id: string;
}

