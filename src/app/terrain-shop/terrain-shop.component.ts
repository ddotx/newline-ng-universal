import { Component, OnInit } from '@angular/core';
import {OpeningHours} from "../../model/opening-hours.model";
import {SeoService} from "../seo.service";
import {TerrainShopService} from "../terrain-shop.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-terrain-shop',
  templateUrl: './terrain-shop.component.html',
  styleUrls: ['./terrain-shop.component.scss']
})
export class TerrainShopComponent implements OnInit {

  public openingHours$: Observable<OpeningHours> = this.ts.getOpeningHours();
  // public promotions$: Observable<string[]> = this.ts.getPromotions();
  // * Use Resolver
  public promotions$: Observable<string[]> = this.router.data.pipe(
    map((data) => data['promotions'])
  )

  constructor(
    private ts: TerrainShopService,
    private seo: SeoService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.seo.setTitle('Visit the terrain shop!');
  }

}
