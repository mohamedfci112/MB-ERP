import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PushNotificationService } from 'ng-push-notification';
import { AgelCustomersService } from 'src/app/services/agel-customers.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  searchTerm : FormControl = new FormControl();
  customerList = <any>[];

  productSearchResult = <any>[];

  matValue:any="";

  remainTotal:any= 0;
  paidTotal:any= 0;

  config: any;

  formdata:any;

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

    this.formdata = new FormGroup({
      date1: new FormControl(""),
      date2: new FormControl("")
    });
  }

  pageChanged(event:any){
    this.config.currentPage = event;
  }


  addNew(){
    this.searchTerm.setValue("");
    this.ngOnInit();
  }

  //search method
  searchCustomer(data:any){
    this.remainTotal=0;
    this.paidTotal=0;
    
    var cusData = {
      cust_no : this.searchTerm.value,
      date1: data.date1,
      date2: data.date2
    };

    if(this.searchTerm.value == "" || this.matValue=="")
    {
      this.pushNotification.show("ادخل اسم العميل", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.date1 > data.date2)
    {
      this.pushNotification.show("خطأ بالتاريخ المدخل", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.date1 == "" ||  data.date2 == "")
    {
      this.pushNotification.show("ادخل التواريخ", {}, 6000, );
      this.router.navigated = false;
    }
    else
    {
      this.custService.GetCustomerPaymentsSearch(cusData).subscribe(
        (data:any) => {
          this.productSearchResult = data as any[];
          console.log(this.productSearchResult);
          for(let i=0;i<data.length;i++)
          {
            if(data[i].typee == "1")
            {
              this.remainTotal += data[i].remainder;
            }
            else
            {
              this.paidTotal += data[i].remainder;
            }
          }
        }
      );
      this.addNew();
    }
    
  }

}
