import { Injectable, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;

  baseUrl = environment.API_URL;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:typedef
  /*userlogin(val:any) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post(this.baseUrl + '/Users/login.php', val).pipe(map((Users: any) => {
    this.setToken(Users[0].id);
    this.getLoggedInName.emit(true);
    return Users;
    }));
  }*/

  userlogin(val:any) {
    return this.httpClient.post(this.baseUrl + '/Users/login',val);
  }



  getToken() {
    return localStorage.getItem('user_id');
    }
  
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
    return true;
    }
    return false;
    }
}
