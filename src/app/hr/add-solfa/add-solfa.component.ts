import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { AdvancesService } from '../../services/advances.service';
import { TreasurybankService } from '../../services/treasurybank.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-solfa',
  templateUrl: './add-solfa.component.html',
  styleUrls: ['./add-solfa.component.css']
})
export class AddSolfaComponent implements OnInit {

  lastId:any;

  employeeList = <any>[];

  treasuryList = <any>[];

  treasuryBalance:any = 0;

  person:any="";
  employee:any="";

  type:any;

  formdata:any;

  constructor(public treaService:TreasurybankService, public advService:AdvancesService, public empService:EmployeeService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
   }

  ngOnInit(): void {
    this.person = "";
    this.employee = "";
    this.treasuryBalance = 0;
    //getEmployeeList
    this.empService.getEmployeeList().subscribe((data : any) => {
      this.employeeList = data;
    });
    //getTreasuryList
    this.treaService.getTreasuryList().subscribe((data : any) => {
      this.treasuryList = data;
    });

    //
    this.advService.getLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    //
    this.formdata = new FormGroup({
      adv_id: new FormControl(""),
      emp_id: new FormControl(""),
      person_name: new FormControl(""),
      due_date: new FormControl(""),
      adv_amount: new FormControl(""),
      creditor: new FormControl(""),
      notes: new FormControl(""),
      type: new FormControl(""),
      treasury_id: new FormControl(""),
      deposit_type: new FormControl("-7"),
    });
  }

  onItemChange(event:any)
  {
    if(event.target.checked)
    {
      if(event.target.value == "person")
      {
        this.person = "person";
        this.employee = "";
        this.type = 0;
        var x = document.getElementById("mySelect") as HTMLInputElement | null;
        if(x != null){
          x.disabled = false;
        }
        var x1 = document.getElementById("mySelect1") as HTMLSelectElement | null;
        if(x1 != null){
          x1.disabled = true;
        }
      }
      else if(event.target.value == "employee")
      {
        this.person= "";
        this.employee = "employee";
        this.type = 1;
        var x = document.getElementById("mySelect") as HTMLInputElement | null;
        if(x != null){
          x.disabled = true;
        }
        var x1 = document.getElementById("mySelect1") as HTMLSelectElement | null;
        if(x1 != null){
          x1.disabled = false;
        }
      }
    }
  }

  Balance(event:any)
  {
    var id = event.target.value;
    var dta = {treasury_id: id};
    this.treaService.getTotalBalanceTreasury(dta).subscribe((data:any)=>{
      this.treasuryBalance = data[0].total;
    });
  }

  addAdvance(data:any){
    var empData = {
      adv_id : this.lastId+1,
      emp_id : data.emp_id,
      person_name : data.person_name,
      due_date : data.due_date,
      adv_amount : data.adv_amount,
      creditor : data.creditor,
      notes : data.notes,
      type : this.type,
      treasury_id : data.treasury_id,
    };

    var depositData = {
      treasury_id : data.treasury_id,
      deposit_amount : (data.adv_amount * -1),
      deposit_date : data.due_date,
      depositor : data.creditor,
      deposit_reason : data.notes,
      deposit_type : data.deposit_type
    };

    if(data.treasury_id == "")
    {
      this.pushNotification.show("اخترالخزنة", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.adv_amount == "")
    {
      this.pushNotification.show("ادخل المبلغ", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.adv_amount > this.treasuryBalance)
    {
      this.pushNotification.show("المبلغ بالخزنة غير كافى", {}, 6000, );
      this.router.navigated = false;
    }
    else if(this.person=="" && this.employee=="")
    {
      this.pushNotification.show("اختر موظف ام شخص؟", {}, 6000, );
      this.router.navigated = false;
    }
    else if(this.person != "" && data.person_name == "")
    {
      this.pushNotification.show("ادخل اسم الشخص", {}, 6000, );
      this.router.navigated = false;
    }
    else if(this.employee != "" && data.emp_id == "")
    {
      this.pushNotification.show("اختر اسم الموظف", {}, 6000, );
      this.router.navigated = false;
    }
    else{
      this.advService.addAdvance(empData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.ngOnInit();
      });

      this.treaService.addTreasuryDeposit(depositData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.ngOnInit();
      });
    }
    
  }

}
