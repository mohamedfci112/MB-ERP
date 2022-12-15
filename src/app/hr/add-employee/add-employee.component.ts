import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

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
    this.empService.getEmployeeLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    //
    this.formdata = new FormGroup({
      employeeId: new FormControl(""),
      employeeName: new FormControl(""),
      employeeJob: new FormControl(""),
      employeeSalary: new FormControl(""),
      employeeDueDate: new FormControl(""),
      employeeNationalID: new FormControl(""),
      employeePhone: new FormControl("")
    });

    //

  }

  addEmployee(data:any){
    var empData = {
      emp_id : this.lastId + 1,
      emp_name : data.employeeName,
      emp_job : data.employeeJob,
      emp_salary : data.employeeSalary,
      due_date : data.employeeDueDate,
      emp_national_id : data.employeeNationalID,
      phone : data.employeePhone
    };

    //console.log(supData);

    if(data.emp_name != ""){
      this.empService.addEmployee(empData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.ngOnInit();
      });
    }
    else{
      this.pushNotification.show("اسم الموظف فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }

  // delete employee
  deleteEmployee(){
    var inputs = document.querySelectorAll('input[name=cb]:checked');

    if(confirm('هل انت متأكد؟')){
      if(inputs.length > 0){
        for(var i = 0; i < inputs.length; i++){
          var employeeidvalue = inputs[i].getAttribute("value");
          this.empService.deleteEmployee(employeeidvalue).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
            this.ngOnInit();
          });
        }
        
      }
      else{
        this.pushNotification.show("اختر الموظف الذى تريده", {}, 6000, );
        this.router.navigated = false;
      }
    }
    
    //console.log(inputs[0].getAttribute("value"));
  }


}
