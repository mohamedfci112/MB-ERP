import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-inventory-transfers-report',
  templateUrl: './inventory-transfers-report.component.html',
  styleUrls: ['./inventory-transfers-report.component.css']
})
export class InventoryTransfersReportComponent implements OnInit {

  invList = <any>[];
  gardList = <any>[];

  gardList1 = <any>[];

  gardList2 = <any>[];

  config: any;

  formdata:any;

  all:any="";
  one:any="";

  constructor(public invService:InventoryService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.gardList.count
    };

  }

  pageChanged(event:any){
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.invService.getInvList().subscribe((data : any) => {
      this.invList = data;
    });

    this.formdata = new FormGroup({
      inventory: new FormControl(""),
      inventoryFromId: new FormControl(""),
      inventoryToId: new FormControl(""),
      dateFrom: new FormControl(""),
      dateTo: new FormControl(""),
    });
  }

  onItemChange(event:any)
  {
    if(event.target.checked)
    {
      if(event.target.value == "all")
      {
        this.all = "all";
        this.one = "";
        var x = document.getElementById("mySelect") as HTMLSelectElement | null;
        if(x != null){
          x.disabled = true;
        }
        var x = document.getElementById("mySelect1") as HTMLSelectElement | null;
        if(x != null){
          x.disabled = true;
        }
      }
      else if(event.target.value == "one")
      {
        this.all= "";
        this.one = "one";
        var x = document.getElementById("mySelect") as HTMLSelectElement | null;
        if(x != null){
          x.disabled = false;
        }
        var x = document.getElementById("mySelect1") as HTMLSelectElement | null;
        if(x != null){
          x.disabled = false;
        }
      }
    }
  }


  Search(data:any)
  {
    if(this.all=="" && this.one=="")
    {
      this.pushNotification.show("اختر نوع البحث", {}, 6000, );
      this.router.navigated = false;
    }
    else if(this.all != "")
    {
      
      if(data.dateFrom == "" || data.dateTo == "")
      {
        this.pushNotification.show("ادخل التاريخ", {}, 6000, );
        this.router.navigated = false;
      }
      else
      {
        this.gardList2 = [];
        var dateData = {
          date1: data.dateFrom,
          date2: data.dateTo
        }
        this.invService.InventoryTransfersReport(dateData).subscribe((data:any)=>{
          this.gardList = data;
        });

        this.invService.InventoryTransfersReport1(dateData).subscribe((data:any)=>{
          this.gardList1 = data;
          
          for(var i=0;i<this.gardList1.length;i++){
            var obj = {
              "Fro": this.gardList[i].Fro,
              "product_name": this.gardList[i].product_name,
              "product_quantity": this.gardList[i].product_quantity,
              "purchase_price": this.gardList[i].purchase_price,
              "sell_price": this.gardList[i].sell_price,
              "trans_admin": this.gardList[i].trans_admin,
              "trans_date": this.gardList[i].trans_date,
              "trans_reason": this.gardList[i].trans_reason,
              "Too": this.gardList1[i].Too,
            }
            this.gardList2.splice(i, 0, obj);
          }
        });
      }
      
    }
    else if(this.one != "")
    {
      if(data.inventoryFromId != "" && data.inventoryToId != "")
      {
        if(data.inventoryFromId == data.inventoryToId)
        {
          this.pushNotification.show("لا يمكن اختيار نفس المخزن", {}, 6000, );
          this.router.navigated = false;
        }
        else
        {
          if(data.dateFrom == "" || data.dateTo == "")
          {
            this.pushNotification.show("ادخل التاريخ", {}, 6000, );
            this.router.navigated = false;
          }
          else
          {
            this.gardList2 = [];
            var dateData1 = {
              date1: data.dateFrom,
              date2: data.dateTo,
              invent_from_id: data.inventoryFromId,
              invent_to_id: data.inventoryToId
            }
            this.invService.WithInventoryTransfersReport(dateData1).subscribe((data:any)=>{
              this.gardList = data;
            });

            this.invService.WithInventoryTransfersReport1(dateData1).subscribe((data:any)=>{
              this.gardList1 = data;
              
              for(var i=0;i<this.gardList1.length;i++){
                var obj = {
                  "Fro": this.gardList[i].Fro,
                  "product_name": this.gardList[i].product_name,
                  "product_quantity": this.gardList[i].product_quantity,
                  "purchase_price": this.gardList[i].purchase_price,
                  "sell_price": this.gardList[i].sell_price,
                  "trans_admin": this.gardList[i].trans_admin,
                  "trans_date": this.gardList[i].trans_date,
                  "trans_reason": this.gardList[i].trans_reason,
                  "Too": this.gardList1[i].Too,
                }
                this.gardList2.splice(i, 0, obj);
              }
            });
          }
          
        }
      }
      else
      {
        this.pushNotification.show("اختر اسم المخزن المحول منه وله", {}, 6000, );
        this.router.navigated = false;
      }
      
    }
  }

}
