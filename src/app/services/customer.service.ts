import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly APIUrl = environment.API_URL;
  //readonly APIUrl = "http://localhost:90/api";

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

  // get customer details
  GetCustomerData(val:any){
    var listOfCustomers = this.http.post(this.APIUrl+'/Customer/GetCustomerData', val);
    return listOfCustomers;
  }


  // get search details
  GetAgelCustomersSearch(val:any){
    var listOfCustomers = this.http.post(this.APIUrl+'/Customer/GetAgelCustomersSearch', val);
    return listOfCustomers;
  }

  //insert customer mosdad
  insertMosdadCustomer(val:any){
    return this.http.post(this.APIUrl+'/Customer/insertMosdadCustomer', val);
  }

  // get search details
  GetAgelCustomersMosdadSearch(val:any){
    var listOfCustomers = this.http.post(this.APIUrl+'/Customer/GetAgelCustomersMosdadSearch', val);
    return listOfCustomers;
  }

  // get search details
  GetCustomerPaymentsSearch(val:any){
    var listOfCustomers = this.http.post(this.APIUrl+'/Customer/GetCustomerPaymentsSearch', val);
    return listOfCustomers;
  }

}
