import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  readonly APIUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  /////////////////////// supplier api ////////////////////////////////////
  //get all treasury
  getSupplierList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Supplier/getAllSuppliers');
  }

  // add new treasury
  addSupplier(val: any){
    return this.http.post(this.APIUrl+'/Supplier',val);
  }

  // update supplier
  updateSupplier(val: any){
    return this.http.put(this.APIUrl+'/Supplier',val);
  }

  //delete treasury
  deleteSupplier(val: any){
    return this.http.delete(this.APIUrl+'/Supplier/'+val);
  }

  //get last treasury id
  getSupplierLastId(){
    return this.http.get(this.APIUrl+'/Supplier/GetSupplierLastID');
  }

  // get search results
  getSearchResult(val:any){
    var listOfSuppliers = this.http.post(this.APIUrl+'/Supplier/GetAllSuppliersSearch', val);
    return listOfSuppliers;
  }

  // get search details
  GetSupplierSearch(val:any){
    var listOfSuppliers = this.http.post(this.APIUrl+'/Supplier/GetSuppliersSearch', val);
    return listOfSuppliers;
  }

  //insert customer mosdad
  insertMosdadSupplier(val:any){
    return this.http.post(this.APIUrl+'/Supplier/insertMosdadSupplier', val);
  }

  // get search details
  GetSuppliersMosdadSearch(val:any){
    var listOfSuppliers = this.http.post(this.APIUrl+'/Supplier/GetSuppliersMosdadSearch', val);
    return listOfSuppliers;
  }

  // get search details
  GetSupplierPaymentsSearch(val:any){
    var listOfCustomers = this.http.post(this.APIUrl+'/Supplier/GetSupplierPaymentsSearch', val);
    return listOfCustomers;
  }

}
