import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  readonly APIUrl = "http://localhost:1195/api";

  constructor(private http:HttpClient) { }

  //add purchase invoice
  addPurchaseInvoice(val: any){
    return this.http.post(this.APIUrl+'/Purchases',val);
  }

  GetProductSearch(val:any){
    return this.http.post(this.APIUrl+'/Purchases/GetProductSearch', val);
  }

  //get last id
  getLastId(){
    return this.http.get(this.APIUrl+'/Purchases/getLastId');
  }

  //get purchasing report
  getPurchasingReport(val:any){
    return this.http.post(this.APIUrl+'/Purchases/getPurchasingReport', val);
  }

  //get purchasing summery report
  getPurchasingSummeryReport(val:any){
    return this.http.post(this.APIUrl+'/Purchases/getPurchasingSummeryReport', val);
  }

  // get product search
  getPurchaseSearchResult(val:any){
    var listOfInventory = this.http.post(this.APIUrl+'/Purchases/GetAllPurchaseSearch', val);
    return listOfInventory;
  }

  // get product search
  GetPurchasesSearch(val:any){
    var listOfInventory = this.http.post(this.APIUrl+'/Purchases/GetPurchasesSearch', val);
    return listOfInventory;
  }

  //insert returned all invoice
  insertReturnedPurchasesAll(val: any){
    return this.http.put(this.APIUrl+'/Purchases/insertReturnedPurchasesAll',val);
  }

}
