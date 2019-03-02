import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Http,
  Headers,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  RequestMethod,
  Request,
  URLSearchParams
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from "../../environments/environment";
import { UtilitiesService } from './utilities.service';

@Injectable()
export class ApiHelperService {
  constructor(private _http: Http,
              private router: Router,
              private service: UtilitiesService) {
  }

  private API_BASE_URL = environment['API_BASE_URL'];

  private _buildAuthHeader(): string {
    return this.service.getCookie("authToken")
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let params: any = new URLSearchParams();
    if (options) {
      Object.keys(options).forEach(key => {
        params.set(key, options[key]);
      });
    }
    return this._request(RequestMethod.Get, url, null, { params: params });
  }

  public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Post, url, body, options);
  }

  public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    let params: any = new URLSearchParams();
    if (options) {
      Object.keys(options).forEach(key => {
        params.set(key, options[key]);
      });
    }
    return this._request(RequestMethod.Put, url, body, { params: params });
  }

  public _delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Delete, url, null, options);
  }

  public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Patch, url, body, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Head, url, null, options);
  }

  private _request(method: RequestMethod, url: string, body?: string, options?: RequestOptionsArgs): Observable<Response> {
    let requestOptions = new RequestOptions(Object.assign({
      method: method,
      url: this.API_BASE_URL + url,
      body: body
    }, options));

    if (!requestOptions.headers) {
      requestOptions.headers = new Headers();
    }

    requestOptions.headers.set("Authorization", this._buildAuthHeader());
    requestOptions.headers.set("Content-Type", 'application/json');

    return Observable.create((observer) => {
      this._http.request(new Request(requestOptions))
        .subscribe(
          (res) => {
            observer.next(res);
            observer.complete();
          },
          (err) => {
            switch (err.status) {
              case 401:
                // this.service.showFlashMessage('Unauthorized', ['alert', 'alert-danger'], 6000);
                this.router.navigate(['/']);
                break;
              default:
                observer.error(err);
                break;
            }
          })
    })
  }
}
