import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ProductsService } from '../../services/products.service';
import { PurchasesService } from '../../services/purchases.service';
import { SupplierService } from '../../services/supplier.service';
import { AgelSuppliersService } from '../../services/agel-suppliers.service';
import { TreasurybankService } from '../../services/treasurybank.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { DatePipe } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'app-add-fatora',
  templateUrl: './add-fatora.component.html',
  styleUrls: ['./add-fatora.component.css']
})
export class AddFatoraComponent implements OnInit {

  public disabledAdd = false;
  public disabledDelete = true;

  lastId:number=0;

  inventoryList = <any>[];
  productList = <any>[];
  supplierList = <any>[];

  productSearchResult = <any>[];

  tableList = <any>[];

  searchTerm : FormControl = new FormControl();

  formdata:any;

  invent_id:any = "";
  supp_id:any = "";
  product_id:any="";

  matValue:any="";

  myDate = new Date();

  treasury_id:any;
  treasury_balance:any;

  constructor(public treasService:TreasurybankService, public aglService:AgelSuppliersService, public suppService:SupplierService, public purchService:PurchasesService, public inventService:InventoryService, public prodService:ProductsService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  

  ngOnInit(): void {

    this.treasService.getMainTreasury().subscribe((data:any)=>{
      this.treasury_id = data[0].treasury_id;
    });

    this.treasService.getTotalBalanceMainTreasury().subscribe((data:any)=>{
      this.treasury_balance = data[0].total;
    });

    this.inventService.getInvList().subscribe((data:any)=>{
      this.inventoryList = data;
    });

    this.suppService.getSupplierList().subscribe((data:any)=>{
      this.supplierList = data;
    });

    this.purchService.getLastId().subscribe((data : any) => {
      //this.lastId = data[0].lastId;
      if(data[0].lastId == null)
      {
        this.lastId = 1;
      }
      else
      {
        this.lastId = data[0].lastId;
      }
    });

    this.searchTerm.valueChanges.subscribe(
      (term:any) => {
        term = {product_name : this.searchTerm.value};
          
        if(term != ''){
          this.inventService.getProductSearchResult(term).subscribe(
            (data:any) => {
              this.productList = data as any[];
            }
          );
        }
      }
    );

    this.formdata = new FormGroup({
      inv_no: new FormControl(""),
      supplier_id: new FormControl(""),
      supplier_inv_no: new FormControl(""),
      inventory_id: new FormControl(""),
      quantity: new FormControl(""),
      total_cost: new FormControl(""),
      taxable: new FormControl(""),
      payment_type: new FormControl(""),
      supplier_type: new FormControl(""),
      due_date: new FormControl(""),
      product_id: new FormControl(""),
      product_quantity: new FormControl(""),
      product_unit_price: new FormControl(""),
      product_total_cost: new FormControl(""),
      deposit_type: new FormControl("-4"),
    });


  }
  
  //get inventory id value
  getInventory(event:any)
  {
    this.invent_id = event.target.value;
  }
  getSupplier(event:any)
  {
    this.supp_id = event.target.value;
    console.log(this.supp_id);
  }

  addNew(){
    this.searchTerm.setValue("");
    this.ngOnInit();
  }

  //search method
  searchProduct(prodId:any){
    
    this.product_id = prodId;
    var prodData = {
      invent_id : this.invent_id,
      product_id: prodId
    };

    if(prodId == "" || this.matValue=="")
    {
      this.pushNotification.show("ادخل اسم المنتج", {}, 6000, );
      this.router.navigated = false;
    }
    else
    {
      this.purchService.GetProductSearch(prodData).subscribe(
        (data:any) => {
          this.productSearchResult = data as any[];
          var isPresent = this.tableList.some((el:any)=>{return el.product_id === this.productSearchResult[0].product_id});
          
          if(isPresent == false)
            {
              this.tableList.push(this.productSearchResult[0]);
              console.log(this.tableList);
            }
            else
            {
              this.pushNotification.show("لقد اضفت هذا المنتج فى الفاتورة", {}, 6000, );
              this.router.navigated = false;
            }
          
        }
      );
      this.addNew();
    }
    
  }


  deleteUnit(){
    var inputs = document.querySelectorAll('input[name=cb]:checked');

    if(confirm('هل انت متأكد؟')){
      if(inputs.length > 0){
        for(var i = 0; i < inputs.length; i++){
          var idvalue = inputs[i].getAttribute("value");

          const indexx = this.tableList.findIndex((object:any) => {
            return object.product_id === idvalue;
          });

          const x = this.tableList.splice(indexx, 1);
        }
        
      }
      else{
        this.pushNotification.show("اختر الذى تريده", {}, 6000, );
        this.router.navigated = false;
      }
    }
    
  }


  // add fatora
  addFatora(data:any)
  {

    if(this.tableList.length == 0)
    {
      this.pushNotification.show("الفاتورة فارغة", {}, 6000, );
      this.router.navigated = false;
    }
    else if(this.supp_id == "")
    {
      this.pushNotification.show("اختر المورد", {}, 6000, );
      this.router.navigated = false;
    }
    
    else if(this.invent_id == "")
    {
      this.pushNotification.show("اختر المخزن", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.total_cost == "")
    {
      this.pushNotification.show("اجمالى الفاتورة فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.payment_type == "")
    {
      this.pushNotification.show("اختر نوع الدفع", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.supplier_type == "")
    {
      this.pushNotification.show("اختر نوع المورد اجل ام نقدى؟", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.due_date == "")
    {
      this.pushNotification.show("ادخل تاريخ الاستحقاق", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.total_cost > this.treasury_balance && data.payment_type == "pay_cash" && data.supplier_type == "sup_cash")
    {
      this.pushNotification.show("الرصيد بالخزنة غير كافى", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.taxable != "" && data.supplier_inv_no == "")
    {
      this.pushNotification.show("رقم فاتورة المورد مطلوب اذا كانت ضريبية", {}, 6000, );
      this.router.navigated = false;
    }
    else
    {
      var product_quantity = document.querySelectorAll('input[name=product_quantity]');
      var product_unit_price = document.querySelectorAll('input[name=product_unit_price]');
      var product_total_cost = document.querySelectorAll('input[name=product_total_cost]');

      var fatoraData;

      for(let i=0; i < this.tableList.length; i++)
      {
        fatoraData = 
          {
            inv_no: this.lastId ,
            supplier_id: this.supp_id,
            supplier_inv_no: data.supplier_inv_no,
            inventory_id: this.invent_id,
            quantity: data.quantity,
            total_cost: data.total_cost,
            taxable: data.taxable,
            payment_type: data.payment_type,
            supplier_type: data.supplier_type,
            due_date: data.due_date,
            invoice_date: new Date(),
            product_id: this.tableList[i].product_id,
            product_quantity: (product_quantity[i] as HTMLInputElement).value,
            product_unit_price: (product_unit_price[i] as HTMLInputElement).value,
            product_total_cost: (product_total_cost[i] as HTMLInputElement).value
          };

          var invData = {
            product_id : this.tableList[i].product_id,
            invent_id : this.invent_id,
            product_quantity : (product_quantity[i] as HTMLInputElement).value,
            purchase_price: "0",
            sell_price: "0"
          }

          this.purchService.addPurchaseInvoice(fatoraData).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
          });

          this.inventService.EditInventoryQuantityPurchase(invData).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
          });

          
      }

      var aglSupData = {
        sup_no : this.supp_id,
        amount : data.total_cost,
        inv_no : this.lastId,
        inv_date: this.myDate,
        due_date: data.due_date
      }
      //if agel supplier add to agel suppliers account
      if(data.supplier_type == "sup_agel")
      {
        this.aglService.addAgelSupplierAcc(aglSupData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
        });
      }

      //if payment cash will deposit in treasury and if check will deposit in treasury manauly
      if(data.payment_type == "pay_cash" && data.supplier_type == "sup_cash")
      {
        if(data.total_cost > this.treasury_balance)
        {
          this.pushNotification.show("الرصيد بالخزنة غير كافى", {}, 6000, );
          this.router.navigated = false;
        }
        else
        {
          var depositData = {
            treasury_id : this.treasury_id,
            deposit_amount : (data.total_cost * -1),
            deposit_date : this.myDate,
            depositor : "system",
            deposit_reason : this.lastId,
            deposit_type : data.deposit_type
          };
  
          this.treasService.addTreasuryDeposit(depositData).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
          });
        }
        
      }
      
      this.tableList=[];
      this.ngOnInit();
    }
    
  }

}
