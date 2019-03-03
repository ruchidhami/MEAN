import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";
import { UtilitiesService } from "../services/utilities.service";

import { User } from "./user";
import { ApiUrlConstant } from "../constants/api-url.constant";

@Injectable()
export class UserService {

  constructor(private http: Http,
              private utilitiesService: UtilitiesService) {
  }

  API_BASE_URL = environment['API_BASE_URL']


  getAllUser() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('authorization', this.utilitiesService.getCookie("Authorization"));
    return this.http.get(`${this.API_BASE_URL}${ApiUrlConstant.FETCH_ALL_USER()}`, { headers: headers })
      .map(response => {
        let responseList = response.json().data;
        let users: User[] = []
        responseList.users.forEach((userResponse) => {
          let user: User = new User(userResponse)
          users.push(user)
        })
        return users;
      })
      .catch(this.handleError);
  }

  search(query) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('authorization', this.utilitiesService.getCookie("Authorization"));
    return this.http.get(`${this.API_BASE_URL}${ApiUrlConstant.SEARCH_USER()}?q=${query}`, { headers: headers })
      .map(response => {
        let responseList = response.json().data;
        let users: User[] = []
        responseList.users.forEach((userResponse) => {
          let user: User = new User(userResponse)
          users.push(user)
        })
        return users;
      })
      .catch(this.handleError);
  }

  getUser(id) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('authorization', this.utilitiesService.getCookie("Authorization"));
    return this.http.get(`${this.API_BASE_URL}${ApiUrlConstant.FETCH_USER(id)}`, { headers: headers })
      .map(response => {
        let responseList = response.json().data;
        if (responseList.user.status === 'active') {
          responseList.user.status = true
        } else {
          responseList.user.status = false
        }
        return new User(responseList.user);
      })
      .catch(this.handleError);
  }

  createUser(data, formData): Observable<any> {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', this.utilitiesService.getCookie("Authorization"));
    const dataJson = JSON.stringify(data)
    formData.delete('data')
    formData.append('data', dataJson)
    return this.http.post(`${this.API_BASE_URL}${ApiUrlConstant.CREATE_USER()}`, formData, { headers: headers })
      .map(response => {
        let responseList = response.json().data;
        return new User(responseList.user);
      })
      .catch(this.handleError);
  }

  updateUser(userId, data, formData): Observable<any> {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', this.utilitiesService.getCookie("Authorization"));
    const dataJson = JSON.stringify(data)
    formData.delete('data')
    formData.append('data', dataJson)
    return this.http.patch(`${this.API_BASE_URL}${ApiUrlConstant.UPDATE_USER(userId)}`, formData, { headers: headers })
      .map(() => {
        return true;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any): Observable<any> {
    return Observable.throw(error.json());
  }

}
