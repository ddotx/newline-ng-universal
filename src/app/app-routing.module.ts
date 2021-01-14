import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsListComponent } from './products-list/products-list.component';
import {TerrainShopResolverService} from "./terrain-shop-resolver.service";

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'terrain-shop',
    loadChildren: () => import('./terrain-shop/terrain-shop.module').then(m => m.TerrainShopModule),
    resolve: {
      promotions: TerrainShopResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
