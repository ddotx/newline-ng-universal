import { Component, OnInit } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { ProductsService } from '../products.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public favorite$;

  constructor(
    private userService: UserService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.favorite$ = this.userService.getFavorites().pipe(
      mergeMap((favoriteProducts) => {
        return this.productsService.getProducts().pipe(
          map((allProducts) => {
            return allProducts.filter((product) =>
              favoriteProducts.includes(product.id)
            );
          })
        );
      })
    );
  }

}
