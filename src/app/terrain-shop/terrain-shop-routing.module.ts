import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerrainShopComponent } from './terrain-shop.component';

const routes: Routes = [{ path: '', component: TerrainShopComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerrainShopRoutingModule { }
