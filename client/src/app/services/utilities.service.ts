import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie';
import { FlashMessagesService } from 'ngx-flash-messages';

@Injectable()
export class UtilitiesService {

  constructor(private cookieService: CookieService,
              private flashMessagesService: FlashMessagesService) { }


  clearAllCookie() {
    return this.cookieService.removeAll();
  }

  getCookie(name: any) {
    return this.cookieService.get(name);
  }

  putCookie(key: string, value: string) {
    return this.cookieService.put(key, value);
  }

  showFlashMessage( message, classes, times) {
    return this.flashMessagesService.show( message , {
      classes: classes,
      timeout: times,
    });
  }

}
