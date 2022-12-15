import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  lastId:any;

  supplierList = <any>[];

  formdata:any;

  public disabledAdd = false;
  public disabledNew = true;
  public disabledEdit = true;
  public disabledDelete = true;

  suppName:any = "";
  suppAdmin:any = "";
  suppPhone:any = "";
  suppAddress:any = "";
  suppNotes:any = "";

  supplierSearchResult = <any>[];

  searchTerm : FormControl = new FormControl();

  constructor(public supService:SupplierService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
   }

  ngOnInit(): void {
    this.supService.getSupplierList().subscribe((data : any) => {
      this.supplierList = data;
    });

    this.supService.getSupplierLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    this.formdata = new FormGroup({
      supplierId: new FormControl(""),
      supplierName: new FormControl(""),
      supplierAdmin: new FormControl(""),
      supplierPhone: new FormControl(""),
      supplierAddress: new FormControl(""),
      supplierNotes: new FormControl("")
    });

    ///////////////
    this.searchTerm.valueChanges.subscribe(
      (term:any) => {
        term = {sup_name : this.searchTerm.value};
          
        if(term != ''){
          this.supService.getSearchResult(term).subscribe(
            (data:any) => {
              this.supplierList = data as any[];
            }
          );
        }
      }
    );
    //
  }

  addSupplier(data:any){
    var supData = {
      sup_no : this.lastId + 1,
      sup_name : data.supplierName,
      admin_name : data.supplierAdmin,
      sup_phone : data.supplierPhone,
      sup_address : data.supplierAddress,
      notes : data.supplierNotes
    };
    //console.log(supData);

    if(data.supplierName != ""){
      this.supService.addSupplier(supData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.disabledNew = true;
        this.disabledEdit = true;
        this.disabledDelete = true;
        this.disabledAdd = false;
        this.ngOnInit();
      });
    }
    else{
      this.pushNotification.show("اسم المورد فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }

  //
  //search method
  searchSupplier(supId:any){
    this.addNew();

    var supData = {sup_no : supId};

    this.supService.GetSupplierSearch(supData).subscribe(
      (data:any) => {
        this.supplierSearchResult = data as any[];
        
        var sup_id = data[0].sup_no;
        this.lastId = (sup_id -1) + 1;
        this.suppName = data[0].sup_name;
        this.suppAdmin = data[0].admin_name;
        this.suppPhone = data[0].sup_phone;
        this.suppAddress = data[0].sup_address;
        this.suppNotes = data[0].notes;

        this.disabledNew = false;
        this.disabledEdit = false;
        this.disabledDelete = false;
        this.disabledAdd = true;

        //console.log(this.inventorySearchResult);
      }
    );
  }

  //clear to add new
  addNew(){
    this.suppName = "";
    this.suppAdmin = "";
    this.suppPhone = "";
    this.suppAddress = "";
    this.suppNotes = "";

    this.searchTerm.setValue("");

    this.disabledNew = true;
    this.disabledEdit = true;
    this.disabledDelete = true;
    this.disabledAdd = false;
  }

  //
  onSupplierName(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.suppName = element.value;
  }
  onSupplierAdmin(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.suppAdmin = element.value;
  }
  onSupplierPhone(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.suppPhone = element.value;
  }
  onSupplierAddress(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.suppAddress = element.value;
  }
  onSupplierNotes(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.suppNotes = element.value;
  }

  //update Supplier data
  update(data:any){

    var supData = {
      sup_no : this.lastId,
      sup_name : this.suppName,
      admin_name : this.suppAdmin,
      sup_phone : this.suppPhone,
      sup_address : this.suppAddress,
      notes : this.suppNotes,
    };

    if(this.suppName != ''){
      this.supService.updateSupplier(supData).subscribe((res:any)=>{
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
      this.pushNotification.show("اسم المورد فارغ", {}, 6000, );
      this.router.navigated = false;
    }
      
  }

  // delete Supplier
  delete(){
    if(confirm('هل انت متأكد؟')){
      if(this.suppName != ''){

        this.supService.deleteSupplier(this.lastId).subscribe((res:any)=>{
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
        this.pushNotification.show("اسم المورد فارغ", {}, 6000, );
        this.router.navigated = false;
      }
    }
  }

}
