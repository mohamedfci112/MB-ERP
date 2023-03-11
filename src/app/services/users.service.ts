import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly APIUrl = environment.API_URL;

  ScreensList = <any>[];
  constructor(private http:HttpClient) { }

  //get all groups
  getAllGroups():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Users/getAllGroups');
  }

  //get all users
  getAllUsers():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Users/getAllUsers');
  }

  //get last user id
  GetGroupLastID(){
    return this.http.get(this.APIUrl+'/Users/GetGroupLastID');
  }

  //get last group id
  GetLastGroup(){
    return this.http.get(this.APIUrl+'/Users/GetLastGroup');
  }

  // add new group
  insertGroupScreens(val: any){
    return this.http.post(this.APIUrl+'/Users/insertGroupScreens',val);
  }

  // add new group
  insertUserGroup(val: any){
    return this.http.post(this.APIUrl+'/Users/insertUserGroup',val);
  }

  // add new user
  insertUser(val: any){
    return this.http.post(this.APIUrl+'/Users/insertUser',val);
  }

  //delete users
  deleteUser(val: any){
    return this.http.delete(this.APIUrl+'/Users/'+val);
  }

  //get all screens names
  getAllScreens():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Users/getAllScreens');
  }

  // Get Group Screens 
  GetGroupScreens(val: any){
    return this.http.post(this.APIUrl+'/Users/GetGroupScreens',val);
  }

  // Get Group Screens 
  givePriv(val: any){
    return this.http.post(this.APIUrl+'/Users/givePriv',val);
  }

  setScreens(data:any){
    this.ScreensList=data;
  }

  getScreens(){
    return this.ScreensList;
  }

}
