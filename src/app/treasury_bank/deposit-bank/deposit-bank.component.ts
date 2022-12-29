import { Component, OnInit } from '@angular/core';
import { TreasurybankService } from '../../services/treasurybank.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-deposit-bank',
  templateUrl: './deposit-bank.component.html',
  styleUrls: ['./deposit-bank.component.css']
})
export class DepositBankComponent implements OnInit {

  total:any;

  bankList = <any>[];
  lastDeposits = <any>[];

  formdata:any;
  constructor(public treasuryService:TreasurybankService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.total = "";
    this.treasuryService.getBankList().subscribe((data : any) => {
      this.bankList = data;
    });

    this.formdata = new FormGroup({
      bank_id: new FormControl(""),
      deposit_amount: new FormControl(""),
      deposit_date: new FormControl(""),
      depositor: new FormControl(""),
      deposit_reason: new FormControl(""),
      deposit_type: new FormControl("1"),
    });
  }

  myBank(lang:any) {
    var val = {bank_id : lang.target.value};
    this.treasuryService.getTotalBalanceBank(val).subscribe((data : any) => {
      this.total = data[0].total;
    });

    this.treasuryService.getLastDepositsBank(val).subscribe((data:any)=>{
      this.lastDeposits = data;
    });

  }

  addBankDeposit(data:any){
    var depositData = {
      bank_id : data.bank_id,
      deposit_amount : data.deposit_amount,
      deposit_date : data.deposit_date,
      depositor : data.depositor,
      deposit_reason : data.deposit_reason,
      deposit_type : data.deposit_type
    };

    if(data.deposit_amount != "" && data.bank_id !=""){
      this.treasuryService.addBankDeposit(depositData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.lastDeposits=[];
        this.ngOnInit();
      });
    }
    else{
      this.pushNotification.show("اختر البنك اوالمبلغ فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }

}
