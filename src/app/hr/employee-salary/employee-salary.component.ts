import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { SalariesService } from '../../services/salaries.service';
import { AdvancesService } from '../../services/advances.service';
import { TreasurybankService } from '../../services/treasurybank.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.css']
})
export class EmployeeSalaryComponent implements OnInit {

  lastId:any;

  lastAdvId:any;
  lastPenId:any;

  employeeList = <any>[];

  treasuryList = <any>[];

  advancesList = <any>[];
  penaltiesList = <any>[];

  treasuryBalance:any = 0;

  formdata:any;

  totalEmpAdvances:any;
  totalEmpPenalties:any;

  totalAdvPen:any;

  empSalary:any;

  empSalaryAfter:any;


  emp_id:any;

  dateFrom:any;
  dateTo:any;

  constructor(public advService:AdvancesService, public treaService:TreasurybankService, public salService:SalariesService, public empService:EmployeeService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
   }

  ngOnInit(): void {

    var x = document.getElementById("dateFrom") as HTMLInputElement;
    var y = document.getElementById("dateTo") as HTMLInputElement;
    var z = document.getElementById("searchBtn") as HTMLButtonElement;

    if(x != null){x.disabled=true}
    if(y != null){y.disabled=true}
    if(z != null){z.disabled=true;}

    this.totalEmpAdvances=0;
    this.totalEmpPenalties=0;
    this.totalAdvPen=0;
    this.empSalary=0;
    this.empSalaryAfter=0;

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
    this.salService.getLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    //
    this.advService.getLastId().subscribe((data : any) => {
      this.lastAdvId = data[0].Column1;
    });

    //
    this.empService.getEmployeePenaltiesDeductionLastId().subscribe((data : any) => {
      this.lastPenId = data[0].Column1;
    });

    //
    this.formdata = new FormGroup({
      ezn_no: new FormControl(""),
      emp_id: new FormControl(""),
      ezn_date: new FormControl(""),
      due_date: new FormControl(""),
      salary: new FormControl(""),
      advances: new FormControl(""),
      salary_after: new FormControl(""),
      notes: new FormControl(""),
      treasury_id: new FormControl(""),
      date_from: new FormControl(""),
      date_to: new FormControl(""),
      deposit_type: new FormControl("-8"),
    });

  }

  Balance(event:any)
  {
    var id = event.target.value;
    var dta = {treasury_id: id};
    this.treaService.getTotalBalanceTreasury(dta).subscribe((data:any)=>{
      this.treasuryBalance = data[0].total;
    });
  }

  Employee(event:any)
  {
    if(event.target.value != "")
    {
      var x = document.getElementById("dateFrom") as HTMLInputElement;
      var y = document.getElementById("dateTo") as HTMLInputElement;
      var z = document.getElementById("searchBtn") as HTMLButtonElement;

      if(x != null){x.disabled=false}
      if(y != null){y.disabled=false}
      if(z != null){z.disabled=false;}

      this.emp_id = event.target.value;
    }
    else
    {
      var x = document.getElementById("dateFrom") as HTMLInputElement;
      var y = document.getElementById("dateTo") as HTMLInputElement;
      var z = document.getElementById("searchBtn") as HTMLButtonElement;

      if(x != null){x.disabled=true}
      if(y != null){y.disabled=true}
      if(z != null){z.disabled=true;}
    }

    var id = {emp_id : event.target.value};

    this.salService.GetEmpAdvances(id).subscribe((advanc:any)=>{
      this.totalEmpAdvances = advanc[0].total_advances;

      this.salService.GetEmpPenalties(id).subscribe((penalt:any)=>{
        this.totalEmpPenalties = penalt[0].total_penalties;
        this.totalAdvPen = this.totalEmpAdvances + this.totalEmpPenalties;

        //
        this.salService.GetEmpSalary(id).subscribe((sal:any)=>{
          this.empSalary = sal[0].emp_salary;
          this.empSalaryAfter = this.empSalary - this.totalAdvPen;
        });

      });
      
    });
    
  }
  getDateFrom(event:any)
  {
    this.dateFrom = event.target.value;
  }
  getDateTo(event:any)
  {
    this.dateTo = event.target.value;
  }

  search()
  {
    var serchData = 
    {
      emp_id: this.emp_id,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo
    }

    this.salService.GetTotalEmpAdvances(serchData).subscribe((data:any)=>{
      this.advancesList = data;
    });

    this.salService.GetTotalEmpPenalties(serchData).subscribe((data:any)=>{
      this.penaltiesList = data;
    });

  }

  addSalary(data:any)
  {

    if(data.treasury_id == "")
    {
      this.pushNotification.show("اختر الخزنة", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.emp_id == "")
    {
      this.pushNotification.show("اختر الموظف", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.ezn_date == "")
    {
      this.pushNotification.show("ادخل تاريخ اذن الصرف", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.due_date == "")
    {
      this.pushNotification.show("ادخل تاريخ الاستحقاق", {}, 6000, );
      this.router.navigated = false;
    }
    else if(this.empSalaryAfter > this.treasuryBalance)
    {
      this.pushNotification.show("المبلغ بالخزنة غير كافى", {}, 6000, );
      this.router.navigated = false;
    }
    else
    {
      var dta;
      var advData;
      var penData;
      var depositData;
      if(this.empSalaryAfter <= 0)
      {
        dta = 
        {
          ezn_no: this.lastId+1,
          emp_id: data.emp_id,
          ezn_date: data.ezn_date,
          due_date: data.due_date,
          salary: this.empSalary,
          advances: this.totalAdvPen,
          salary_after: this.empSalaryAfter,
          notes: data.notes,
          treasury_id: data.treasury_id,
        };
    
    
        advData = {
          adv_id : this.lastAdvId+1,
          emp_id : data.emp_id,
          due_date : data.due_date,
          adv_amount : ((this.empSalary - this.totalEmpPenalties) * -1),
          creditor : "system",
          notes : data.notes,
          type : 1,
          treasury_id : data.treasury_id,
        };
    
        penData = {
          emp_id : data.emp_id,
          amount : (this.totalEmpPenalties * -1),
          admin_person : "system",
          deduct_date : data.due_date,
          due_date : data.due_date,
          reason : data.notes
        };
    
        depositData = {
          treasury_id : data.treasury_id,
          deposit_amount : (this.empSalary * -1),
          deposit_date : data.due_date,
          depositor : "system",
          deposit_reason : data.notes,
          deposit_type : data.deposit_type
        };
      }
      else
      {
        dta = 
        {
          ezn_no: this.lastId+1,
          emp_id: data.emp_id,
          ezn_date: data.ezn_date,
          due_date: data.due_date,
          salary: this.empSalary,
          advances: this.totalAdvPen,
          salary_after: this.empSalaryAfter,
          notes: data.notes,
          treasury_id: data.treasury_id,
        };
    
    
        advData = {
          adv_id : this.lastAdvId+1,
          emp_id : data.emp_id,
          due_date : data.due_date,
          adv_amount : (this.totalEmpAdvances * -1),
          creditor : "system",
          notes : data.notes,
          type : 1,
          treasury_id : data.treasury_id,
        };
    
        penData = {
          emp_id : data.emp_id,
          amount : (this.totalEmpPenalties * -1),
          admin_person : "system",
          deduct_date : data.due_date,
          due_date : data.due_date,
          reason : data.notes
        };
    
        depositData = {
          treasury_id : data.treasury_id,
          deposit_amount : (this.empSalaryAfter * -1),
          deposit_date : data.due_date,
          depositor : "system",
          deposit_reason : data.notes,
          deposit_type : data.deposit_type
        };
      }
      
  
      this.salService.addSalary(dta).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
          this.ngOnInit();
      });
  
      this.advService.addAdvance(advData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
          this.ngOnInit();
      });
  
      this.empService.addEmployeePenaltiesDeduction(penData).subscribe((res:any)=>{
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
