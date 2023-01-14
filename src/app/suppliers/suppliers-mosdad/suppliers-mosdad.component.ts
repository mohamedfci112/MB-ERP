import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PushNotificationService } from 'ng-push-notification';
import { MosdadSuppliersService } from 'src/app/services/mosdad-suppliers.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-suppliers-mosdad',
  templateUrl: './suppliers-mosdad.component.html',
  styleUrls: ['./suppliers-mosdad.component.css']
})
export class SuppliersMosdadComponent implements OnInit {

  searchTerm : FormControl = new FormControl();
  supplierList = <any>[];

  productSearchResult = <any>[];

  matValue:any="";

  remainTotal:any= 0;

  config: any;

  constructor(private pushNotification: PushNotificationService,public mosService:MosdadSuppliersService, public suppService:SupplierService, private route: ActivatedRoute, private router: Router) {
    this.config = {
      itemsPerPage: 50,
      currentPage: 1,
      totalItems: this.productSearchResult.count
    };
   }

  ngOnInit(): void {
    this.searchTerm.valueChanges.subscribe(
      (term:any) => {
        term = {sup_name : this.searchTerm.value};
          
        if(term != ''){
          this.suppService.getSearchResult(term).subscribe(
            (data:any) => {
              this.supplierList = data as any[];
            }
          );
        }
      }
    );
  }

  pageChanged(event:any){
    this.config.currentPage = event;
  }


  addNew(){
    this.searchTerm.setValue("");
    this.ngOnInit();
  }

  //search method
  searchSupplier(supNo:any){
    
    var supData = {
      sup_no : supNo
    };

    if(supNo == "" || this.matValue=="")
    {
      this.pushNotification.show("ادخل اسم المورد", {}, 6000, );
      this.router.navigated = false;
    }
    else
    {
      this.suppService.GetSuppliersMosdadSearch(supData).subscribe(
        (data:any) => {
          this.productSearchResult = data as any[];
          for(let i=0;i<data.length;i++)
          {
            this.remainTotal += (data[i].amount * -1);
          }
        }
      );
      this.addNew();
    }
    
  }

}
