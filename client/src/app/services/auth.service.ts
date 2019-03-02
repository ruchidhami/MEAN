import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitiesService } from './utilities.service';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private utilitiesService: UtilitiesService) {
  }

  // login(role): boolean {
  //   const Authorization = this.utilitiesService.getCookie('authToken');
  //   const userRole = this.utilitiesService.getCookie('userRole');
  //   const userId = this.utilitiesService.getCookie('userId');
  //   if (userId && Authorization && role.indexOf(userRole) > -1) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
  //
  // logout(): any {
  //   this.utilitiesService.clearAllCookie();
  //   this.router.navigate(['/notfound']);
  // }
}
