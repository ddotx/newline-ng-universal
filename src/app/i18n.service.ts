import {Inject, Injectable, Optional, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {REQUEST} from "@nguniversal/express-engine/tokens";

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private userLang

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    // SSR
    @Optional() @Inject(REQUEST) private request: Request // ? Optional() -> when REQ obj is N/A will enables REQ to null
  ) {
    if(isPlatformBrowser(this.platformId)) {
      this.userLang = window.navigator.language
    }
    // else on SSR
    // @Request Headers -> Accept-Language: en-US,en;q=0.5
    else {
      this.userLang = (this.request.headers['accept-language'] || '').substring(0,5)
    }
  }

  public getCurrencyCode(): string {
    switch (this.userLang) {
      default:
      case 'en-US': return 'USD'
      case 'en-EN': return 'GBP'
    }
  }
}
