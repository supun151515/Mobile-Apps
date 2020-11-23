
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { UserDataResolver } from '../resolvers/userData.resolver';



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
 

  constructor(private http: HttpClient,
              private storageService: StorageService,
              private userDataResolver: UserDataResolver) { }


    

  post(serviceName: string, data: any) {
   
    // this.authService.getUserData();
   // let ss: any = this.userDataResolver.userData$;
    //console.log(ss);
    const Headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Accept':'application/json',
      'Authorization': 'ss',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
    });
    
    // Headers.append('Content-Type','application/json');
   // Headers.append('Accept','application/json');
   // Headers.append('Authorization', token);
    const options = { headers: Headers, withCredintials: true };
    const url = environment.apiUrl + serviceName;

    return this.http.post(url, JSON.stringify(data), options);

  }


}
