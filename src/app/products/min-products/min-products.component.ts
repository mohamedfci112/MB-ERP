import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-min-products',
  templateUrl: './min-products.component.html',
  styleUrls: ['./min-products.component.css']
})
export class MinProductsComponent implements OnInit {

  productLimitList = <any>[];

  constructor(public prodService:ProductsService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
   }

  ngOnInit(): void {
    this.prodService.getAllProductsLimits().subscribe((data : any) => {
      this.productLimitList = data;
    });
  }

}
