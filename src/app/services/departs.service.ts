import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DepartsService {

  readonly APIUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  /////////////////////// groups api ////////////////////////////////////
  //get all units
  getDepartList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Departs/getAllDeparts');
  }

  // add new units
  addDepart(val: any){
    return this.http.post(this.APIUrl+'/Departs',val);
  }

  //delete units
  deleteDepart(val: any){
    return this.http.delete(this.APIUrl+'/Departs/'+val);
  }

  //get last units id
  getDepartLastId(){
    return this.http.get(this.APIUrl+'/Departs/GetDepartLastID');
  }

}
