import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ProductsService } from '../../services/products.service';
import { CustomerService } from '../../services/customer.service';
import { OffersService } from '../../services/offers.service';
import { PurchasesService } from '../../services/purchases.service';
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

  constructor(public purchService: PurchasesService, public offerService:OffersService, public custService:CustomerService, public inventService:InventoryService, public prodService:ProductsService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    //
    this.offerService.getOfferLastId().subscribe((data:any)=>{
      this.lastId = data[0].Column1;
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
      offer_no: new FormControl(""),
      customer_id: new FormControl(""),
      quantity: new FormControl(""),
      total_amount: new FormControl(""),
      product_id: new FormControl(""),
      product_quantity: new FormControl(""),
      product_unit_price: new FormControl(""),
      product_total_cost: new FormControl(""),
    });
    ///
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

}
