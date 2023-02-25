import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly APIUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  getProductList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Products/getAllProducts');
  }

  addProduct(val: any){
    return this.http.post(this.APIUrl+'/Products',val);
  }

  getProductLastId(){
    return this.http.get(this.APIUrl+'/Products/GetProductLastID');
  }

  getAllProductsLimits():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Products/getAllProductsLimits');
  }

  getAllProductsDetails():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Products/getAllProductsDetails');
  }

  // 
  salesOperations(val: any){
    return this.http.post(this.APIUrl+'/Products/salesOperations',val);
  }

  // 
  purchasesOperations(val: any){
    return this.http.post(this.APIUrl+'/Products/purchasesOperations',val);
  }

  // 
  salesReturnOperations(val: any){
    return this.http.post(this.APIUrl+'/Products/salesReturnOperations',val);
  }

  // 
  purchasesReturnOperations(val: any){
    return this.http.post(this.APIUrl+'/Products/purchasesReturnOperations',val);
  }

  // 
  inventoryBalance(val: any){
    return this.http.post(this.APIUrl+'/Products/inventoryBalance',val);
  }

}
