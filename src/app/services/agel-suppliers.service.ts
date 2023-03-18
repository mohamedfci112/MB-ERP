import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AgelSuppliersService {

  readonly APIUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  //add new
  addAgelSupplierAcc(val: any){
    return this.http.post(this.APIUrl+'/AgelSupplier',val);
  }

  //get last treasury id
  getAgelSupplierLastId(){
    return this.http.get(this.APIUrl+'/AgelSupplier/GetAgelSupplierLastID');
  }
  

}
