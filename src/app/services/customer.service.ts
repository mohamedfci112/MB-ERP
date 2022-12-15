import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly APIUrl = "http://localhost:1195/api";

  constructor(private http:HttpClient) { }

  /////////////////////// customer api ////////////////////////////////////

  //get all treasury
  getCustomerList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Customer/getAllCustomers');
  }

  // add new treasury
  addCustomer(val: any){
    return this.http.post(this.APIUrl+'/Customer',val);
  }

  // update supplier
  updateCustomer(val: any){
    return this.http.put(this.APIUrl+'/Customer',val);
  }

  //delete treasury
  deleteCustomer(val: any){
    return this.http.delete(this.APIUrl+'/Customer/'+val);
  }

  //get last treasury id
  getCustomerLastId(){
    return this.http.get(this.APIUrl+'/Customer/GetCustomerLastID');
  }

  // get search results
  getSearchResult(val:any){
    var listOfCustomers = this.http.post(this.APIUrl+'/Customer/GetAllCustomersSearch', val);
    return listOfCustomers;
  }

  // get search details
  GetCustomerSearch(val:any){
    var listOfCustomers = this.http.post(this.APIUrl+'/Customer/GetCustomerSearch', val);
    return listOfCustomers;
  }

}
