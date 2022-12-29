import { Component, OnInit } from '@angular/core';
import { DepartsService } from '../../services/departs.service';
import { UnitsService } from '../../services/units.service';
import { ProductsService } from '../../services/products.service';
import { InventoryService } from '../../services/inventory.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  lastId:any;

  taxCheckVal:any = "1";
  originalCheckVal:any = "1";
  copyCheckVal:any = "1";
  highcopyCheckVal:any = "1";
  compatableCheckVal:any = "1";

  isEditable = true;

  departList = <any>[];
  unitList = <any>[];
  groupList = <any>[];
  invintoryList = <any>[];

  formdata:any;

  constructor(public depService:DepartsService, public unitGroService: UnitsService, public prodService:ProductsService, public invService:InventoryService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.depService.getDepartList().subscribe((data : any) => {
      this.departList = data;
    });

    this.unitGroService.getUnitList().subscribe((data : any) => {
      this.unitList = data;
    });

    this.unitGroService.getGroupList().subscribe((data : any) => {
      this.groupList = data;
    });

    this.invService.getInvList().subscribe((data : any) => {
      this.invintoryList = data;
    });



    this.prodService.getProductLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    this.formdata = new FormGroup({
      product_id: new FormControl(""),
      product_name: new FormControl(""),
      group_id: new FormControl(""),
      unit_id: new FormControl(""),
      depart_id: new FormControl(""),
      product_limit: new FormControl(""),
      part_no: new FormControl(""),
      purchase_price: new FormControl(""),
      sell_price: new FormControl(""),
      product_description: new FormControl(""),
      notes: new FormControl(""),
      taxable: new FormControl(""),
      taxes: new FormControl(""),
      original: new FormControl(""),
      coppy: new FormControl(""),
      highcoppy: new FormControl(""),
      compatable: new FormControl(""),
      invent_id: new FormControl(""),
      invent_quantity: new FormControl("")
    })
  }

taxCheck(event :any) {
  if ( event.target.checked ) {
    this.taxCheckVal = "0";
    this.isEditable = false;
  }
  else{
  this.taxCheckVal = "1";
  this.isEditable = true;
  }
}

originalCheck(event :any) {
  if ( event.target.checked ) {
    this.originalCheckVal = "0";
 }
 else{
  this.originalCheckVal = "1";
 }
}

copyCheck(event :any) {
  if ( event.target.checked ) {
    this.copyCheckVal = "0";
 }
 else{
  this.copyCheckVal = "1";
 }
}

hightcopyCheck(event :any) {
  if ( event.target.checked ) {
    this.highcopyCheckVal = "0";
 }
 else{
  this.highcopyCheckVal = "1";
 }
}

compatableCheck(event :any) {
  if ( event.target.checked ) {
    this.compatableCheckVal = "0";
 }
 else{
  this.compatableCheckVal = "1";
 }
}

  addProduct(data:any){
    var prodData = {
      product_id : this.lastId + 1,
      product_name : data.product_name,
      group_id : data.group_id,
      unit_id : data.unit_id,
      depart_id : data.depart_id,
      product_limit : data.product_limit,
      part_no : data.part_no,
      purchase_price : data.purchase_price,
      sell_price : data.sell_price,
      product_description : data.product_description,
      notes : data.notes,
      taxable : this.taxCheckVal,
      taxes : data.taxes,
      original : this.originalCheckVal,
      coppy : this.copyCheckVal,
      highcoppy: this.highcopyCheckVal,
      compatable: this.compatableCheckVal,
      invent_id : data.invent_id
    };

    var invData = {
      product_id : this.lastId + 1,
      invent_id : data.invent_id,
      product_quantity : data.invent_quantity,
      purchase_price: data.purchase_price,
      sell_price : data.sell_price
    }

    if(data.product_name == "")
    {
      this.pushNotification.show("يرجى ادخال اسم المنتج", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.group_id == "")
    {
      this.pushNotification.show("يرجى ادخال المجموعة", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.unit_id == "")
    {
      this.pushNotification.show("يرجى ادخال الوحدة", {}, 6000, );
      this.router.navigated == false;
    }
    else if(data.depart_id == "")
    {
      this.pushNotification.show("يرجى ادخال القسم", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.part_no == "")
    {
      this.pushNotification.show("يرجى ادخال البارت نمبر", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.purchase_price == "")
    {
      this.pushNotification.show("يرجى ادخال سعر الشراء", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.sell_price == "")
    {
      this.pushNotification.show("يرجى ادخال سعر البيع", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.invent_id == "")
    {
      this.pushNotification.show("يرجى ادخال المخزن", {}, 6000, );
      this.router.navigated = false;
    }
    else if(this.originalCheckVal == "1" && this.copyCheckVal == "1" && this.highcopyCheckVal == "1" && this.compatableCheckVal == "1")
    {
      this.pushNotification.show("يرجى اختيار اصلى ام كوبى؟", {}, 6000, );
      this.router.navigated = false;
    }
    else{
      if(this.originalCheckVal == "0" && this.copyCheckVal == "0")
      {
        this.pushNotification.show("يرجى اختيار كوبى ام اوريجينال؟", {}, 6000, );
        this.router.navigated = false;
      }
      else if(this.taxCheckVal == "0" && data.taxes =="")
      {
        this.pushNotification.show("يرجى ادخال قيمة الضريبة", {}, 6000, );
        this.router.navigated = false;
      }
      else
      {
        this.prodService.addProduct(prodData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
          this.ngOnInit();
        });
  
        this.invService.addInventoryItems(invData).subscribe((res:any) => {
          this.pushNotification.show(res.toString(), {}, 6000, );
          this.ngOnInit();
        });
      }
      
    }
    
  }

}
