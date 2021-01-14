import {Inject, Injectable} from '@angular/core';
import {MongoService} from "./mongo.service";
import {REQUEST} from "@nguniversal/express-engine/tokens";
import {Request} from 'express'
import {from, Observable, of} from "rxjs";
import {User} from "../model/user.model";
import {map, mergeMap} from "rxjs/operators";
import { ObjectId } from 'mongodb'

@Injectable({
  providedIn: 'root'
})
export class UserServerService {

  /**
   * TODO
   * - read cookie content (decrypts cookie from request)
   * - retrieve user data
   */

  constructor(
    @Inject('decrypt') private decrypt: any,
    private mongoService: MongoService,
    @Inject(REQUEST) private request: Request
  ) { }

  private getCookie(name: string): string {
    const cookies = {}
    if(this.request.headers.cookie) {
      const decoded = decodeURIComponent(this.request.headers.cookie)
      decoded.split(';').forEach((cookie) => {
        const parts = cookie.split('=')
        cookies[parts[0].trim()] = (parts[1] || '').trim()
      })
    }
    return cookies[name]
  }

  // * SET loggedInCookie
  private loggedInCookie = this.getCookie('loggedIn')

  // * SET logged-in User
  private userId = of(
    this.loggedInCookie
    ? this.decrypt(this.loggedInCookie)
      : null
  )

  private currentUser$: Observable<User> = this.userId.pipe(
    mergeMap((userId) => {
      if(userId == null) {
        return of(null)
      } else {
        return from(
          this.mongoService.retrieveFromDb(
            'users', {_id:0}, {_id: new ObjectId(userId)}
          )
        ).pipe(map(users => users[0]))
      }
    })
  )

  public isLoggedIn(): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user) => user != null)
    );
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

}
