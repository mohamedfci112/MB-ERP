import { Component, OnInit } from '@angular/core';
import { TreasurybankService } from '../../services/treasurybank.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-sahb-bank',
  templateUrl: './sahb-bank.component.html',
  styleUrls: ['./sahb-bank.component.css']
})
export class SahbBankComponent implements OnInit {

  total:any;

  bankList = <any>[];

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
      withdrawal_amount: new FormControl(""),
      withdrawal_date: new FormControl(""),
      withdrawer: new FormControl(""),
      withdrawal_reason: new FormControl(""),
      withdrawal_type: new FormControl("1"),
    });
  }

  myBank(lang:any) {
    var val = {bank_id : lang.target.value};
    this.treasuryService.getTotalBalanceBank(val).subscribe((data : any) => {
      this.total = data[0].total;
    });

  }


  addBankWithdrawal(data:any){
    var withData = {
      bank_id : data.bank_id,
      withdrawal_amount : data.withdrawal_amount,
      withdrawal_date : data.withdrawal_date,
      withdrawer : data.withdrawer,
      withdrawal_reason : data.withdrawal_reason,
      withdrawal_type : data.withdrawal_type
    };

    var depositData = {
      bank_id : data.bank_id,
      deposit_amount : (data.withdrawal_amount * -1),
      deposit_date : data.withdrawal_date,
      depositor : data.withdrawer,
      deposit_reason : data.withdrawal_reason,
      deposit_type : "-1"
    };

    if(data.withdrawal_amount != "" && data.bank_id !=""){
      if(data.withdrawal_amount > this.total)
      {
        this.pushNotification.show("المبلغ بالبنك غير كافى", {}, 6000, );
        this.router.navigated = false;
      }
      else
      {
        this.treasuryService.addBankWithdrawal(withData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
          this.ngOnInit();
        });

        this.treasuryService.addBankDeposit(depositData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
          this.ngOnInit();
        });
      }
    }
    else{
      this.pushNotification.show("اختر البنك اوالمبلغ فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }


}
