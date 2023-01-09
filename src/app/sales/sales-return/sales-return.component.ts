import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { SalesService } from '../../services/sales.service';
import { AgelCustomersService } from '../../services/agel-customers.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { CustomerService } from 'src/app/services/customer.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-sales-return',
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.css']
})
export class SalesReturnComponent implements OnInit {

  searchTerm : FormControl = new FormControl();
  productList = <any>[];
  productSearchResult = <any>[];
  tableList = <any>[];

  invoice_no:any="";
  matValue:any="";

  customer_type:any;
  aglCustData:any;

  formdata:any;

  full_selected:any="";
  part_selected:any="";

  product_cost:any = 0;

  inventoryList = <any>[];
  inventory_id:any="";

  constructor(public aglService:AgelCustomersService, public custService:CustomerService, public salService:SalesService, public inventService:InventoryService, public prodService:ProductsService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {

    this.inventService.getInvList().subscribe((data:any)=>{
      this.inventoryList=data;
    });

    this.formdata = new FormGroup({
      inv_no: new FormControl(""),
      product_id: new FormControl(""),
      customer_id: new FormControl(""),
      product_quantity: new FormControl(""),
      taxes: new FormControl(""),
      product_unit_price: new FormControl(""),
      product_total_cost: new FormControl(""),
      paid_up: new FormControl(""),
      remainder: new FormControl(""),
      taxable: new FormControl(""),
      inv_type: new FormControl(""),

      inventory_id: new FormControl(""),

      quantity: new FormControl(""),
      total_cost: new FormControl(""),
      payment_type: new FormControl(""),
      customer_type: new FormControl(""),
      due_date: new FormControl(""),
      part: new FormControl(""),
    });

    this.searchTerm.valueChanges.subscribe(
      (term:any) => {
        term = {inv_no : this.searchTerm.value};
          
        if(term != ''){
          this.salService.GetAllSaleSearch(term).subscribe(
            (data:any) => {
              this.productList = data as any[];
            }
          );
        }
      }
    );

  }

  inventoryChange(event:any){
    this.inventory_id = event.target.value;
  }

  addNew(){
    this.searchTerm.setValue("");
    this.ngOnInit();
  }

  //search method
  searchProduct(invNo:any){
    
    this.invoice_no = invNo;
    var prodData = {
      inv_no : invNo
    };

    if(invNo == "" || this.matValue=="")
    {
      this.pushNotification.show("ادخل رقم الفاتورة", {}, 6000, );
      this.router.navigated = false;
    }
    else
    {
      this.salService.GetSalesInvoiceSearch
      (prodData).subscribe(
        (data:any) => {
          this.productSearchResult = data as any[];          
        }
      );
      this.addNew();
    }
    
  }

  //return all invoice products
  returnAll()
  {
    if(this.productSearchResult.length > 0)
    {
      if(this.inventory_id == "")
      {
        this.pushNotification.show("اختر المخزن", {}, 6000, );
        this.router.navigated = false;
      }
      else
      {
        for(let i=0;i<this.productSearchResult.length;i++)
        {
          // insert into returned table
          if(this.productSearchResult[i].taxes > 0)
          {
            var unit_price = this.productSearchResult[i].product_total_cost / this.productSearchResult[i].product_quantity;
            var discountValue = ((this.productSearchResult[i].product_quantity - this.productSearchResult[i].returned_quantity) * unit_price);
            var taxs = (discountValue * 0.14);
            var returned_Mony:any = (taxs + discountValue);
            var ReturnTable=
            {
              inv_no: this.productSearchResult[i].inv_no,
              product_id: this.productSearchResult[i].product_id,
              customer_id: this.productSearchResult[i].customer_id,
              product_quantity: (this.productSearchResult[i].product_quantity - this.productSearchResult[i].returned_quantity),
              taxes: taxs,
              product_unit_price: this.productSearchResult[i].product_unit_price,
              product_total_cost: returned_Mony,
              taxable: this.productSearchResult[i].taxable,
              inv_type: this.productSearchResult[i].inv_type,
              //inventory
              inventory_id: this.productSearchResult[i].inventory_id,

              return_date: new Date()
            }
            this.salService.insertReturnedTable(ReturnTable).subscribe((res:any)=>{
              this.pushNotification.show(res.tostring(), {}, 6000, );
            });
          }
          else
          {
            var unit_price = this.productSearchResult[i].product_total_cost / this.productSearchResult[i].product_quantity;
            var discountValue = ((this.productSearchResult[i].product_quantity - this.productSearchResult[i].returned_quantity) * unit_price);
            var returned_Mony:any = discountValue;

            var ReturnTable=
            {
              inv_no: this.productSearchResult[i].inv_no,
              product_id: this.productSearchResult[i].product_id,
              customer_id: this.productSearchResult[i].customer_id,
              product_quantity: (this.productSearchResult[i].product_quantity - this.productSearchResult[i].returned_quantity),
              taxes: 0,
              product_unit_price: this.productSearchResult[i].product_unit_price,
              product_total_cost: returned_Mony,
              taxable: this.productSearchResult[i].taxable,
              inv_type: this.productSearchResult[i].inv_type,
              //inventory
              inventory_id: this.inventory_id,

              return_date: new Date()
            }
            this.salService.insertReturnedTable(ReturnTable).subscribe((res:any)=>{
              this.pushNotification.show(res.tostring(), {}, 6000, );
            });
          }
          
          //
          var Returndata=
          {
            inv_no: this.productSearchResult[i].inv_no,
            product_id: this.productSearchResult[i].product_id,
            returned: 1,
            returned_quantity: ((this.productSearchResult[i].product_quantity - this.productSearchResult[i].returned_quantity) + this.productSearchResult[i].returned_quantity),
            return_date: new Date()
          }
          this.salService.insertReturnedSalesAll(Returndata).subscribe((res:any)=>{
            this.pushNotification.show(res.tostring(), {}, 6000, );
          });

          var invData = {
            product_id : this.productSearchResult[i].product_id,
            invent_id : this.inventory_id,
            product_quantity : (((this.productSearchResult[i].product_quantity - this.productSearchResult[i].returned_quantity) + this.productSearchResult[i].returned_quantity) * -1)
          }
          this.inventService.EditInventoryQuantityReturnedPurchase(invData).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
          });

          if(this.productSearchResult[i].taxes > 0)
          {
            var unit_price = this.productSearchResult[i].product_total_cost / this.productSearchResult[i].product_quantity;
            var discountValue = ((this.productSearchResult[i].product_quantity - this.productSearchResult[i].returned_quantity) * unit_price);
            this.product_cost += ((discountValue * 0.14) + discountValue);
          }
          else
          {
            var unit_price = this.productSearchResult[i].product_total_cost / this.productSearchResult[i].product_quantity;
            var discountValue = ((this.productSearchResult[i].product_quantity - this.productSearchResult[i].returned_quantity) * unit_price);
            this.product_cost += discountValue;
          }
          
          this.aglCustData = {
            cust_no : this.productSearchResult[i].customer_id,
            remainder : (this.product_cost * -1),
            inv_no : this.productSearchResult[i].inv_no,
            inv_date: new Date(),
            due_date: new Date,
            inv_type: this.productSearchResult[i].inv_type
          }
          this.customer_type = this.productSearchResult[i].customer_type;
        }

        //if agel supplier add to agel suppliers account
        if(this.customer_type == "cus_agel")
        {
          this.aglService.addAgelCustomerAcc(this.aglCustData).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
          });
        }

        this.ngOnInit();
        this.productSearchResult=[];
        this.product_cost=0;
      }
    }
    else
    {
      this.pushNotification.show("ادخل رقم الفاتورة وقم بالبحث", {}, 6000, );
      this.router.navigated = false;
    }
    

  }

  onItemChange(event:any)
  {
    if(event.target.checked)
    {
      if(event.target.value == "full_selected")
      {
        this.full_selected = "full_selected";
        this.part_selected = "";
        var x = document.getElementById("mySelect") as HTMLSelectElement | null;
        if(x != null){
          x.disabled = true;
        }
      }
      else if(event.target.value == "part_selected")
      {
        this.full_selected= "";
        this.part_selected = "part_selected";
        var x = document.getElementById("mySelect") as HTMLSelectElement | null;
        if(x != null){
          x.disabled = false;
        }
      }
    }
  }


  // return only selected products
  returnSelected(data:any)
  {
    var inputs = document.querySelectorAll('input[name=cb]:checked');
    if(inputs.length > 0)
    {
      
      if(this.inventory_id == "")
      {
        this.pushNotification.show("اختر المخزن", {}, 6000, );
        this.router.navigated = false;
      }
      else
      {
        if(this.full_selected == "" && this.part_selected == "")
        {
          this.pushNotification.show("اختر نوع الارجاع هل الكمية المحددة بالكامل ام جزء من المحدد؟", {}, 6000, );
          this.router.navigated = false;
        }
        else if(this.part_selected != "" && data.part == "")
        {
          this.pushNotification.show("ادخل الجزء المحدد الذى تريد ارجاعه", {}, 6000, );
          this.router.navigated = false;
        }
        // start full selected
        else if(this.full_selected != "")
        {
          for(var i = 0; i < inputs.length; i++){
            //product_id
            var idvalue = inputs[i].getAttribute("value");
    
            const indexx = this.productSearchResult.findIndex((object:any) => {
              return object.product_id === idvalue;
            });
    
            // insert into returned table
            if(this.productSearchResult[indexx].taxes > 0)
            {
              var unit_price = this.productSearchResult[indexx].product_total_cost / this.productSearchResult[indexx].product_quantity;
              var discountValue = ((this.productSearchResult[indexx].product_quantity - this.productSearchResult[indexx].returned_quantity) * unit_price);
              var taxs = (discountValue * 0.14);
              var returned_Mony:any = (taxs + discountValue);
              var ReturnTable=
              {
                inv_no: this.productSearchResult[indexx].inv_no,
                product_id: this.productSearchResult[indexx].product_id,
                customer_id: this.productSearchResult[indexx].customer_id,
                product_quantity: (this.productSearchResult[indexx].product_quantity - this.productSearchResult[indexx].returned_quantity),
                taxs: taxs,
                product_unit_price: this.productSearchResult[indexx].product_unit_price,
                product_total_cost: returned_Mony,
                taxable: this.productSearchResult[indexx].taxable,
                inv_type: this.productSearchResult[indexx].inv_type,
                inventory_id: this.inventory_id,

                return_date: new Date()
              }

              this.salService.insertReturnedTable(ReturnTable).subscribe((res:any)=>{
                this.pushNotification.show(res.tostring(), {}, 6000, );
              });
            }
            else
            {
              var unit_price = this.productSearchResult[indexx].product_total_cost / this.productSearchResult[indexx].product_quantity;
              var discountValue = ((this.productSearchResult[indexx].product_quantity - this.productSearchResult[indexx].returned_quantity) * unit_price);
              var returned_Mony:any = discountValue;

              var ReturnTable=
              {
                inv_no: this.productSearchResult[indexx].inv_no,
                product_id: this.productSearchResult[indexx].product_id,
                customer_id: this.productSearchResult[indexx].customer_id,
                product_quantity: (this.productSearchResult[indexx].product_quantity - this.productSearchResult[indexx].returned_quantity),
                taxs: 0,
                product_unit_price: this.productSearchResult[indexx].product_unit_price,
                product_total_cost: returned_Mony,
                taxable: this.productSearchResult[indexx].taxable,
                inv_type: this.productSearchResult[indexx].inv_type,
                inventory_id: this.inventory_id,

                return_date: new Date()
              }
              this.salService.insertReturnedTable(ReturnTable).subscribe((res:any)=>{
                this.pushNotification.show(res.tostring(), {}, 6000, );
              });
            }
            //here return all selected products
            var Returndata=
            {
              inv_no: this.productSearchResult[indexx].inv_no,
              product_id: this.productSearchResult[indexx].product_id,
              returned: 1,
              returned_quantity: ((this.productSearchResult[indexx].product_quantity - this.productSearchResult[indexx].returned_quantity) + this.productSearchResult[indexx].returned_quantity),
              return_date: new Date()
            }
            this.salService.insertReturnedSalesAll(Returndata).subscribe((res:any)=>{
              this.pushNotification.show(res.toString(), {}, 6000, );
            });
            //
            var invData = {
              product_id : this.productSearchResult[indexx].product_id,
              invent_id : this.inventory_id,
              product_quantity : ((this.productSearchResult[indexx].product_quantity - this.productSearchResult[indexx].returned_quantity) * -1)
            }
            this.inventService.EditInventoryQuantityReturnedPurchase(invData).subscribe((res:any)=>{
              this.pushNotification.show(res.toString(), {}, 6000, );
            });
            // if agel
            var discount_amount;
            if(this.productSearchResult[indexx].taxes > 0)
            {
              var unit_price = this.productSearchResult[indexx].product_total_cost / this.productSearchResult[indexx].product_quantity;
              var discountValue = ((this.productSearchResult[indexx].product_quantity - this.productSearchResult[indexx].returned_quantity) * unit_price);
              discount_amount = (discountValue * 0.14) + (discountValue);
            }
            else
            {
              var unit_price = this.productSearchResult[indexx].product_total_cost / this.productSearchResult[indexx].product_quantity;
              var discountValue = ((this.productSearchResult[indexx].product_quantity - this.productSearchResult[indexx].returned_quantity) * unit_price);
              discount_amount = discountValue;
            }
          
            this.aglCustData = {
              cust_no : this.productSearchResult[indexx].customer_id,
              remainder : (discount_amount * -1),
              inv_no : this.productSearchResult[indexx].inv_no,
              inv_date: new Date(),
              due_date: new Date,
              inv_type: this.productSearchResult[indexx].inv_type
            }
            this.customer_type = this.productSearchResult[indexx].customer_type;
            if(this.customer_type == "cus_agel")
            {
              this.aglService.addAgelCustomerAcc(this.aglCustData).subscribe((res:any)=>{
                this.pushNotification.show(res.toString(), {}, 6000, );
              });
            }
            //
          }
          this.ngOnInit();
          this.productSearchResult=[];
          //end of full_selected
        }
        else if(this.part_selected != "")
        {
          //start part selected
          if(inputs.length > 1)
          {
            this.pushNotification.show("عند ارجاع جزء محدد يرجى اختيار منتج واحد فقط", {}, 6000, );
            this.router.navigated = false;
          }
          else
          {
            for(var i = 0; i < inputs.length; i++)
            {
              //start for loop
              var idvalue = inputs[i].getAttribute("value");
    
              const indexx = this.productSearchResult.findIndex((object:any) => {
                return object.product_id === idvalue;
              });

              var currentQuantity = (this.productSearchResult[indexx].product_quantity - this.productSearchResult[indexx].returned_quantity);
              console.log(currentQuantity);
              if(data.part > currentQuantity)
              {
                this.pushNotification.show("الجزء المحدد اكبر من الكمية الفعلية للمنتج", {}, 6000, );
                this.router.navigated = false;
              }
              else
              {
                // insert into returned table
                if(this.productSearchResult[indexx].taxes > 0)
                {
                  var unit_price = this.productSearchResult[indexx].product_total_cost / this.productSearchResult[indexx].product_quantity;
                  var cost_returned = unit_price * data.part;
                  var taxs = (cost_returned * 0.14);
                  var returned_Mony:any = (taxs + cost_returned);

                  var ReturnTable1=
                  {
                    inv_no: this.productSearchResult[indexx].inv_no,
                    product_id: this.productSearchResult[indexx].product_id,
                    customer_id: this.productSearchResult[indexx].customer_id,
                    product_quantity: (data.part),
                    taxs: taxs,
                    product_unit_price: this.productSearchResult[indexx].product_unit_price,
                    product_total_cost: returned_Mony,
                    taxable: this.productSearchResult[indexx].taxable,
                    inv_type: this.productSearchResult[indexx].inv_type,
                    inventory_id: this.inventory_id,
                    return_date: new Date()
                  }

                  this.salService.insertReturnedTable(ReturnTable1).subscribe((res:any)=>{
                    this.pushNotification.show(res.tostring(), {}, 6000, );
                  });
                }
                else
                {
                  var unit_price = this.productSearchResult[indexx].product_total_cost / this.productSearchResult[indexx].product_quantity;
                  var cost_returned = unit_price * data.part;
                  var returned_Mony:any = cost_returned;

                  var ReturnTable1=
                  {
                    inv_no: this.productSearchResult[indexx].inv_no,
                    product_id: this.productSearchResult[indexx].product_id,
                    customer_id: this.productSearchResult[indexx].customer_id,
                    product_quantity: (data.part),
                    taxs: 0,
                    product_unit_price: this.productSearchResult[indexx].product_unit_price,
                    product_total_cost: returned_Mony,
                    taxable: this.productSearchResult[indexx].taxable,
                    inv_type: this.productSearchResult[indexx].inv_type,
                    inventory_id: this.inventory_id,
                    return_date: new Date()
                  }

                  this.salService.insertReturnedTable(ReturnTable1).subscribe((res:any)=>{
                    this.pushNotification.show(res.tostring(), {}, 6000, );
                  });
                }
                //here return all selected products
                var Returndata=
                {
                  inv_no: this.productSearchResult[indexx].inv_no,
                  product_id: this.productSearchResult[indexx].product_id,
                  returned: 1,
                  returned_quantity: (data.part + this.productSearchResult[indexx].returned_quantity),
                  return_date: new Date()
                }
                this.salService.insertReturnedSalesAll(Returndata).subscribe((res:any)=>{
                  this.pushNotification.show(res.toString(), {}, 6000, );
                });

                //
                var invData = {
                  product_id : this.productSearchResult[indexx].product_id,
                  invent_id : this.inventory_id,
                  product_quantity : (data.part * -1)
                }
                this.inventService.EditInventoryQuantityReturnedPurchase(invData).subscribe((res:any)=>{
                  this.pushNotification.show(res.toString(), {}, 6000, );
                });
                // if agel
                var discount_amount;
                if(this.productSearchResult[indexx].taxes > 0)
                {
                  var unit_price = this.productSearchResult[indexx].product_total_cost / this.productSearchResult[indexx].product_quantity;
                  var cost_returned = unit_price * data.part;
                  discount_amount = (cost_returned * 0.14) + (cost_returned);
                }
                else
                {
                  var unit_price = this.productSearchResult[indexx].product_total_cost / this.productSearchResult[indexx].product_quantity;
                  var cost_returned = unit_price * data.part;
                  discount_amount = cost_returned;
                }
                this.aglCustData = {
                  cust_no : this.productSearchResult[indexx].customer_id,
                  remainder : (discount_amount * -1),
                  inv_no : this.productSearchResult[indexx].inv_no,
                  inv_date: new Date(),
                  due_date: new Date,
                  inv_type : this.productSearchResult[indexx].inv_type,
                }
                this.customer_type = this.productSearchResult[indexx].customer_type;
                if(this.customer_type == "cus_agel")
                {
                  this.aglService.addAgelCustomerAcc(this.aglCustData).subscribe((res:any)=>{
                    this.pushNotification.show(res.toString(), {}, 6000, );
                  });
                }

              }
            }
            //end for loop
            this.ngOnInit();
            this.productSearchResult=[];
            // end if
          }
          //end part selected
        }
      }

    }
    else
    {
      this.pushNotification.show("اختر الذى تريده", {}, 6000, );
      this.router.navigated = false;
    }
  }

}
