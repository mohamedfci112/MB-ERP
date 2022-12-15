import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  readonly APIUrl = "http://localhost:1195/api";

  constructor(private http:HttpClient) { }

  getInvList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/inventory');
  }

  addInventory(val: any){
    return this.http.post(this.APIUrl+'/inventory',val);
  }

  updateInventory(val: any){
    return this.http.put(this.APIUrl+'/inventory',val);
  }

  deleteInventory(val: any){
    return this.http.delete(this.APIUrl+'/inventory/'+val);
  }

  getLastId(){
    return this.http.get(this.APIUrl+'/inventory/GetAllLastID');
  }
  
  getSearchResult(val:any){
    var listOfInventory = this.http.post(this.APIUrl+'/inventory/GetAllInventoriesSearch', val);
    return listOfInventory;
  }

  GetInventoriesSearch(val:any){
    var listOfInventory = this.http.post(this.APIUrl+'/inventory/GetInventoriesSearch', val);
    return listOfInventory;
  }

  /////////////////////////////////////
  addInventoryItems(val:any):Observable<any[]>{
    return this.http.post<any>(this.APIUrl+'/inventory/AddInventoryItems', val);
  }

}
