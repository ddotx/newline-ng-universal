import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Resolve} from "@angular/router";
import {TerrainShopService} from "./terrain-shop.service";
import {Observable, race, timer} from "rxjs";
import {isPlatformServer} from "@angular/common";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TerrainShopResolverService implements Resolve<string[]>{

  // TODO: resolve on getPromotions that delayed for simulating slow api response than ssr

  constructor(
    private ts: TerrainShopService,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  public resolve(): Observable<string[]> {
    if(isPlatformServer(this.platformId)) {
      return race(
        this.ts.getPromotions(),
        timer(500).pipe(
          map(() => ['Loading data...']))
      )
    } else {
      return this.ts.getPromotions()
    }
  }
}
