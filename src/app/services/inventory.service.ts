import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  readonly APIUrl = environment.API_URL;

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

  // get gard inventory
  GardInventory(){
    var listOfInventory = this.http.get(this.APIUrl+'/inventory/GardInventory');
    return listOfInventory;
  }

  // get gard inventory
  GardOneInventory(val:any){
    var listOfInventory = this.http.post(this.APIUrl+'/inventory/GardOneInventory', val);
    return listOfInventory;
  }

  //retrive total balance in inventory
  getTotalBalanceInventory(val: any){
    return this.http.post<any>(this.APIUrl+'/inventory/getTotalBalanceInventory',val);
  }

  // add inventory transfers
  TransferInventoryItems(val:any):Observable<any[]>{
    return this.http.post<any>(this.APIUrl+'/inventory/TransferInventoryItems', val);
  }

  // update quantity
  EditInventoryQuantity(val: any){
    return this.http.put(this.APIUrl+'/inventory/EditInventoryQuantity',val);
  }

  // get InventoryTransfersReport
  InventoryTransfersReport(val: any){
    var listOfInventory = this.http.post(this.APIUrl+'/inventory/InventoryTransfersReport',val);
    return listOfInventory;
  }

  // get InventoryTransfersReport
  InventoryTransfersReport1(val: any){
    var listOfInventory = this.http.post(this.APIUrl+'/inventory/InventoryTransfersReport1',val);
    return listOfInventory;
  }

  // get InventoryTransfersReport
  WithInventoryTransfersReport(val: any){
    var listOfInventory = this.http.post(this.APIUrl+'/inventory/WithInventoryTransfersReport',val);
    return listOfInventory;
  }

  // get InventoryTransfersReport
  WithInventoryTransfersReport1(val: any){
    var listOfInventory = this.http.post(this.APIUrl+'/inventory/WithInventoryTransfersReport1',val);
    return listOfInventory;
  }


  // get product search
  getProductSearchResult(val:any){
    var listOfInventory = this.http.post(this.APIUrl+'/inventory/GetAllProductSearch', val);
    return listOfInventory;
  }

  GetProductSearch(val:any){
    var listOfInventory = this.http.post(this.APIUrl+'/inventory/GetProductSearch', val);
    return listOfInventory;
  }

  updateCostInventory(val: any){
    return this.http.put(this.APIUrl+'/inventory/updateCostInventory',val);
  }

  updateQuantityInventory(val: any){
    return this.http.put(this.APIUrl+'/inventory/updateQuantityInventory',val);
  }

  changeQuantityInventory(val: any){
    return this.http.post(this.APIUrl+'/inventory/changeQuantityInventory',val);
  }

  changeCostInventory(val: any){
    return this.http.post(this.APIUrl+'/inventory/changeCostInventory',val);
  }

  // insert talf
  addInventoryTalf(val: any){
    return this.http.post(this.APIUrl+'/inventory/addInventoryTalf',val);
  }

  GetTalfReport(val:any){
    var listOfInventory = this.http.post(this.APIUrl+'/inventory/GetTalfReport', val);
    return listOfInventory;
  }


  // update after make purchase invoice
  EditInventoryQuantityPurchase(val: any){
    return this.http.put(this.APIUrl+'/inventory/EditInventoryQuantityPurchase',val);
  }

  // get GetLastQuantityEdits
  GetLastQuantityEdits(){
    var listOfInventory = this.http.get(this.APIUrl+'/inventory/GetLastQuantityEdits');
    return listOfInventory;
  }

  // get GetLastCostEdits
  GetLastCostEdits(){
    var listOfInventory = this.http.get(this.APIUrl+'/inventory/GetLastCostEdits');
    return listOfInventory;
  }


  // update after make purchase invoice
  EditInventoryQuantityReturnedPurchase(val: any){
    return this.http.put(this.APIUrl+'/inventory/EditInventoryQuantityReturnedPurchase',val);
  }

}
