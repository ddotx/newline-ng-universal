import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { User } from 'src/model/user.model';
import {
  map,
  catchError,
  tap,
  distinctUntilChanged,
  mergeMap,
  filter,
  take,
} from 'rxjs/operators';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private API_URL = 'http://localhost/api';
  // private API_URL = '/api'
  // TODO: Server-side
  private API_URL = `${environment.apiBasePath}/api`


  private currentUser$: Subject<User> = new BehaviorSubject(null);
  private redirectUrl: string = '/'; // ? => AuthGuard uses to redirected after success
  private redirectParams: any = null; // ? => path param on redirect

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUser$
      .pipe(
        distinctUntilChanged(),
        filter((user) => !user),
        mergeMap(() => this.checkCookie())
      )
      .subscribe();
  }

  private checkCookie(): Observable<void> {
    return this.http
      .get(`${this.API_URL}/isLoggedIn`, {
        withCredentials: true,
      })
      .pipe(
        catchError(() => of(null)),
        tap((user) => this.currentUser$.next(user))
      );
  }

  public isLoggedIn(): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user) => user != null)
    );
  }

  public setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  public login(email: string, password: string): void {
    this.http
      .post<User>(`${this.API_URL}/login`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((user) => {
          this.currentUser$.next(user);
          if (this.redirectParams) {
            this.router.navigate([
              this.redirectUrl,
              this.redirectParams,
            ]);
          } else {
            this.router.navigate([this.redirectUrl]);
          }

          this.redirectParams = null;
          this.redirectUrl = '/';
        })
      )
      .subscribe();
  }

  public getFavorites(): Observable<string[]> {
    return this.currentUser$.pipe(
      map((user) => {
        if (user) {
          return user.favorite;
        } else {
          return [];
        }
      })
    );
  }

  public addToFavorites(id: string): Observable<boolean> {
    return this.isLoggedIn().pipe( // <- Obs<boolean>
      take(1), // ? => to avoid sending an HTTP request whenever currentUser$ emits a new value
      mergeMap((isLoggedIn) => {
        if (isLoggedIn) {
          return this.http
            .post<User>(`${this.API_URL}/favorites/${id}`, {
              withCredentials: true,
            })
            .pipe(
              catchError(() => of(null)), // ? if the user is no longer authenticated (cookie has expired)
              tap((user) => this.currentUser$.next(user)),
              map((user) => !!user)
            );
        } else {
          this.redirectUrl = 'products';
          this.redirectParams = { pid: id };
          this.router.navigate(['login']);
          return of(false);
        }
      })
    );
  }
}
