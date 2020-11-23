import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AlertService } from '../services/alert.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private alert: AlertService) { }


  post(serviceName: string, data: any, Header: any) {
    let token: string;
    if (Header) {
     // token = Header.value.token;
    } else {
      token = 'none';
    }
    const Headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
    });
    const options = { headers: Headers, withCredintials: true};
    const url = environment.apiUrl + serviceName;
    return this.http.post(url, JSON.stringify(data), options);
  }


  postData(serviceName: string, Header: any, data?: any) {
    let token: string;
    let username: string;
    let deviceId: string;
    let model: string;
    let platform: string;
    let dir: string;
    if (Header) {
      token = Header.token;
      username = Header.username;
      deviceId = Header.device_id;
      model = Header.model;
      platform = Header.platform;
      dir = Header.dir;
    } else {
      token = 'none';
      username = 'none';
      deviceId = 'none';
      model = 'none';
      platform = 'none';
      dir = 'none';
    }
    const Headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': token,
      'user-name': username,
      'device-id': deviceId,
      'model': model,
      'platform': platform,
      'dir': dir,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
    });
    const options = { headers: Headers, withCredintials: true};
    const url = environment.apiUrl + serviceName;
   // return this.http.post(url, JSON.stringify(Headers), options);

    return  this.http.post(url, JSON.stringify(data), options);

  }
  getData(serviceName: string) {
      const url = environment.apiUrl + serviceName;
      return this.http.get(url);
  }
}
