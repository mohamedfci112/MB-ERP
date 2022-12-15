import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-penalties',
  templateUrl: './penalties.component.html',
  styleUrls: ['./penalties.component.css']
})
export class PenaltiesComponent implements OnInit {

  lastId:any;

  employeeList = <any>[];

  formdata:any;

  constructor(public empService:EmployeeService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
   }

  ngOnInit(): void {

    //
    this.empService.getEmployeeList().subscribe((data : any) => {
      this.employeeList = data;
    });

    //
    this.empService.getEmployeePenaltiesDeductionLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    //
    this.formdata = new FormGroup({
      employeeId: new FormControl(""),
      amount: new FormControl(""),
      admin_person: new FormControl(""),
      deduct_date: new FormControl(""),
      due_date: new FormControl(""),
      reason: new FormControl("")
    });

  }

  addPenDed(data:any){
    var empData = {
      emp_id : data.employeeId,
      amount : data.amount,
      admin_person : data.admin_person,
      deduct_date : data.deduct_date,
      due_date : data.due_date,
      reason : data.reason
    };

    if(data.employeeId != ""){
      this.empService.addEmployeePenaltiesDeduction(empData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.ngOnInit();
      });
    }
    else{
      this.pushNotification.show("اختر الموظف من فضلك", {}, 6000, );
      this.router.navigated = false;
    }
    
  }

}
