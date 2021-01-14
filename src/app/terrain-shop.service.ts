import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OpeningHours} from "../model/opening-hours.model";

@Injectable({
  providedIn: 'root'
})
export class TerrainShopService {

  private API_URL = environment.terrainShopBasePath

  constructor(private http: HttpClient) { }

  public getPromotions(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.API_URL}/promotions`
    )
  }

  public getOpeningHours(): Observable<OpeningHours> {
    return this.http.get<OpeningHours>(
      `${this.API_URL}/opening`
    )
  }

}
