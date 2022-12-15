import { Component, OnInit } from '@angular/core';
import { TreasurybankService } from '../../services/treasurybank.service';
import { ExpensesService } from '../../services/expenses.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-manage-masrof',
  templateUrl: './manage-masrof.component.html',
  styleUrls: ['./manage-masrof.component.css']
})
export class ManageMasrofComponent implements OnInit {

  total:any;

  lastId:any = "1";

  treasuryList = <any>[];

  expensesList = <any>[];

  formdata:any;

  constructor(public expService:ExpensesService, public treasuryService:TreasurybankService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.total = "";
    this.treasuryService.getTreasuryList().subscribe((data : any) => {
      this.treasuryList = data;
    });

    this.expService.getExpensesTypesList().subscribe((data : any) => {
      this.expensesList = data;
    });

    this.expService.getExpenseDetailsLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    this.formdata = new FormGroup({
      exp_id: new FormControl(""),
      amount: new FormControl(""),
      treasury_id: new FormControl(""),
      exp_date: new FormControl(""),
      notes: new FormControl(""),
      deposit_type: new FormControl("-9")
    });
  }

  myTreasury(lang:any) {
    var val = {treasury_id : lang.target.value};
    this.treasuryService.getTotalBalanceTreasury(val).subscribe((data : any) => {
      this.total = data[0].total;
    });

  }

  addExpensesDetails(data:any){
    var expensesData = {
      exp_id : data.exp_id,
      amount : data.amount,
      treasury_id : data.treasury_id,
      exp_date : data.exp_date,
      notes : data.notes
    };

    var depositData = {
      treasury_id : data.treasury_id,
      deposit_amount : (data.amount * -1),
      deposit_date : data.exp_date,
      depositor : "user",
      deposit_reason : "مصروف",
      deposit_type : data.deposit_type
    };

    if(data.amount != "" && data.treasury_id !="" && data.exp_id !=""){
      if(data.amount > this.total)
      {
        this.pushNotification.show("المبلغ بالخزنة غير كافى", {}, 6000, );
        this.router.navigated = false;
      }
      else
      {
        this.treasuryService.addTreasuryDeposit(depositData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.ngOnInit();
        });

        this.expService.addExpenseDetails(expensesData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.ngOnInit();
        });

      }
      
    }
    else{
      this.pushNotification.show("اختر الخزنة والمصروف اوالمبلغ فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }

}
