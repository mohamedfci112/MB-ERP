import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  formdata:any;

  reportList = <any>[];

  offer_no:any;

  total:any;
  qauantity:any;
  customer:any;
  

  constructor(public offerService:OffersService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }


  ngOnInit(): void {
    this.formdata = new FormGroup({
      dateFrom: new FormControl(""),
      dateTo: new FormControl(""),
    });

    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.offer_no = params.offer_no;
        //
        this.reportList = [];
          var dateData = {
            offer_no: this.offer_no
          }
          this.offerService.getOfferDetails(dateData).subscribe((data : any) => {
            this.reportList = data;
            for(let i=0;i<data.length;i++)
            {
              this.total = data[i].total_amount;
              this.qauantity = data[i].quantity;
              this.customer = data[i].cust_name;
            }
          });
        //
      }
    );

  }


}
