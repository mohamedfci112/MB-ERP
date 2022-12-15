import { Component, OnInit } from '@angular/core';
import { TreasurybankService } from '../../services/treasurybank.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-treasury-bank-transfers',
  templateUrl: './treasury-bank-transfers.component.html',
  styleUrls: ['./treasury-bank-transfers.component.css']
})
export class TreasuryBankTransfersComponent implements OnInit {

  totalTreasury:any;

  totalBank:any;

  treasuryList = <any>[];

  bankList = <any>[];

  formdata:any;
  constructor(public treasuryService:TreasurybankService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.totalTreasury = "";
    this.totalBank = "";

    this.treasuryService.getTreasuryList().subscribe((data : any) => {
      this.treasuryList = data;
    });

    this.treasuryService.getBankList().subscribe((data : any) => {
      this.bankList = data;
    });

    this.formdata = new FormGroup({
      treasury_id: new FormControl(""),
      bank_id: new FormControl(""),
      amount: new FormControl(""),
      trans_admin: new FormControl(""),
      trans_date: new FormControl(""),
      reason: new FormControl(""),
      trans_type: new FormControl(""),
    });
  }

  myTreasury(lang:any) {
    var val = {treasury_id : lang.target.value};
    this.treasuryService.getTotalBalanceTreasury(val).subscribe((data : any) => {
      this.totalTreasury = data[0].total;
    });
  }

  myBank(lang:any) {
    var val = {bank_id : lang.target.value};
    this.treasuryService.getTotalBalanceBank(val).subscribe((data : any) => {
      this.totalBank = data[0].total;
    });
  }


  addTreasuryBankTransform(data:any)
  {
    // from bank to treasury
    if(data.trans_type == "3")
    {
      var treasuryData = {
        treasury_id : data.treasury_id,
        deposit_amount : data.amount,
        deposit_date : data.trans_date,
        depositor : data.trans_admin,
        deposit_reason : data.reason,
        deposit_type : data.trans_type
      };
  
      var bankData = {
        bank_id : data.bank_id,
        deposit_amount : (data.amount * -1),
        deposit_date : data.trans_date,
        depositor : data.trans_admin,
        deposit_reason : data.reason,
        deposit_type : (data.trans_type * -1)
      };

      var transferData = {
        treasury_id : data.treasury_id,
        bank_id : data.bank_id,
        amount : data.amount,
        trans_admin : data.trans_admin,
        trans_date : data.trans_date,
        reason : data.reason,
        trans_type : data.trans_type,
      };

      if(data.amount != "" && data.treasury_id !="" && data.bank_id !="")
      {
        if(data.amount > this.totalBank)
        {
          this.pushNotification.show("رصيد البنك لا يكفى", {}, 6000, );
          this.router.navigated = false;
        }
        else
        {
          this.treasuryService.addTreasuryDeposit(treasuryData).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
            this.ngOnInit();
          });

          this.treasuryService.addBankDeposit(bankData).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
            this.ngOnInit();
          });

          this.treasuryService.addTreasuryBankTransfer(transferData).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
            this.ngOnInit();
          });
        }
      }
      else
      {
        this.pushNotification.show("اختر الخزنة و البنك اوالمبلغ فارغ", {}, 6000, );
        this.router.navigated = false;
      }
    }
    else
    {
      var treasuryData1 = {
        treasury_id : data.treasury_id,
        deposit_amount : (data.amount * -1),
        deposit_date : data.trans_date,
        depositor : data.trans_admin,
        deposit_reason : data.reason,
        deposit_type : data.trans_type
      };
  
      var bankData1 = {
        bank_id : data.bank_id,
        deposit_amount : data.amount,
        deposit_date : data.trans_date,
        depositor : data.trans_admin,
        deposit_reason : data.reason,
        deposit_type : (data.trans_type * -1)
      };

      var transferData1 = {
        treasury_id : data.treasury_id,
        bank_id : data.bank_id,
        amount : data.amount,
        trans_admin : data.trans_admin,
        trans_date : data.trans_date,
        reason : data.reason,
        trans_type : data.trans_type,
      };

      if(data.amount != "" && data.treasury_id !="" && data.bank_id !="")
      {
        if(data.amount > this.totalTreasury)
        {
          this.pushNotification.show("رصيد الخزنة لا يكفى", {}, 6000, );
          this.router.navigated = false;
        }
        else
        {
          this.treasuryService.addTreasuryDeposit(treasuryData1).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
            this.ngOnInit();
          });

          this.treasuryService.addBankDeposit(bankData1).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
            this.ngOnInit();
          });

          this.treasuryService.addTreasuryBankTransfer(transferData1).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
            this.ngOnInit();
          });
        }
      }
      else
      {
        this.pushNotification.show("اختر الخزنة و البنك اوالمبلغ فارغ", {}, 6000, );
        this.router.navigated = false;
      }
    }
    
  }

}
