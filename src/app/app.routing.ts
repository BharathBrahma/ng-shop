import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';

import { Route } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CartResolver } from './cart/cart-resolver';

export const routes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'categories' },
    {
        path: 'categories',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'all' },
            { path: ':category', component: HomeComponent },
        ]
    },
    { path: 'products/:productId', component: ProductComponent},
    {
        path: 'cart', component: CartComponent,
        resolve: { products: CartResolver }
    },
    { path: 'checkout', component: CheckoutComponent }
    
];

