import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PushNotificationService } from 'ng-push-notification';
import { AgelCustomersService } from 'src/app/services/agel-customers.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers-agel-remain',
  templateUrl: './customers-agel-remain.component.html',
  styleUrls: ['./customers-agel-remain.component.css']
})
export class CustomersAgelRemainComponent implements OnInit {

  searchTerm : FormControl = new FormControl();
  customerList = <any>[];

  productSearchResult = <any>[];

  matValue:any="";

  remainTotal:any= 0;

  config: any;

  constructor(private pushNotification: PushNotificationService,public agelCustService:AgelCustomersService, public custService:CustomerService, private route: ActivatedRoute, private router: Router) {
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
          this.custService.getSearchResult(term).subscribe(
            (data:any) => {
              this.customerList = data as any[];
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
  searchCustomer(cusNo:any){
    
    var cusData = {
      cust_no : cusNo
    };

    if(cusNo == "" || this.matValue=="")
    {
      this.pushNotification.show("ادخل اسم العميل", {}, 6000, );
      this.router.navigated = false;
    }
    else
    {
      this.custService.GetAgelCustomersSearch(cusData).subscribe(
        (data:any) => {
          this.productSearchResult = data as any[];
          for(let i=0;i<data.length;i++)
          {
            this.remainTotal += (data[i].remainder * 1);
          }
        }
      );
      this.addNew();
    }
    
  }

}
