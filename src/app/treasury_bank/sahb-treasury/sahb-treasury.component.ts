import { Component, OnInit } from '@angular/core';
import { TreasurybankService } from '../../services/treasurybank.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-sahb-treasury',
  templateUrl: './sahb-treasury.component.html',
  styleUrls: ['./sahb-treasury.component.css']
})
export class SahbTreasuryComponent implements OnInit {

  total:any;

  treasuryList = <any>[];

  formdata:any;
  constructor(public treasuryService:TreasurybankService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.total = "";
    this.treasuryService.getTreasuryList().subscribe((data : any) => {
      this.treasuryList = data;
    });

    this.formdata = new FormGroup({
      treasury_id: new FormControl(""),
      withdrawal_amount: new FormControl(""),
      withdrawal_date: new FormControl(""),
      withdrawer: new FormControl(""),
      withdrawal_reason: new FormControl(""),
      withdrawal_type: new FormControl("1"),
    });
  }

  myTreasury(lang:any) {
    var val = {treasury_id : lang.target.value};
    this.treasuryService.getTotalBalanceTreasury(val).subscribe((data : any) => {
      this.total = data[0].total;
    });

  }

  addTreasuryWithdrawal(data:any){
    var withData = {
      treasury_id : data.treasury_id,
      withdrawal_amount : data.withdrawal_amount,
      withdrawal_date : data.withdrawal_date,
      withdrawer : data.withdrawer,
      withdrawal_reason : data.withdrawal_reason,
      withdrawal_type : data.withdrawal_type
    };

    var depositData = {
      treasury_id : data.treasury_id,
      deposit_amount : (data.withdrawal_amount * -1),
      deposit_date : data.withdrawal_date,
      depositor : data.withdrawer,
      deposit_reason : data.withdrawal_reason,
      deposit_type : "-1"
    };

    if(data.withdrawal_amount != "" && data.treasury_id !=""){
      if(data.withdrawal_amount > this.total)
      {
        this.pushNotification.show("المبلغ بالخزنة غير كافى", {}, 6000, );
        this.router.navigated = false;
      }
      else
      {
        this.treasuryService.addTreasuryWithdrawal(withData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
          this.ngOnInit();
        });

        this.treasuryService.addTreasuryDeposit(depositData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
          this.ngOnInit();
        });
      }
    }
    else{
      this.pushNotification.show("اختر الخزنة اوالمبلغ فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }

}
