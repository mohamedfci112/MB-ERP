import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AdvancesService {

  //readonly APIUrl = "http://localhost:90/api";
  readonly APIUrl = "http://localhost:1195/api";

  constructor(private http:HttpClient) { }

  //add advance
  addAdvance(val: any){
    return this.http.post(this.APIUrl+'/Advance',val);
  }

  //get last id
  getLastId(){
    return this.http.get(this.APIUrl+'/Advance/GetLastID');
  }


}
