import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-inventory-edit-quantity',
  templateUrl: './inventory-edit-quantity.component.html',
  styleUrls: ['./inventory-edit-quantity.component.css']
})
export class InventoryEditQuantityComponent implements OnInit {

  inventoryList = <any>[];

  productList = <any>[];

  productSearchResult = <any>[];

  old_Quantity:any = "";

  new_Quantity:any = "";

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
      oldQuantity: new FormControl(""),
      newQuantity: new FormControl(""),
    });
  }

  getInventory(event:any)
  {
    this.invent_id = event.target.value;
  }

  addNew(){
    this.old_Quantity = "";
    this.searchTerm.setValue("");
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
        this.old_Quantity = data[0].product_quantity;
      }
    );
  }

  onNewQuantity(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.new_Quantity = element.value;
  }

  //update Inventory data
  editQuantity(data:any){

    var upData = {
      invent_id : this.invent_id,
      product_id : this.product_id,
      product_quantity : this.new_Quantity
    };

    if(this.invent_id != '')
    {
      if(this.product_id == "")
      {
        this.pushNotification.show("ادخل المنتج واضغط بحث", {}, 6000, );
        this.router.navigated = false;
      }

      else if(data.newQuantity == "")
      {
        this.pushNotification.show("ادخل الكمية الجديد", {}, 6000, );
        this.router.navigated = false;
      }
      
      else
      {
        this.invent.updateQuantityInventory(upData).subscribe((res:any)=>{
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
