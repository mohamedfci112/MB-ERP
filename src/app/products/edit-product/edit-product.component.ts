import { Component } from '@angular/core';
import { DepartsService } from '../../services/departs.service';
import { UnitsService } from '../../services/units.service';
import { ProductsService } from '../../services/products.service';
import { InventoryService } from '../../services/inventory.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

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
  productDetails = <any>[];

  formdata:any;

  product_id: any="";
  product_name: any="";
  group_id: any="";
  unit_id: any="";
  depart_id: any="";
  product_limit: any="";
  part_no: any="";
  purchase_price: any="";
  sell_price: any="";
  product_description: any="";
  notes: any="";
  taxable: any="";
  taxes: any="";
  original: any="";
  coppy: any="";
  highcoppy: any="";
  compatable: any="";
  invent_id: any="";
  invent_quantity: any="";

  taxableCheck:any=false;
  origCheck:any=false;
  copCheck:any=false;
  hcopCheck:any=false;
  compCheck:any=false;

  constructor(public depService:DepartsService, public unitGroService: UnitsService, public prodService:ProductsService, public invService:InventoryService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    
    this.lastId = this.route.snapshot.paramMap.get('id');
    var prod={product_id:this.lastId}

    this.prodService.getProductData(prod).subscribe((data : any) => {
      this.productDetails = data;

      for(var i=0;i<data.length;i++)
      {
        this.product_name=data[i].product_name;
        this.group_id=data[i].group_id;
        this.unit_id=data[i].unit_id;
        this.depart_id=data[i].depart_id;
        this.product_limit=data[i].product_limit;
        this.part_no=data[i].part_no;
        this.purchase_price=data[i].purchase_price;
        this.sell_price=data[i].sell_price;
        this.product_description=data[i].product_description;
        this.notes=data[i].notes;
        this.taxable=data[i].taxable;
        this.taxes=data[i].taxes;
        this.original=data[i].original;
        this.compatable=data[i].compatable;
        this.highcoppy=data[i].highcoppy;
        this.coppy=data[i].coppy;
        this.invent_id=data[i].invent_id;
        this.invent_quantity=data[i].product_quantity;
      }
      //
      if(this.taxable=='1'){this.isEditable=true;}else{this.isEditable=false;}
      if(this.taxable==1){this.taxable=1;this.taxableCheck=false;}else{this.taxable=0;this.taxableCheck=true;}
      if(this.original==1){this.original=1;this.origCheck=false;}else{this.original=0;this.origCheck=true;}
      if(this.compatable==1){this.compatable=1;this.compCheck=false;}else{this.compatable=0;this.compCheck=true;}
      if(this.highcoppy==1){this.highcoppy=1;this.hcopCheck=false;}else{this.highcoppy=0;this.hcopCheck=true;}
      if(this.coppy==1){this.coppy=1;this.copCheck=false;}else{this.coppy=0;this.copCheck=true;}

    });

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
    });

    
  }

  taxCheck(event :any) {
    if ( event.target.checked ) {
      this.taxable = "0";
      this.isEditable = false;
    }
    else{
    this.taxable = "1";
    this.isEditable = true;
    }
  }
  
  originalCheck(event :any) {
    if ( event.target.checked ) {
      this.original = "0";
   }
   else{
    this.original = "1";
   }
  }
  
  copyCheck(event :any) {
    if ( event.target.checked ) {
      this.coppy = "0";
   }
   else{
    this.coppy = "1";
   }
  }
  
  hightcopyCheck(event :any) {
    if ( event.target.checked ) {
      this.highcoppy = "0";
   }
   else{
    this.highcoppy = "1";
   }
  }
  
  compatableCheck(event :any) {
    if ( event.target.checked ) {
      this.compatable = "0";
   }
   else{
    this.compatable = "1";
   }
  }


  editProduct(data:any){
    var prodData = {
      product_id : this.lastId,
      product_name : this.product_name,
      group_id : this.group_id,
      unit_id : this.unit_id,
      depart_id : this.depart_id,
      product_limit : this.product_limit,
      part_no : this.part_no,
      purchase_price : this.purchase_price,
      sell_price : this.sell_price,
      product_description : this.product_description,
      notes : this.notes,
      taxable : this.taxable,
      taxes : this.taxes,
      original : this.original,
      coppy : this.coppy,
      highcoppy: this.highcoppy,
      compatable: this.compatable,
      invent_id : this.invent_id
    };

    var invData = {
      product_id : this.lastId,
      invent_id : this.invent_id,
      product_quantity : this.invent_quantity,
      purchase_price: this.purchase_price,
      sell_price : this.sell_price
    }

    if(this.product_name == "")
    {
      this.pushNotification.show("يرجى ادخال اسم المنتج", {}, 6000, );
      this.router.navigated = false;
    }
    else if(this.part_no == "")
    {
      this.pushNotification.show("يرجى ادخال البارت نمبر", {}, 6000, );
      this.router.navigated = false;
    }
    else if(this.purchase_price == "")
    {
      this.pushNotification.show("يرجى ادخال سعر الشراء", {}, 6000, );
      this.router.navigated = false;
    }
    else if(this.sell_price == "")
    {
      this.pushNotification.show("يرجى ادخال سعر البيع", {}, 6000, );
      this.router.navigated = false;
    }
    else if(this.invent_id == "")
    {
      this.pushNotification.show("يرجى ادخال المخزن", {}, 6000, );
      this.router.navigated = false;
    }
    else{
      if(this.original == "1" && this.coppy == "1")
      {
        this.pushNotification.show("يرجى اختيار كوبى ام اوريجينال؟", {}, 6000, );
        this.router.navigated = false;
      }
      else if(this.taxable == "1" && this.taxes =="")
      {
        this.pushNotification.show("يرجى ادخال قيمة الضريبة", {}, 6000, );
        this.router.navigated = false;
      }
      else
      {
        this.prodService.editProductData(prodData).subscribe((res:any)=>{
          this.pushNotification.show("تم التعديل", {}, 3000, );
        });
  
        this.prodService.editProductDataInventory(invData).subscribe((res:any) => {
          this.pushNotification.show("تم التعديل", {}, 3000, );
        });
        this.router.navigate(['/view_products']);
      }
      
    }
    
  }

}
