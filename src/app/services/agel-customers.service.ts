import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AgelCustomersService {

  readonly APIUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  //add 
  addAgelCustomerAcc(val: any){
    return this.http.post(this.APIUrl+'/AgelCustomer',val);
  }

  //get last treasury id
  getAgelCustomerLastId(){
    return this.http.get(this.APIUrl+'/AgelCustomer/GetAgelCustomerLastID');
  }


}
