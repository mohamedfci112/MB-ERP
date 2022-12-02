import { Injectable, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;

  baseUrl = 'http://localhost:8080/archiving_php/';
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:typedef
  userlogin(username: any, password: any) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post(this.baseUrl + 'login.php', { username, password }).pipe(map((Users: any) => {
    this.setToken(Users[0].id);
    this.getLoggedInName.emit(true);
    return Users;
    }));
  }


  getToken() {
    return localStorage.getItem('token');
    }
  
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
    return true;
    }
    return false;
    }
}
