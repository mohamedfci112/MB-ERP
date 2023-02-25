import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdvancesService {

  //readonly APIUrl = "http://localhost:90/api";
  readonly APIUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  //add advance
  addAdvance(val: any){
    return this.http.post(this.APIUrl+'/Advance',val);
  }

  //get last id
  getLastId(){
    return this.http.get(this.APIUrl+'/Advance/GetLastID');
  }

  //GetAdvancesReport
  GetAdvancesReport(val:any){
    return this.http.post(this.APIUrl+'/Advance/GetAdvancesReport', val);
  }


}
