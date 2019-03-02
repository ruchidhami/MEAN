import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

// import { Observable } from "rxjs/Rx";
// import { ApiUrlConstant } from "../shared/constants/api-url.constant";
// import { LoginPhone } from "./login-phone";
// import { LoginUser } from "./login-user";
// import { ValidatedUser } from "./validated-user";
// import { ValidatedPhone } from "./validated-phone";
// import { ApiHelperService } from "../shared/services/apihelper.service";

@Injectable()
export class LoginService {

  constructor() {
  }

  // validateUserCredential(loginUser: LoginUser): Observable<ValidatedUser> {
  //   return this.helper.post(`${ApiUrlConstant.USER_LOGIN}`, JSON.stringify(loginUser))
  //     .map(response => {
  //       return new ValidatedUser(response.json().data);
  //     })
  //     .catch(this.handleError);
  // }


  // private handleError(error: Response | any): Observable<any> {
  //   return Observable.throw(error.json());
  // }

}
