import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class AppCookieService {

  constructor(private cookieService: CookieService) { }


  clearAll() {
    return this.cookieService.removeAll();
  }

  get(name: any) {
    return this.cookieService.get(name);
  }

  put(key: string, value: string) {
    return this.cookieService.put(key, value);
  }

}
