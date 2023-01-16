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
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

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

  ezn_no:any="";

  myDate = new Date();
  
  offersDetailsList = <any>[];
  eznSrfDetailsList = <any>[];

  offer_no: any;
  inv_no: any;

  config: any;

  taxesCal:any=0;

  public disabledAdd = false;

  isOffer:any=false;
  isEznSrf:any=false;
  isInvoice:any=false;

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

    this.isOffer=false;
    this.isEznSrf=false;
    this.isInvoice=true;

    this.offerService.GetAll().subscribe((data : any) => {
      this.offersDetailsList = data;
      console.log(this.offersDetailsList);
    });
    //
    this.salesService.GetAll().subscribe((data : any) => {
      this.eznSrfDetailsList = data;
      console.log(this.offersDetailsList);
    });
    //
    this.salesService.getLastSalesInvId().subscribe((data:any)=>{
      
      if(data[0].lastId == null)
      {
        this.lastId = 30000001;
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
      taxable: new FormControl(1),
      taxes: new FormControl(""),
      inv_type: new FormControl(1),
      paid_up: new FormControl(0),
      remainder: new FormControl(0),
      invoice_date: new FormControl(new Date()),
      invent_id: new FormControl(""),
    });
    ///
  }


  exportOffer(offerNo:any)
  {
    this.tableList = [];
    var x = {offer_no: offerNo}
    this.offerService.getOfferDetails(x).subscribe((data:any)=>{
      this.tableList = data;
      console.log(this.tableList);
      this.matValue1 = this.tableList[0].customer_id;
      this.offer_no = this.tableList[0].offer_no;
      //
      this.disabledAdd = true;
      this.isOffer = true;
      this.isEznSrf = false;
      this.isInvoice = false;
    });
  }
  //
  exportEznsrf(invNo:any)
  {
    this.tableList = [];
    var x = {inv_no: invNo}
    this.salesService.getEznSrfDetails(x).subscribe((data:any)=>{
      this.tableList = data;
      //console.log(this.tableList);
      this.matValue1 = this.tableList[0].customer_id;

      this.ezn_no = this.tableList[0].inv_no;
      //
      this.disabledAdd = true;
      this.isOffer = false;
      this.isEznSrf = true;
      this.isInvoice = false;
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
        if(this.tableList.length == 0)
        {
          this.disabledAdd = false;
          this.isOffer=false;
          this.isEznSrf=false;
          this.isInvoice=true;
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
      var invent_id = document.querySelectorAll('input[name=invent_id]');

      var fatoraData;

      this.taxesCal = (parseFloat(data.total_cost) * 0.14);

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
          taxes: this.taxesCal,
          inv_type: data.inv_type,
          paid_up: data.paid_up,
          remainder: data.remainder,
          invoice_date: data.invoice_date
        };
        
        

        this.salesService.insertEznSrf(fatoraData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
        });

        if(this.isInvoice == true || this.isOffer == true)
        {
          var invData = 
          {
            product_id : this.tableList[i].product_id,
            invent_id : this.tableList[i].invent_id,
            product_quantity : (product_quantity[i] as HTMLInputElement).value
          }
          this.salesService.EditInventoryQuantitySales(invData).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
          });
        }
        if(this.isEznSrf == true)
        {
          var eznData = 
          {
            inv_no : this.ezn_no
          }
          this.salesService.CancelEznSrfInv(eznData).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
          });
        }
        if(this.isOffer == true)
        {
          var offerData = 
          {
            inv_no : this.offer_no
          }
          this.offerService.CancelOfferRequest(offerData).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
          });
        }

      }

      var aglCusData = {
        cust_no : this.searchTermCustomer.value,
        inv_no : this.lastId,
        remainder : (parseFloat(data.total_cost) + this.taxesCal),
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
      this.addNew();
      this.disabledAdd=false;
      this.ngOnInit();
    }
  }

}
