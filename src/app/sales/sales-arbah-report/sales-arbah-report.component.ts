import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PushNotificationService } from 'ng-push-notification';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales-arbah-report',
  templateUrl: './sales-arbah-report.component.html',
  styleUrls: ['./sales-arbah-report.component.css']
})
export class SalesArbahReportComponent implements OnInit {

  config: any;
  formdata:any;

  totalSales:any = 0;
  totalTaxs:any = 0;
  totalPurchases:any = 0;

  reportList = <any>[];
  sales = <any>[];
  purch = <any>[];
  
  constructor(public salService:SalesService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.config = {
      itemsPerPage: 50,
      currentPage: 1,
      totalItems: this.reportList.count
    };
  }

  pageChanged(event:any){
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      dateFrom: new FormControl(""),
      dateTo: new FormControl(""),
    });
  }


  Search(data:any)
  {
    if(data.dateFrom == "" || data.dateTo == "")
    {
      this.pushNotification.show("ادخل التاريخ", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.dateFrom > data.dateTo)
    {
      this.pushNotification.show("خطأ بالتاريخ", {}, 6000, );
      this.router.navigated = false;
    }
    else
    {
      this.reportList = [];
      this.totalSales=0;
      this.totalTaxs=0;
      this.totalPurchases=0;
        var dateData = {
          date1: data.dateFrom,
          date2: data.dateTo
        }
        this.salService.getArbahSalesDetails(dateData).subscribe((data : any) => {
          this.sales = data;
          this.salService.getArbahPurchDetails(dateData).subscribe((data1:any)=>{
            this.purch = data1;
            for(let i=0;i<this.sales.length;i++)
            {
              this.reportList.push({"product_name":this.sales[i].pname, "sales_quantity":this.sales[i].squantity, "purchase_price":this.purch[i].pavg, "sales_taxes":this.sales[i].taxes, "purchase_taxes":this.purch[i].taxes,"sale_price":this.sales[i].savg,"total_sales":this.sales[i].salSum});

              this.totalPurchases += this.sales[i].squantity * this.purch[i].pavg;
              this.totalSales += this.sales[i].salSum;
              this.totalTaxs += this.sales[i].taxes;
            }
          });

          console.log(this.reportList);
        });

        

        
        
        
    }
  }


}
