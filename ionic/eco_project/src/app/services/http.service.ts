import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  displayUserData: any;
  constructor(private http: HttpClient,
              private loadingService: LoadingService) { }

  post(serviceName: string, data: any, Header: any) {
    let token: string;
    if (Header) {
     // token = Header.value.token;
    } else {
      token = 'none';
    }
    const Headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept':'application/json',
      'Authorization': token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
    });
    const options = { headers: Headers, withCredintials: true};
    const url = environment.apiUrl + serviceName;
    return this.http.post(url, JSON.stringify(data), options);
  }

  postData(serviceName: string, Header: any) {
    let token: string;
    if (Header) {
      token = Header.token;
    } else {
      token = 'none';
    }
    const Headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept':'application/json',
      'Authorization': token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
    });
    const options = { headers: Headers, withCredintials: true};
    const url = environment.apiUrl + serviceName;
    return this.http.post(url, JSON.stringify(Headers), options);

  }
}
