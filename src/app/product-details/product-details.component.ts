import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/model/product.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../products.service';
import {
  switchMap,
  tap,
  mergeMap
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserService } from '../user.service';
import {I18nService} from "../i18n.service";
import {SeoService} from "../seo.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product;
  @Input() isFavorite: boolean;

  public product$: Observable<Product>;
  public userCurrency: string = this.i18n.getCurrencyCode()

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private userService: UserService,
    private i18n: I18nService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    if (this.product) {
      this.product$ = of(this.product);
    } else {
      this.product$ = this.userService.getFavorites().pipe(
        mergeMap((favorites) => {
          return this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
              this.productsService.getProduct(params.get('id'))
            ),
            tap(
              (product) => {
                this.isFavorite = favorites.includes(product.id)
                this.seo.setTitle(product.name)
                this.seo.setDescription(product.description)
                this.seo.setKeywords(['food', 'drink', 'grocery'])
              }

            )
          );
        })
      );
    }
  }

  public addToFavorites(id: string) {
    this.userService.addToFavorites(id).subscribe();
  }
}
