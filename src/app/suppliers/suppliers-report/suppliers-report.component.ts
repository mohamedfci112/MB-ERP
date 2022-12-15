import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-suppliers-report',
  templateUrl: './suppliers-report.component.html',
  styleUrls: ['./suppliers-report.component.css']
})
export class SuppliersReportComponent implements OnInit {

  supplierList = <any>[];

  constructor(public supService:SupplierService) { }

  ngOnInit(): void {
    this.supService.getSupplierList().subscribe((data : any) => {
      this.supplierList = data;
    });
  }

}
