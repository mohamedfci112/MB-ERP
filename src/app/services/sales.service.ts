import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  readonly APIUrl = environment.API_URL;

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

  // get sales invoice search
  GetAllSaleSearch(val:any){
    var listOfInventory = this.http.post(this.APIUrl+'/Sales/GetAllSaleSearch', val);
    return listOfInventory;
  }

  // get sales invoice search
  GetSalesInvoiceSearch(val:any){
    var listOfInventory = this.http.post(this.APIUrl+'/Sales/GetSalesInvoiceSearch', val);
    return listOfInventory;
  }

  insertReturnedTable(val:any){
    return this.http.post(this.APIUrl+'/Sales/insertReturnedTable', val);
  }

  //insert returned all invoice
  insertReturnedSalesAll(val: any){
    return this.http.put(this.APIUrl+'/Sales/insertReturnedSalesAll',val);
  }

  //get purchasing report
  getSalesReturnedReport(val:any){
    return this.http.post(this.APIUrl+'/Sales/getSalesReturnedReport', val);
  }

  //get arbah report
  getArbahSalesDetails(val:any){
    return this.http.post(this.APIUrl+'/Sales/getArbahSalesDetails', val);
  }

  //get arbah report
  getArbahPurchDetails(val:any){
    return this.http.post(this.APIUrl+'/Sales/getArbahPurchDetails', val);
  }

  CancelEznSrfInv(val:any){
    return this.http.put(this.APIUrl+'/Sales/CancelEznSrfInv', val);
  }

}
