import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  productDetailsList = <any>[];

  product_name: any;

  config: any;

  constructor(public prodService:ProductsService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.productDetailsList.count
    };
   }

   pageChanged(event:any){
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.prodService.getAllProductsDetails().subscribe((data : any) => {
      this.productDetailsList = data;
    });
  }

}
