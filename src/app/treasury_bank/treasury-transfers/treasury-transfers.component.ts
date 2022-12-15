import { Component, OnInit } from '@angular/core';
import { TreasurybankService } from '../../services/treasurybank.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-treasury-transfers',
  templateUrl: './treasury-transfers.component.html',
  styleUrls: ['./treasury-transfers.component.css']
})
export class TreasuryTransfersComponent implements OnInit {

  totalFrom:any;

  totalTo:any;

  treasuryList = <any>[];

  formdata:any;
  constructor(public treasuryService:TreasurybankService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.totalFrom = "";
    this.totalTo = "";

    this.treasuryService.getTreasuryList().subscribe((data : any) => {
      this.treasuryList = data;
    });

    this.formdata = new FormGroup({
      treasury_from_id: new FormControl(""),
      treasury_to_id: new FormControl(""),
      amount: new FormControl(""),
      trans_admin: new FormControl(""),
      trans_date: new FormControl(""),
      reason: new FormControl(""),
      deposit_to_type: new FormControl("2"),
      deposit_from_type: new FormControl("-2"),
    });
  }

  myTreasuryFrom(lang:any) {
    var val = {treasury_id : lang.target.value};
    this.treasuryService.getTotalBalanceTreasury(val).subscribe((data : any) => {
      this.totalFrom = data[0].total;
    });
  }

  myTreasuryTo(lang:any) {
    var val = {treasury_id : lang.target.value};
    this.treasuryService.getTotalBalanceTreasury(val).subscribe((data : any) => {
      this.totalTo = data[0].total;
    });
  }

  addTreasuryTransform(data:any){
    var treasuryFromData = {
      treasury_id : data.treasury_from_id,
      deposit_amount : (data.amount * -1),
      deposit_date : data.trans_date,
      depositor : data.trans_admin,
      deposit_reason : data.reason,
      deposit_type : data.deposit_from_type
    };

    var treasuryToData = {
      treasury_id : data.treasury_to_id,
      deposit_amount : data.amount,
      deposit_date : data.trans_date,
      depositor : data.trans_admin,
      deposit_reason : data.reason,
      deposit_type : data.deposit_to_type
    };

    var transferData = {
      treasury_from_id : data.treasury_from_id,
      treasury_to_id : data.treasury_to_id,
      amount : data.amount,
      trans_admin : data.trans_admin,
      trans_date : data.trans_date,
      reason : data.reason,
    };

    if(data.deposit_amount != "" && data.treasury_from_id !="" && data.treasury_to_id !=""){
      if(data.treasury_from_id == data.treasury_to_id)
      {
        this.pushNotification.show("لا يمكنك اختيار نفس الخزنة", {}, 6000, );
        this.router.navigated = false;
      }
      else if(data.amount > this.totalFrom)
      {
        this.pushNotification.show("رصيد الخزنة لا يكفى", {}, 6000, );
        this.router.navigated = false;
      }
      else
      {
        this.treasuryService.addTreasuryDeposit(treasuryFromData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
          this.ngOnInit();
        });

        this.treasuryService.addTreasuryDeposit(treasuryToData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
          this.ngOnInit();
        });

        this.treasuryService.addTreasuryTransfer(transferData).subscribe((res:any)=>{
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
