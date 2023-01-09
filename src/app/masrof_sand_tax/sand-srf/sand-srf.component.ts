import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { SnadatService } from '../../services/snadat.service';
import { AgelSuppliersService } from '../../services/agel-suppliers.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { DatePipe } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'app-sand-srf',
  templateUrl: './sand-srf.component.html',
  styleUrls: ['./sand-srf.component.css']
})
export class SandSrfComponent implements OnInit {

  lastId:number=0;

  searchTermCustomer : FormControl = new FormControl();
  customerList = <any>[];

  formdata:any;

  matValue:any="";

  myDate = new Date();
    
  constructor(public sndServices:SnadatService, public supAglService:AgelSuppliersService, public supService:SupplierService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.sndServices.getLastSrfId().subscribe((data:any)=>{
      
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
        term1 = {sup_name : this.searchTermCustomer.value};
          
        if(term1 != ''){
          this.supService.getSearchResult(term1).subscribe(
            (data1:any) => {
              this.customerList = data1 as any[];
            }
          );
        }
      }
    );

    ///////
    this.formdata = new FormGroup({
      srf_id: new FormControl(""),
      supplier_id: new FormControl(""),
      company_name: new FormControl(""),
      check_no: new FormControl(""),
      check_date: new FormControl(""),
      amount: new FormControl(""),
      bank_name: new FormControl(""),
      collect_date: new FormControl(""),
      due_date: new FormControl(""),
      admin: new FormControl(""),
      notes: new FormControl(""),
      srf_type: new FormControl(0)
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
      this.pushNotification.show("اختر المورد", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.check_no == "")
    {
      this.pushNotification.show("ادخل رقم الشيك", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.check_date == "")
    {
      this.pushNotification.show("ادخل تاريخ الشيك", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.amount == "")
    {
      this.pushNotification.show("ادخل المبلغ المدفوع", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.bank_name == "")
    {
      this.pushNotification.show("ادخل اسم البنك", {}, 6000, );
      this.router.navigated = false;
    }
    else if(data.collect_date == "")
    {
      this.pushNotification.show("ادخل تاريخ الصرف", {}, 6000, );
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
        srf_id: this.lastId,
        supplier_id: this.searchTermCustomer.value,
        company_name: data.company_name,
        check_no: data.check_no,
        check_date: data.check_date,
        amount: data.amount,
        bank_name: data.bank_name,
        collect_date: data.collect_date,
        due_date: data.due_date,
        admin: data.admin,
        notes: data.notes,
        srf_type: data.srf_type
      }

      this.sndServices.insertSndSrfCheck(sndData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
      });

      var supMosdad =
      {
        sup_no: this.searchTermCustomer.value,
        amount: data.amount,
        pay_type: "Check",
        paid_date: data.collect_date
      }

      this.supService.insertMosdadSupplier(supMosdad).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
      });

      this.addNew();
      this.ngOnInit();
    }
  }

}
