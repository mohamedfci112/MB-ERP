import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { SnadatService } from '../../services/snadat.service';
import { AgelCustomersService } from '../../services/agel-customers.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-sand-abd-cash',
  templateUrl: './sand-abd-cash.component.html',
  styleUrls: ['./sand-abd-cash.component.css']
})
export class SandAbdCashComponent implements OnInit {

  lastId:number=0;

  searchTermCustomer : FormControl = new FormControl();
  customerList = <any>[];

  formdata:any;

  cust_id:any = "";

  matValue:any="";

  myDate = new Date();
    
  constructor(public sndServices:SnadatService, public cusAglService:AgelCustomersService, public custService:CustomerService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.sndServices.getLastAbdId().subscribe((data:any)=>{
      
      if(data[0].lastId == null)
      {
        this.lastId = 1;
      }
      else
      {
        this.lastId = data[0].lastId;
      }
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

    ///////
    this.formdata = new FormGroup({
      abd_id: new FormControl(""),
      customer_id: new FormControl(""),
      company_name: new FormControl(""),
      check_no: new FormControl(""),
      check_date: new FormControl(""),
      amount: new FormControl(""),
      bank_name: new FormControl(""),
      collect_date: new FormControl(""),
      due_date: new FormControl(""),
      admin: new FormControl(""),
      notes: new FormControl(""),
      abd_type: new FormControl(1)
    });
    ///

  }

  //
  addNew(){
    this.searchTermCustomer.setValue("");
    this.ngOnInit();
  }

  addSnd(data:any)
  {
    if(this.searchTermCustomer.value == "")
    {
      this.pushNotification.show("اختر العميل", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.amount == "")
    {
      this.pushNotification.show("ادخل المبلغ المدفوع", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.collect_date == "")
    {
      this.pushNotification.show("ادخل تاريخ التحصيل", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.due_date == "")
    {
      this.pushNotification.show("ادخل تاريخ الاستحقاق", {}, 6000, );
      this.router.navigated = false;
    }
    else
    {
      var sndData =
      {
        abd_id: this.lastId,
        customer_id: this.searchTermCustomer.value,
        company_name: data.company_name,
        check_no: data.check_no,
        check_date: data.check_date,
        amount: data.amount,
        bank_name: data.bank_name,
        collect_date: data.collect_date,
        due_date: data.due_date,
        admin: data.admin,
        notes: data.notes,
        abd_type: data.abd_type
      }

      this.sndServices.insertSndAbdCheck(sndData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
      });

      var custMosdad =
      {
        cust_no: this.searchTermCustomer.value,
        amount: data.amount,
        pay_type: "Cash",
        paid_date: data.collect_date
      }

      this.custService.insertMosdadCustomer(custMosdad).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
      });

      this.addNew();
      this.ngOnInit();
    }
  }

}
