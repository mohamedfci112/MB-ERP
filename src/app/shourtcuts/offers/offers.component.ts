import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  config: any;
  formdata:any;

  totalPurchases:any = 0;
  totalTaxs:any = 0;

  reportList = <any>[];

  constructor(public offerService:OffersService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
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
      this.totalPurchases=0;
      this.totalTaxs=0;
        var dateData = {
          date1: data.dateFrom,
          date2: data.dateTo
        }
        this.offerService.getAllOffers(dateData).subscribe((data : any) => {
          this.reportList = data;
          for(let i=0;i<data.length;i++)
          {
            this.totalPurchases += data[i].product_total_cost;
            this.totalTaxs += data[i].taxable;
          }
        });
    }
  }
  

}
