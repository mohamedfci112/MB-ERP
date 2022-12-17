import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-gard-inventory',
  templateUrl: './gard-inventory.component.html',
  styleUrls: ['./gard-inventory.component.css']
})
export class GardInventoryComponent implements OnInit {

  invList = <any>[];
  gardList = <any>[];

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
      inventoryId: new FormControl("")
    });
  }


  gardSearch(data:any)
  {
    if(this.all=="" && this.one=="")
    {
      this.pushNotification.show("اختر نوع البحث", {}, 6000, );
      this.router.navigated = false;
    }
    else if(this.all != "")
    {
      this.invService.GardInventory().subscribe((data:any)=>{
        this.gardList = data;
      });
    }
    else if(this.one != "")
    {
      if(data.inventoryId != "")
      {
        var val = {invent_id: data.inventoryId}
        this.invService.GardOneInventory(val).subscribe((data:any)=>{
          this.gardList = data;
        });
      }
      else
      {
        this.pushNotification.show("اختر اسم المخزن", {}, 6000, );
        this.router.navigated = false;
      }
      
    }
  }

  onItemChange(event:any)
  {
    if(event.target.checked)
    {
      if(event.target.value == "all")
      {
        this.all = "all";
        this.one = "";
      }
      else if(event.target.value == "one")
      {
        this.all= "";
        this.one = "one";
      }
    }
  }

}
