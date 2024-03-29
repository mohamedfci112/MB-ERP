import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  readonly APIUrl = environment.API_URL;
  constructor(private http:HttpClient) { }

  // add new offer
  addOffer(val: any){
    return this.http.post(this.APIUrl+'/Offers',val);
  }

  // get all offers
  GetAll(){
    return this.http.get(this.APIUrl+'/Offers');
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

  CancelOfferRequest(val:any){
    return this.http.put(this.APIUrl+'/Offers/CancelOfferRequest', val);
  }

}
