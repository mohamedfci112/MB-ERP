import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ProductsService } from '../../services/products.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { DatePipe } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'app-harakt-sanf',
  templateUrl: './harakt-sanf.component.html',
  styleUrls: ['./harakt-sanf.component.css']
})
export class HaraktSanfComponent implements OnInit {

  searchTerm : FormControl = new FormControl();
  productList = <any>[];

  sales = <any>[];
  puchases = <any>[];
  salesReturn = <any>[];
  purchasesReturn = <any>[];
  inventoryBalance = <any>[];


  matValue:any="";
  formdata:any;

  sales_quantity:any=0;
  sales_before_tax:any=0;
  sales_after_tax:any=0;
  sales_taxes:any=0;
  sales_net:any=0;
  

  purchases_quantity:any=0;
  purchases_before_tax:any=0;
  purchases_after_tax:any=0;
  purchases_taxes:any=0;
  purchases_net:any=0;


  sales_return_quantity:any=0;
  sales_return_before_tax:any=0;
  sales_return_after_tax:any=0;
  sales_return_taxes:any=0;
  sales_return_net:any=0;

  purchases_return_quantity:any=0;
  purchases_return_before_tax:any=0;
  purchases_return_after_tax:any=0;
  purchases_return_taxes:any=0;
  purchases_return_net:any=0;



  constructor(public inventService:InventoryService, public prodService:ProductsService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    ///////
    this.formdata = new FormGroup({
      date_from: new FormControl(""),
      date_to: new FormControl(""),
    });
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
  }

  findData(data:any)
  {
    this.sales = [];
    this.puchases = [];
    this.salesReturn = [];
    this.purchasesReturn = [];
    this.inventoryBalance = [];

    if(data.date_from > data.date_to)
    {
      this.pushNotification.show("تأكد من صحة التواريخ المدخلة", {}, 6000, );
      this.router.navigated = false;
    }
    else if(this.searchTerm.value == "")
    {
      this.pushNotification.show("ادخل اسم المنتج", {}, 6000, );
      this.router.navigated = false;
    }
    else
    {
      var dta =
      {
        date_from: data.date_from,
        date_to: data.date_to,
        product_id: this.searchTerm.value
      }

      this.prodService.salesOperations(dta).subscribe((result:any)=>{
        this.sales = result;
        for(let i=0;i<result.length;i++)
        {
          this.sales_quantity += result[i].product_quantity;
          this.sales_before_tax += result[i].product_total_cost;

          if(result[i].taxes==0)
          {
            this.sales_after_tax += result[i].product_total_cost;
            this.sales_taxes += 0;
          }
          else
          {
            this.sales_after_tax += (result[i].product_total_cost * 0.14) + result[i].product_total_cost
            this.sales_taxes += result[i].product_total_cost * 0.14;
          }
        }
      });

      this.prodService.purchasesOperations(dta).subscribe((result:any)=>{
        this.puchases = result;
        for(let i=0;i<result.length;i++)
        {
          this.purchases_quantity += result[i].product_quantity;
          this.purchases_before_tax += result[i].product_total_cost;

          if(result[i].taxable==0)
          {
            this.purchases_after_tax += result[i].product_total_cost;
            this.purchases_taxes += 0;
          }
          else
          {
            this.purchases_after_tax += (result[i].product_total_cost * 0.14) + result[i].product_total_cost
            this.purchases_taxes += result[i].product_total_cost * 0.14;
          }
        }
      });

      this.prodService.salesReturnOperations(dta).subscribe((result:any)=>{
        this.salesReturn = result;
        for(let i=0;i<result.length;i++)
        {
          this.sales_return_quantity += result[i].product_quantity;
          this.sales_return_before_tax += result[i].product_total_cost;

          if(result[i].taxable==0)
          {
            this.sales_return_after_tax += result[i].product_total_cost;
            this.sales_return_taxes += 0;
          }
          else
          {
            this.sales_return_after_tax += (result[i].product_total_cost * 0.14) + result[i].product_total_cost
            this.sales_return_taxes += result[i].product_total_cost * 0.14;
          }
        }
      });

      this.prodService.purchasesReturnOperations(dta).subscribe((result:any)=>{
        this.purchasesReturn = result;
        for(let i=0;i<result.length;i++)
        {
          this.purchases_return_quantity += result[i].quantity;
          this.purchases_return_before_tax += result[i].product_total_cost;

          if(result[i].taxable==0)
          {
            this.purchases_return_after_tax += result[i].product_total_cost;
            this.purchases_return_taxes += 0;
          }
          else
          {
            this.purchases_return_after_tax += (result[i].product_total_cost * 0.14) + result[i].product_total_cost
            this.purchases_return_taxes += result[i].product_total_cost * 0.14;
          }
        }
      });

      this.prodService.inventoryBalance(dta).subscribe((result:any)=>{
        this.inventoryBalance = result;
      });
    }

  }

}
