import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isLoggedIn().pipe(
      tap((val) => {
        if (val == false) {
          this.userService.setRedirectUrl(state.url); // ? after successfully login, the user is redirected to the page
          this.router.navigate(['login']);
        }
      })
    );
  }
}
