import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class UtilitiesService {

  constructor(private cookieService: CookieService) { }


  clearAllCookie() {
    return this.cookieService.removeAll();
  }

  getCookie(name: any) {
    return this.cookieService.get(name);
  }

  putCookie(key: string, value: string) {
    return this.cookieService.put(key, value);
  }


}
