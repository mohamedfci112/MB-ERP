import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ProductsService } from '../../services/products.service';
import { CustomerService } from '../../services/customer.service';
import { OffersService } from '../../services/offers.service';
import { PurchasesService } from '../../services/purchases.service';
import { SalesService } from '../../services/sales.service';
import { AgelCustomersService } from '../../services/agel-customers.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { DatePipe } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'app-ezn-sarf',
  templateUrl: './ezn-sarf.component.html',
  styleUrls: ['./ezn-sarf.component.css']
})
export class EznSarfComponent implements OnInit {

  lastId:number=0;

  inventoryList = <any>[];
  productList = <any>[];

  productSearchResult = <any>[];

  tableList = <any>[];

  searchTerm : FormControl = new FormControl();

  searchTermCustomer : FormControl = new FormControl();
  customerList = <any>[];


  formdata:any;

  invent_id:any = "";
  supp_id:any = "";
  product_id:any="";

  matValue:any="";
  matValue1:any="";

  myDate = new Date();
  
  offersDetailsList = <any>[];

  offer_no: any;

  config: any;

  constructor(public cusAglService:AgelCustomersService, public salesService:SalesService, public purchService: PurchasesService, public offerService:OffersService, public custService:CustomerService, public inventService:InventoryService, public prodService:ProductsService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.offersDetailsList.count
    };
  }

  pageChanged(event:any){
    this.config.currentPage = event;
  }



  ngOnInit(): void {
    this.offerService.GetAll().subscribe((data : any) => {
      this.offersDetailsList = data;
      console.log(this.offersDetailsList);
    });
    //
    this.salesService.getLastEznSarfId().subscribe((data:any)=>{
      
      if(data[0].lastId == null)
      {
        this.lastId = 10000001;
      }
      else
      {
        this.lastId = data[0].lastId;
      }
      console.log(data);
    });


    //search customer real time
    this.searchTermCustomer.valueChanges.subscribe(
      (term1:any) => {
        term1 = {cust_name : this.searchTermCustomer.value};
          
        if(term1 != ''){
          this.custService.getSearchResult(term1).subscribe(
            (data1:any) => {
              this.customerList = data1 as any[];
            }
          );
        }
      }
    );

    // search product real time
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


    ///////
    this.formdata = new FormGroup({
      inv_no: new FormControl(""),
      quantity: new FormControl(""),
      total_cost: new FormControl(""),
      customer_id: new FormControl(""),
      payment_type: new FormControl(""),
      customer_type: new FormControl(""),
      due_date: new FormControl(""),
      product_id: new FormControl(""),
      product_quantity: new FormControl(""),
      product_unit_price: new FormControl(""),
      product_total_cost: new FormControl(""),
      taxable: new FormControl(0),
      taxes: new FormControl(0),
      inv_type: new FormControl(0),
      paid_up: new FormControl(0),
      remainder: new FormControl(0),
      invoice_date: new FormControl(new Date()),
    });
    ///
  }


  exportOffer(offerNo:any)
  {
    this.tableList = [];
    var x = {offer_no: offerNo}
    this.offerService.getOfferDetails(x).subscribe((data:any)=>{
      this.tableList = data;
      //console.log(this.tableList);
      this.matValue1 = this.tableList[0].customer_id;
    });
  }
  //
  addNew(){
    this.searchTerm.setValue("");
    this.searchTermCustomer.setValue("");
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
      this.searchTerm.setValue("");
    }
    
  }


  // delete selected item
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
    else if(this.searchTermCustomer.value == "")
    {
      this.pushNotification.show("اختر العميل", {}, 6000, );
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
    else if(data.customer_type == "")
    {
      this.pushNotification.show("اختر نوع العميل اجل ام نقدى؟", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.due_date == "")
    {
      this.pushNotification.show("ادخل تاريخ الاستحقاق", {}, 6000, );
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
          customer_id: this.searchTermCustomer.value,
          quantity: data.quantity,
          total_cost: data.total_cost,
          payment_type: data.payment_type,
          customer_type: data.customer_type,
          due_date: data.due_date,
          product_id: this.tableList[i].product_id,
          product_quantity: (product_quantity[i] as HTMLInputElement).value,
          product_unit_price: (product_unit_price[i] as HTMLInputElement).value,
          product_total_cost: (product_total_cost[i] as HTMLInputElement).value,
          taxable: data.taxable,
          taxes: data.taxes,
          inv_type: data.inv_type,
          paid_up: data.paid_up,
          remainder: data.remainder,
          invoice_date: data.invoice_date
        };
        
        var invData = 
        {
          product_id : this.tableList[i].product_id,
          invent_id : this.tableList[i].invent_id,
          product_quantity : (product_quantity[i] as HTMLInputElement).value
        }

        this.salesService.insertEznSrf(fatoraData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
        });

        this.salesService.EditInventoryQuantitySales(invData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
        });

      }

      var aglCusData = {
        cust_no : this.searchTermCustomer.value,
        inv_no : this.lastId,
        remainder : data.total_cost,
        inv_date : data.invoice_date,
        due_date: data.due_date,
        inv_type: data.inv_type
      }

      //if agel customer add to agel customers account
      if(data.customer_type == "cus_agel")
      {
        this.cusAglService.addAgelCustomerAcc(aglCusData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
        });
      }
      this.tableList=[];
      this.ngOnInit();
    }
  }

}
