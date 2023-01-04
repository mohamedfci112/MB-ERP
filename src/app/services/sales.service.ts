import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  readonly APIUrl = "http://localhost:1195/api";

  constructor(private http:HttpClient) { }

  //get last id
  getLastEznSarfId(){
    return this.http.get(this.APIUrl+'/Sales/getLastEznSarfId');
  }

  //get last id
  getLastSalesInvId(){
    return this.http.get(this.APIUrl+'/Sales/getLastSalesInvId');
  }

  //insert ezn srf
  insertEznSrf(val:any){
    return this.http.post(this.APIUrl+'/Sales/insertEznSrf', val);
  }

  //update inventory quantity
  EditInventoryQuantitySales(val:any){
    return this.http.put(this.APIUrl+'/Sales/EditInventoryQuantitySales', val);
  }

  // get all ezn srf
  GetAll(){
    return this.http.get(this.APIUrl+'/Sales');
  }

  // add new treasury
  getEznSrfDetails(val: any){
    return this.http.post(this.APIUrl+'/Sales/getEznSrfDetails',val);
  }

  //get Sales report
  getSalesReport(val:any){
    return this.http.post(this.APIUrl+'/Sales/getSalesReport', val);
  }

  //get Sales summery report
  getSalesSummeryReport(val:any){
    return this.http.post(this.APIUrl+'/Sales/getSalesSummeryReport', val);
  }

}
