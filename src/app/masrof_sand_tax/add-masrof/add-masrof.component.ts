import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-masrof',
  templateUrl: './add-masrof.component.html',
  styleUrls: ['./add-masrof.component.css']
})
export class AddMasrofComponent implements OnInit {

  lastId:any;

  expensesTypesList = <any>[];

  formdata:any;

  constructor(public expService:ExpensesService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
   }

  ngOnInit(): void {

    //
    this.expService.getExpensesTypesList().subscribe((data : any) => {
      this.expensesTypesList = data;
    });

    //
    this.expService.getExpenseTypeLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    //
    this.formdata = new FormGroup({
      expId: new FormControl(""),
      expName: new FormControl("")
    });

  }


  addExpenses(data:any){
    var expData = {
      exp_id : this.lastId + 1,
      exp_name : data.expName
    };

    if(data.expName != ""){
      this.expService.addExpenseType(expData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.ngOnInit();
      });
    }
    else{
      this.pushNotification.show("اسم المصروف فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }


  // delete Expenses
  deleteExpenses(){
    var inputs = document.querySelectorAll('input[name=cb]:checked');

    if(confirm('هل انت متأكد؟')){
      if(inputs.length > 0){
        for(var i = 0; i < inputs.length; i++){
          var expidvalue = inputs[i].getAttribute("value");
          this.expService.deleteExpenseType(expidvalue).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
            this.ngOnInit();
          });
        }
        
      }
      else{
        this.pushNotification.show("اختر المصروف الذى تريده", {}, 6000, );
        this.router.navigated = false;
      }
    }
    
  }


}
