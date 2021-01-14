import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerrainShopRoutingModule } from './terrain-shop-routing.module';
import { TerrainShopComponent } from './terrain-shop.component';


@NgModule({
  declarations: [TerrainShopComponent],
  imports: [
    CommonModule,
    TerrainShopRoutingModule
  ]
})
export class TerrainShopModule { }
