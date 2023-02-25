import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  readonly APIUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  /////////////////////// units api ////////////////////////////////////
  //get all units
  getUnitList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Units/getAllUnits');
  }

  // add new units
  addUnit(val: any){
    return this.http.post(this.APIUrl+'/Units',val);
  }

  //delete units
  deleteUnit(val: any){
    return this.http.delete(this.APIUrl+'/Units/'+val);
  }

  //get last units id
  getUnitLastId(){
    return this.http.get(this.APIUrl+'/Units/GetUnitLastID');
  }

  /////////////////////// groups api ////////////////////////////////////
  //get all units
  getGroupList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Groups/getAllGroups');
  }

  // add new units
  addGroup(val: any){
    return this.http.post(this.APIUrl+'/Groups',val);
  }

  //delete units
  deleteGroup(val: any){
    return this.http.delete(this.APIUrl+'/Groups/'+val);
  }

  //get last units id
  getGroupLastId(){
    return this.http.get(this.APIUrl+'/Groups/GetGroupLastID');
  }

}
