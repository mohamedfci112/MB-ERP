import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TreasurybankService {

  readonly APIUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  /////////////////////// treasury api ////////////////////////////////////
  //get all treasury
  getTreasuryList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Treasurybank/getAllTreasury');
  }

  //get main treasury
  getMainTreasury():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Treasurybank/getMainTreasury');
  }

  // add new treasury
  addTreasury(val: any){
    return this.http.post(this.APIUrl+'/Treasurybank/insertTreasury',val);
  }

  //delete treasury
  deleteTreasury(val: any){
    return this.http.delete(this.APIUrl+'/Treasurybank/'+val);
  }

  //get last treasury id
  getTreasuryLastId(){
    return this.http.get(this.APIUrl+'/Treasurybank/GetTreasuryLastID');
  }

  //////////////////////////////// bank api ////////////////////////////////////

   //get all treasury
   getBankList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Bank/getAllBanks');
  }

  // add new treasury
  addBank(val: any){
    return this.http.post(this.APIUrl+'/Bank/insertBank',val);
  }

  //delete treasury
  deleteBank(val: any){
    return this.http.delete(this.APIUrl+'/Bank/'+val);
  }

  //get last treasury id
  getBankLastId(){
    return this.http.get(this.APIUrl+'/Bank/GetBankLastID');
  }


  /////////////////////////////////////////////////////////////////////

  // add new treasury deposit
  addTreasuryDeposit(val: any){
    return this.http.post(this.APIUrl+'/Treasurybank/treasuryDeposit',val);
  }

  // add new treasury withdrawal
  addTreasuryWithdrawal(val: any){
    return this.http.post(this.APIUrl+'/Treasurybank/treasuryWithdrawal',val);
  }

  // add new treasury transfer
  addTreasuryTransfer(val: any){
    return this.http.post(this.APIUrl+'/Treasurybank/treasuryTransfer',val);
  }

  // add new treasury bank transfer
  addTreasuryBankTransfer(val: any){
    return this.http.post(this.APIUrl+'/Treasurybank/treasuryBankTransfer',val);
  }

  //retrive total balance in treasury
  getTotalBalanceTreasury(val: any){
    return this.http.post<any>(this.APIUrl+'/Treasurybank/getTotalBalanceTreasury',val);
  }

  //retrive total balance in main treasury
  getTotalBalanceMainTreasury(){
    return this.http.get<any>(this.APIUrl+'/Treasurybank/getTotalBalanceMainTreasury');
  }


  /////////////////////////////////////////////////////////////////////

  // add new treasury deposit
  addBankDeposit(val: any){
    return this.http.post(this.APIUrl+'/Bank/bankDeposit',val);
  }

  // add new treasury withdrawal
  addBankWithdrawal(val: any){
    return this.http.post(this.APIUrl+'/Bank/bankWithdrawal',val);
  }

  //retrive total balance in treasury
  getTotalBalanceBank(val: any){
    return this.http.post<any>(this.APIUrl+'/Bank/getTotalBalanceBank',val);
  }

  //retrive last deposit in treasury
  getLastDepositsTreasury(val: any){
    return this.http.post<any>(this.APIUrl+'/Treasurybank/getLastDepositsTreasury',val);
  }

  //retrive last deposit in bank
  getLastDepositsBank(val: any){
    return this.http.post<any>(this.APIUrl+'/Bank/getLastDepositsBank',val);
  }

  // get search details
  getTreasuryDepositReport(val:any){
    return this.http.post(this.APIUrl+'/Treasurybank/getTreasuryDepositReport', val);
  }


  // get search details
  getBankDepositReport(val:any){
    return this.http.post(this.APIUrl+'/Bank/getBankDepositReport', val);
  }

  // get search details
  getTreasuryWithdrawReport(val:any){
    return this.http.post(this.APIUrl+'/Treasurybank/getTreasuryWithdrawReport', val);
  }

  // get search details
  getBankWithdrawReport(val:any){
    return this.http.post(this.APIUrl+'/Bank/getBankWithdrawReport', val);
  }

  // get search details
  getTreasuryTransfersReport(val:any){
    return this.http.post(this.APIUrl+'/Treasurybank/getTreasuryTransfersReport', val);
  }

  // get search details
  getTreasuryBankTransfersReport(val:any){
    return this.http.post(this.APIUrl+'/Treasurybank/getTreasuryBankTransfersReport', val);
  }


}
