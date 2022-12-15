import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly APIUrl = "http://localhost:1195/api";

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

}
