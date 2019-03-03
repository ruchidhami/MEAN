import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { environment } from "../../environments/environment";
import { UtilitiesService } from "../services/utilities.service";

import { ApiUrlConstant } from "../constants/api-url.constant";
import { AppConstant } from "../constants/app.constant";

@Injectable()
export class LoginService {

  constructor(private http: Http,
              private utilitiesService: UtilitiesService) {
  }

  API_BASE_URL = environment['API_BASE_URL']


  validateUserCredential(loginUser) {
    return this.http.post(`${this.API_BASE_URL}${ApiUrlConstant.USER_LOGIN}`, loginUser)
      .map(response => {
        let user = response.json().data;
        this.utilitiesService.putCookie(`${AppConstant.AuthCookie}`, user.token)
      })
      .catch(this.handleError);
  }


  private handleError(error: Response | any): Observable<any> {
    return Observable.throw(error.json());
  }

}
