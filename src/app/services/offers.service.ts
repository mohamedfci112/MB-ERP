import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  readonly APIUrl = "http://localhost:1195/api";
  constructor(private http:HttpClient) { }

  // add new treasury
  addOffer(val: any){
    return this.http.post(this.APIUrl+'/Offers',val);
  }

  //get last treasury id
  getOfferLastId(){
    return this.http.get(this.APIUrl+'/Offers/GetOfferLastID');
  }

  // add new treasury
  getAllOffers(val: any){
    return this.http.post(this.APIUrl+'/Offers/getAllOffers',val);
  }

  // add new treasury
  getOfferDetails(val: any){
    return this.http.post(this.APIUrl+'/Offers/getOfferDetails',val);
  }

}
