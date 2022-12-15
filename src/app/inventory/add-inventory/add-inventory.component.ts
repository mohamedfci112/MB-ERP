import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {

  public disabledAdd = false;
  public disabledNew = true;
  public disabledEdit = true;
  public disabledDelete = true;

  lastId:any;
  inventName:any = "";
  inventNote:any = "";
  inventoryList = <any>[];

  inventorySearchResult = <any>[];

  searchTerm : FormControl = new FormControl();

  formdata:any;
  constructor(public invent:InventoryService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.searchTerm.valueChanges.subscribe(
      (term:any) => {
        term = {invent_id : "",
          invent_name : this.searchTerm.value,
          notes : ""};
          
        if(term != ''){
          this.invent.getSearchResult(term).subscribe(
            (data:any) => {
              this.inventoryList = data as any[];
            }
          );
        }
      }
    );
    //this.invent.getInvList().subscribe((data : any) => console.log(data));
    this.invent.getLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    this.formdata = new FormGroup({
      inventoryId: new FormControl(""),
      inventoryName: new FormControl(""),
      inventoryNotes: new FormControl("")
    })
  }

  addInventory(data:any){
    var invData = {invent_id : this.lastId + 1,
                    invent_name : data.inventoryName,
                    notes : data.inventoryNotes};
    //console.log(invData);
    if(data.inventoryName != ""){
      this.invent.addInventory(invData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.disabledNew = true;
        this.disabledEdit = true;
        this.disabledDelete = true;
        this.disabledAdd = false;
        this.ngOnInit();
      });
    }
    else{
      this.pushNotification.show("اسم المخزن فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }

  //
  //search method
  searchInventory(invId:any){
    this.addNew();
    var invData = {invent_id : invId};

    this.invent.GetInventoriesSearch(invData).subscribe(
      (data:any) => {
        this.inventorySearchResult = data as any[];
        
        var inv_id = data[0].invent_id;
        this.lastId = (inv_id -1) + 1;
        this.inventName = data[0].invent_name;
        this.inventNote = data[0].notes;
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
    this.inventName = "";
        this.inventNote = "";
    this.searchTerm.setValue("");
    this.disabledNew = true;
    this.disabledEdit = true;
    this.disabledDelete = true;
    this.disabledAdd = false;
  }
//
  onInventoryName(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.inventName = element.value;
  }
  onInventoryNote(searchValue: any){
    const element = searchValue.currentTarget as HTMLInputElement;
    this.inventNote = element.value;
  }
  //update Inventory data
  updateInv(data:any){

    var invData = {invent_id : this.lastId,
      invent_name : this.inventName,
      notes : this.inventNote};

    if(this.inventName != ''){
      this.invent.updateInventory(invData).subscribe((res:any)=>{
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
      this.pushNotification.show("اسم المخزن فارغ", {}, 6000, );
      this.router.navigated = false;
    }
      
  }

  deleteInv(){
    
    if(confirm('هل انت متأكد؟')){
      if(this.inventName != ''){
        console.log(this.lastId);
        this.invent.deleteInventory(this.lastId).subscribe((res:any)=>{
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
        this.pushNotification.show("اسم المخزن فارغ", {}, 6000, );
        this.router.navigated = false;
      }
    }
  }

}
