import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ProductsService } from '../../services/products.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-inventory-transfers',
  templateUrl: './inventory-transfers.component.html',
  styleUrls: ['./inventory-transfers.component.css']
})
export class InventoryTransfersComponent implements OnInit {

  totalFrom:any;

  totalTo:any;

  productList = <any>[];

  inventoryList = <any>[];

  prodId:any;

  formdata:any;
  constructor(public invService:InventoryService, public proService:ProductsService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    var x = document.getElementById("mySelect") as HTMLSelectElement | null;
    if(x != null){
      x.disabled = true;
    }
    
    this.totalFrom = "0";
    this.totalTo = "0";

    this.invService.getInvList().subscribe((data : any) => {
      this.inventoryList = data;
    });

    this.proService.getProductList().subscribe((data : any) => {
      this.productList = data;
    });

    this.formdata = new FormGroup({
      product_id: new FormControl(""),
      invent_from_id: new FormControl(""),
      invent_to_id: new FormControl(""),
      product_quantity: new FormControl(""),
      purchase_price: new FormControl(""),
      sell_price: new FormControl(""),
      trans_date: new FormControl(""),
      trans_admin: new FormControl(""),
      trans_reason: new FormControl(""),
    });

  }


  myProduct(event:any) {
    if(event.target.value != "")
    {
      this.prodId = event.target.value;
      var x = document.getElementById("mySelect") as HTMLSelectElement | null;
      if(x != null){
        x.disabled = false;
      }
    }
    else
    {
      var x = document.getElementById("mySelect") as HTMLSelectElement | null;
      if(x != null){
        x.disabled = true;
      }
    }
  }

  myInventoryFrom(lang:any) {
    var val = {invent_id : lang.target.value, product_id: this.prodId};
    this.invService.getTotalBalanceInventory(val).subscribe((data : any) => {
      this.totalFrom = data[0].total;
    });
  }

  myInventoryTo(lang:any) {
    var val = {invent_id : lang.target.value, product_id: this.prodId};
    this.invService.getTotalBalanceInventory(val).subscribe((data : any) => {
      this.totalTo = data[0].total;
    });
  }


  addInventoryTransform(data:any)
  {
    var transferData = {
      product_id : data.product_id,
      invent_from_id : data.invent_from_id,
      invent_to_id : data.invent_to_id,
      product_quantity : data.product_quantity,
      purchase_price : data.purchase_price,
      sell_price : data.sell_price,
      trans_date : data.trans_date,
      trans_admin : data.trans_admin,
      trans_reason : data.trans_reason,
    };

    var fromData = {
      invent_id : data.invent_from_id,
      product_id : data.product_id,
      product_quantity : (this.totalFrom - data.product_quantity)
    };

    var toData = {
      invent_id : data.invent_to_id,
      product_id : data.product_id,
      product_quantity : (this.totalTo + data.product_quantity),
      purchase_price : data.purchase_price,
      sell_price : data.sell_price
    };


    if(data.product_id != "" && data.invent_from_id !="" && data.invent_to_id !="")
    {
      if(data.product_quantity != "")
      {
        if(data.purchase_price == "" || data.sell_price == "")
        {
          this.pushNotification.show("ادخل سعر البيع والشراء", {}, 6000, );
          this.router.navigated = false;
        }
        else
        {
          if(data.invent_from_id == data.invent_to_id)
          {
            this.pushNotification.show("لا يمكن اختيار نفس المخزن", {}, 6000, );
            this.router.navigated = false;
          }
          else
          {
            if(data.product_quantity > this.totalFrom)
            {
              this.pushNotification.show("الكمية بالمخزن غير كافية", {}, 6000, );
              this.router.navigated = false;
            }
            else
            {
              this.invService.TransferInventoryItems(transferData).subscribe((res:any)=>{
                this.pushNotification.show(res.toString(), {}, 6000, );
                this.ngOnInit();
              });

              this.invService.EditInventoryQuantity(fromData).subscribe((res:any)=>{
                this.pushNotification.show(res.toString(), {}, 6000, );
                this.ngOnInit();
              });

              this.invService.EditInventoryQuantity(toData).subscribe((res:any)=>{
                this.pushNotification.show(res.toString(), {}, 6000, );
                this.ngOnInit();
              });
            }

          }
        }
      }
      else
      {
        this.pushNotification.show("ادخل الكمية", {}, 6000, );
        this.router.navigated = false;
      }
    }
    else
    {
      this.pushNotification.show("اختر المنتج والمخزن المحول منه وله", {}, 6000, );
      this.router.navigated = false;
    }
  }


}
