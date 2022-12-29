import { Component, OnInit } from '@angular/core';
import { TreasurybankService } from '../../services/treasurybank.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-deposit-treasury',
  templateUrl: './deposit-treasury.component.html',
  styleUrls: ['./deposit-treasury.component.css']
})
export class DepositTreasuryComponent implements OnInit {

  total:any;

  treasuryList = <any>[];

  lastDeposits = <any>[];

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
      deposit_amount: new FormControl(""),
      deposit_date: new FormControl(""),
      depositor: new FormControl(""),
      deposit_reason: new FormControl(""),
      deposit_type: new FormControl("1"),
    });
  }

  myTreasury(lang:any) {
    var val = {treasury_id : lang.target.value};
    this.treasuryService.getTotalBalanceTreasury(val).subscribe((data : any) => {
      this.total = data[0].total;
    });

    this.treasuryService.getLastDepositsTreasury(val).subscribe((data:any)=>{
      this.lastDeposits = data;
    });

  }

  addTreasuryDeposit(data:any){
    var depositData = {
      treasury_id : data.treasury_id,
      deposit_amount : data.deposit_amount,
      deposit_date : data.deposit_date,
      depositor : data.depositor,
      deposit_reason : data.deposit_reason,
      deposit_type : data.deposit_type
    };

    if(data.deposit_amount != "" && data.treasury_id !=""){
      this.treasuryService.addTreasuryDeposit(depositData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.lastDeposits=[];
        this.ngOnInit();
      });
    }
    else{
      this.pushNotification.show("اختر الخزنة اوالمبلغ فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }

}
