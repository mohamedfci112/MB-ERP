import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-inventory-talf-report',
  templateUrl: './inventory-talf-report.component.html',
  styleUrls: ['./inventory-talf-report.component.css']
})
export class InventoryTalfReportComponent implements OnInit {

  inventoryList = <any>[];

  productList = <any>[];

  invent_id:any = "";

  formdata:any;

  config: any;

  constructor(public invent:InventoryService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.productList.count
    };
  }

  ngOnInit(): void {
    this.invent.getInvList().subscribe((data:any)=>{
      this.inventoryList = data;
    });

    this.formdata = new FormGroup({
      inventoryId: new FormControl(""),
      fromDate: new FormControl(""),
      toDate: new FormControl(""),
    });

  }

  pageChanged(event:any){
    this.config.currentPage = event;
  }

  getInventory(event:any)
  {
    this.invent_id = event.target.value;
  }

  getTalfReport(data:any)
  {
    var tlftData = {
      invent_id: this.invent_id,
      fromDate: data.fromDate,
      toDate: data.toDate
    };

    this.invent.GetTalfReport(tlftData).subscribe((val:any)=>{
      this.productList = val;
    });
  }

}
