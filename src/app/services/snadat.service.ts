import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SnadatService {

  readonly APIUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  //get last id
  getLastAbdId(){
    return this.http.get(this.APIUrl+'/Snadat/getLastAbdId');
  }

  //get last id
  getLastSrfId(){
    return this.http.get(this.APIUrl+'/Snadat/getLastSrfId');
  }

  //insert abd snd check
  insertSndAbdCheck(val:any){
    return this.http.post(this.APIUrl+'/Snadat/insertSndAbdCheck', val);
  }

  //insert abd snd check
  insertSndSrfCheck(val:any){
    return this.http.post(this.APIUrl+'/Snadat/insertSndSrfCheck', val);
  }

  //insert abd snd check
  SnadatAbdReport(val:any){
    return this.http.post(this.APIUrl+'/Snadat/SnadatAbdReport', val);
  }

  //insert abd snd check
  SnadatSrfReport(val:any){
    return this.http.post(this.APIUrl+'/Snadat/SnadatSrfReport', val);
  }


  //get all taxable sales invoices
  salesInvoicesTaxable(val:any){
    return this.http.post(this.APIUrl+'/Snadat/salesInvoicesTaxable', val);
  }

  //get all taxable sales taxes
  salesInvoicesTaxes(val:any){
    return this.http.post(this.APIUrl+'/Snadat/salesInvoicesTaxes', val);
  }

  //get all taxable sales return invoices
  salesReturnInvoicesTaxable(val:any){
    return this.http.post(this.APIUrl+'/Snadat/salesReturnInvoicesTaxable', val);
  }

  //get all taxable sales return taxes
  salesReturnInvoicesTaxes(val:any){
    return this.http.post(this.APIUrl+'/Snadat/salesReturnInvoicesTaxes', val);
  }

  //get all taxable purchases invoices
  purchasesInvoicesTaxable(val:any){
    return this.http.post(this.APIUrl+'/Snadat/purchasesInvoicesTaxable', val);
  }

  //get all taxable purchases taxes
  purchasesInvoicesTaxes(val:any){
    return this.http.post(this.APIUrl+'/Snadat/purchasesInvoicesTaxes', val);
  }

  //get all taxable purchases return invoices
  purchasesReturnInvoicesTaxable(val:any){
    return this.http.post(this.APIUrl+'/Snadat/purchasesReturnInvoicesTaxable', val);
  }

  //get all taxable purchases return taxes
  purchasesReturnInvoicesTaxes(val:any){
    return this.http.post(this.APIUrl+'/Snadat/purchasesReturnInvoicesTaxes', val);
  }

}
