import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/model/product.model';
import { MongoService } from './mongo.service';
import { ObjectId } from 'mongodb';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Product Service
 * -> Retrieves data by querying the database
 * -> Use to executes on the server to render HTML with AppServerModule
 */

@Injectable({
  providedIn: 'root',
})
export class ProductsServerService {

  constructor(private mongoService: MongoService) {}

  public getProducts(): Observable<Product[]> {
    return from(
      this.mongoService.retrieveFromDb<Product>('products', {
        description: 0,
      })
    );
  }

  public getProduct(
    productId: string
  ): Observable<Product> {
    return from(
      this.mongoService.retrieveFromDb<Product>(
        'products',
        {},
        { _id: ObjectId(productId) }
      )
    ).pipe(map((products) => products[0]));
  }
}
