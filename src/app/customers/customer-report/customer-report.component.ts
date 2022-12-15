import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css']
})
export class CustomerReportComponent implements OnInit {

  customerList = <any>[];

  constructor(public custService:CustomerService) { }

  ngOnInit(): void {
    this.custService.getCustomerList().subscribe((data : any) => {
      this.customerList = data;
    });
  }

}
