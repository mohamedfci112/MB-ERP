import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { AgelCustomersService } from '../../services/agel-customers.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  lastId:any;
  lastIdAgel:any;

  customerList = <any>[];

  formdata:any;

  public disabledAdd = false;
  public disabledNew = true;
  public disabledEdit = true;
  public disabledDelete = true;

  custName:any = "";
  custAdmin:any = "";
  custPhone:any = "";
  custAddress:any = "";
  custNotes:any = "";
  first_balance:any = "";

  first_balance_id:any = "";

  customerSearchResult = <any>[];

  searchTerm : FormControl = new FormControl();

  myDate = new Date();

  constructor(public agelCustService:AgelCustomersService,public custService:CustomerService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
   }

  ngOnInit(): void {
    this.custService.getCustomerList().subscribe((data : any) => {
      this.customerList = data;
    });

    this.custService.getCustomerLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    this.agelCustService.getAgelCustomerLastId().subscribe((data : any) => {
      this.lastIdAgel = data[0].Column1;
    });

    this.formdata = new FormGroup({
      customerId: new FormControl(""),
      customerName: new FormControl(""),
      customerAdmin: new FormControl(""),
      customerPhone: new FormControl(""),
      customerAddress: new FormControl(""),
      customerNotes: new FormControl(""),
      firstBalance: new FormControl("")
    });

    ///////////////
    this.searchTerm.valueChanges.subscribe(
      (term:any) => {
        term = {cust_name : this.searchTerm.value};
          
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

  addCustomer(data:any){
    var custData = {
      cust_no : this.lastId + 1,
      cust_name : data.customerName,
      admin_name : data.customerAdmin,
      cust_phone : data.customerPhone,
      cust_address : data.customerAddress,
      notes : data.customerNotes,
      first_balance_id : this.lastIdAgel
    };
    
    var aglCustData = {
      cust_no : this.lastId + 1,
      remainder : data.firstBalance,
      inv_no : "رصيد اول فترة",
      inv_date: this.myDate,
      due_date: this.myDate
    }

    if(data.customerName != ""){
      this.agelCustService.addAgelCustomerAcc(aglCustData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 1000, );
      });
      this.custService.addCustomer(custData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.disabledNew = true;
        this.disabledEdit = true;
        this.disabledDelete = true;
        this.disabledAdd = false;
        this.ngOnInit();
      });
    }
    else{
      this.pushNotification.show("اسم العميل فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }

  //search method
  searchCustomer(custId:any){
    this.addNew();

    var custData = {cust_no : custId};

    this.custService.GetCustomerData(custData).subscribe(
      (data:any) => {
        this.customerSearchResult = data as any[];

        var cust_id = data[0].cust_no;
        this.lastId = ((cust_id -1)+1)-1;
        this.custName = data[0].cust_name;
        this.custAdmin = data[0].admin_name;
        this.custPhone = data[0].cust_phone;
        this.custAddress = data[0].cust_address;
        this.custNotes = data[0].notes;
        this.first_balance = data[0].remainder;
        this.first_balance_id = data[0].first_balance_id;

        this.disabledNew = false;
        this.disabledEdit = false;
        this.disabledDelete = false;
        this.disabledAdd = true;
      }
    );
  }

  //clear to add new
  addNew(){
    this.custName = "";
    this.custAdmin = "";
    this.custPhone = "";
    this.custAddress = "";
    this.custNotes = "";
    this.first_balance = "";

    this.searchTerm.setValue("");

    this.disabledNew = true;
    this.disabledEdit = true;
    this.disabledDelete = true;
    this.disabledAdd = false;
    this.ngOnInit();
  }

  //
  onCustomerName(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.custName = element.value;
  }
  onCustomerAdmin(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.custAdmin = element.value;
  }
  onCustomerPhone(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.custPhone = element.value;
  }
  onCustomerAddress(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.custAddress = element.value;
  }
  onCustomerNotes(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.custNotes = element.value;
  }

  onFirstBalance(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.first_balance = element.value;
  }

  //update Supplier data
  update(data:any){

    var custData = {
      cust_no : this.lastId+1,
      cust_name : this.custName,
      admin_name : this.custAdmin,
      cust_phone : this.custPhone,
      cust_address : this.custAddress,
      notes : this.custNotes,
      remainder : this.first_balance,
      id : this.first_balance_id
    };

    if(this.custName != ''){
      this.custService.updateCustomer(custData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.ngOnInit();
        window.location.reload;
        this.searchTerm.setValue("");
        this.disabledNew = true;
        this.disabledEdit = true;
        this.disabledDelete = true;
        this.disabledAdd = false;
      });
    }
    else{
      this.pushNotification.show("اسم العميل فارغ", {}, 6000, );
      this.router.navigated = false;
    }
      
  }

  // delete Supplier
  delete(){
    if(confirm('هل انت متأكد؟')){
      if(this.custName != ''){

        this.custService.deleteCustomer(this.lastId).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
          this.ngOnInit();
          window.location.reload;
          this.searchTerm.setValue("");
          this.disabledNew = true;
          this.disabledEdit = true;
          this.disabledDelete = true;
          this.disabledAdd = false;
        });
      }
      else{
        this.pushNotification.show("اسم العميل فارغ", {}, 6000, );
        this.router.navigated = false;
      }
    }
  }

}
