import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-inventory-edit-cost',
  templateUrl: './inventory-edit-cost.component.html',
  styleUrls: ['./inventory-edit-cost.component.css']
})
export class InventoryEditCostComponent implements OnInit {

  inventoryList = <any>[];

  productList = <any>[];

  productSearchResult = <any>[];

  oldPurchasePrice:any = "";
  oldSellPrice:any = "";

  newPurchasePrice:any = "";
  newSellPrice:any = "";

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
      oldPurchase: new FormControl(""),
      newPurchase: new FormControl(""),
      oldSell: new FormControl(""),
      newSell: new FormControl(""),
    });

  }

  getInventory(event:any)
  {
    this.invent_id = event.target.value;
  }
  //clear to add new
  addNew(){
    this.oldPurchasePrice = "";
    this.oldSellPrice = "";
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
        
        this.oldPurchasePrice = data[0].purchase_price;
        this.oldSellPrice = data[0].sell_price;
        //console.log(this.inventorySearchResult);
      }
    );
  }

  onNewPurchase(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.newPurchasePrice = element.value;
  }

  onNewSell(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.newSellPrice = element.value;
  }

  //update Inventory data
  editCost(data:any){

    var upData = {
      invent_id : this.invent_id,
      product_id : this.product_id,
      purchase_price : this.newPurchasePrice,
      sell_price : this.newSellPrice,
    };

    if(this.invent_id != '')
    {
      if(this.product_id == "")
      {
        this.pushNotification.show("ادخل المنتج واضغط بحث", {}, 6000, );
        this.router.navigated = false;
      }

      else if(data.newPurchase == "" || data.newSell == "")
      {
        this.pushNotification.show("ادخل السعر الجديد", {}, 6000, );
        this.router.navigated = false;
      }
      
      else
      {
        this.invent.updateCostInventory(upData).subscribe((res:any)=>{
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
