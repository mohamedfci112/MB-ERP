import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-masrof-report',
  templateUrl: './masrof-report.component.html',
  styleUrls: ['./masrof-report.component.css']
})
export class MasrofReportComponent implements OnInit {

  expList= <any>[];
  formdata:any;

  dateFrom:any;
  dateTo:any;

  config: any;

  sum:any=0;

  constructor(public expService:ExpensesService) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.expList.count
    };
   }

   pageChanged(event:any){
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      dateFrom: new FormControl(""),
      dateTo: new FormControl("")
    });
  }

  myFrom(lang:any) {
    this.dateFrom = lang.target.value;
  }

  myTo(lang:any) {
    this.dateTo = lang.target.value;
  }

  searchExpenses(data:any)
  {
    var expensesData = {
      exp_from : data.dateFrom,
      exp_to : data.dateTo
    };

    this.expService.getTotalExpenses(expensesData).subscribe((data:any)=>{
      this.expList = data;
    });

    this.expService.getTotalAmountExpenses(expensesData).subscribe((data:any)=>{
      this.sum = data[0].total;
    });
    
  }

}
