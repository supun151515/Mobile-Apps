import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor() { }

  Auth(tokendata: any, url: string) {
    let access = '0';
    const userType = tokendata.user_type;
    if (userType == '1') {
      access = '1';
      return access;
    }
    const userData = JSON.parse(tokendata.access_levels);
    const thisURL = url;
    let userAccess = userData.filter(x => x.name == thisURL);
    const uservalue = userAccess[0].accessValue;
    userAccess = uservalue.split(',');
    if (userAccess[0] == '1') {
      access = '1';
      return access;
    } else
    if (userAccess[2] == '1') {
      access = '1';
      return access;
    } else {
      access = '0';
      return access;
    }
  }

  Admin(tokendata: any, url: string) {
    let access = '0';
    const userType = tokendata.user_type;
    if (userType == '1') {
      access = '1';
      return access;
    } else {
      access = '0';
      return access;
    }
  }
}

