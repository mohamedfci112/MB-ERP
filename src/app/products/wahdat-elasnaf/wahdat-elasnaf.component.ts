import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../../services/units.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-wahdat-elasnaf',
  templateUrl: './wahdat-elasnaf.component.html',
  styleUrls: ['./wahdat-elasnaf.component.css']
})
export class WahdatElasnafComponent implements OnInit {
  
  lastId:any;

  unitList = <any>[];

  formdata:any;

  constructor(public unitService:UnitsService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {

    this.unitService.getUnitList().subscribe((data : any) => {
      this.unitList = data;
    });

    this.unitService.getUnitLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    this.formdata = new FormGroup({
      unitId: new FormControl(""),
      unitName: new FormControl("")
    })

  }

  addUnit(data:any){
    var unitData = {
      unit_id : this.lastId + 1,
      unit_name : data.unitName
    };

    if(data.unitName != ""){
      this.unitService.addUnit(unitData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.ngOnInit();
      });
    }
    else{
      this.pushNotification.show("اسم الصنف فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }

  deleteUnit(){
    var inputs = document.querySelectorAll('input[name=cb]:checked');

    if(confirm('هل انت متأكد؟')){
      if(inputs.length > 0){
        for(var i = 0; i < inputs.length; i++){
          var unitidvalue = inputs[i].getAttribute("value");
          this.unitService.deleteUnit(unitidvalue).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
            this.ngOnInit();
          });
        }
        
      }
      else{
        this.pushNotification.show("اختر الوحدة الذى تريده", {}, 6000, );
        this.router.navigated = false;
      }
    }
    
    //console.log(inputs[0].getAttribute("value"));
  }

}
