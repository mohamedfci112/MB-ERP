import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-inventory-talf',
  templateUrl: './inventory-talf.component.html',
  styleUrls: ['./inventory-talf.component.css']
})
export class InventoryTalfComponent implements OnInit {

  inventoryList = <any>[];

  productList = <any>[];

  productSearchResult = <any>[];

  cur_Quantity:any = "";

  talf_Quantity:any = "";

  invent_id:any = "";

  product_id:any="";

  searchTerm : FormControl = new FormControl();

  formdata:any;
  constructor(public invent:InventoryService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.invent.getInvList().subscribe((data:any)=>{
      this.inventoryList = data;
    });

    this.searchTerm.valueChanges.subscribe(
      (term:any) => {
        term = {product_name : this.searchTerm.value};
          
        if(term != ''){
          this.invent.getProductSearchResult(term).subscribe(
            (data:any) => {
              this.productList = data as any[];
            }
          );
        }
      }
    );

    this.formdata = new FormGroup({
      inventoryId: new FormControl(""),
      productId: new FormControl(""),
      currQuantity: new FormControl(""),
      talfQuantity: new FormControl(""),
      talfDate: new FormControl(""),
      talfReason: new FormControl(""),
      talfAdmin: new FormControl(""),
    });
  }

  getInventory(event:any)
  {
    this.invent_id = event.target.value;
  }

  addNew(){
    this.cur_Quantity = "";
    this.searchTerm.setValue("");
    this.ngOnInit();
  }

  //search method
  searchProduct(prodId:any){
    this.addNew();
    this.product_id = prodId;
    var prodData = {
      invent_id : this.invent_id,
      product_id: prodId
    };

    this.invent.GetProductSearch(prodData).subscribe(
      (data:any) => {
        this.productSearchResult = data as any[];
        this.cur_Quantity = data[0].product_quantity;
      }
    );
  }

  //
  onTalfQuantity(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.talf_Quantity = element.value;
  }


  //update Inventory data
  editQuantity(data:any){

    var upData = {
      product_id : this.product_id,
      product_talf_quantity : this.talf_Quantity,
      talf_date : data.talfDate,
      talf_admin : data.talfAdmin,
      talf_reason : data.talfReason,
      invent_id : this.invent_id,
    };

    var upDataQuantity = {
      product_quantity: (this.cur_Quantity - this.talf_Quantity),
      product_id: this.product_id,
      invent_id: this.invent_id
    }

    if(this.invent_id != '')
    {
      if(this.product_id == "")
      {
        this.pushNotification.show("ادخل المنتج واضغط بحث", {}, 6000, );
        this.router.navigated = false;
      }

      else if(data.talfQuantity == "")
      {
        this.pushNotification.show("ادخل الكمية التالفة", {}, 6000, );
        this.router.navigated = false;
      }

      else if(data.talfQuantity > this.cur_Quantity)
      {
        this.pushNotification.show("الكمية التالفة اكبر من الموجودة فى المخزن", {}, 6000, );
        this.router.navigated = false;
      }
      
      else
      {
        this.invent.updateQuantityInventory(upDataQuantity).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
          this.ngOnInit();
          window.location.reload;
          this.searchTerm.setValue("");
        });

        this.invent.addInventoryTalf(upData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
          this.ngOnInit();
          window.location.reload;
          this.searchTerm.setValue("");
        });

      }
      
    }
    else{
      this.pushNotification.show("جميع البيانات مطلوبة", {}, 6000, );
      this.router.navigated = false;
    }
      
  }

}
