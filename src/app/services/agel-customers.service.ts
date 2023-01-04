import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AgelCustomersService {

  readonly APIUrl = "http://localhost:1195/api";

  constructor(private http:HttpClient) { }

  //add 
  addAgelCustomerAcc(val: any){
    return this.http.post(this.APIUrl+'/AgelCustomer',val);
  }

}
