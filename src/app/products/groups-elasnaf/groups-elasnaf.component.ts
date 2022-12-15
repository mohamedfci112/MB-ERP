import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../../services/units.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-groups-elasnaf',
  templateUrl: './groups-elasnaf.component.html',
  styleUrls: ['./groups-elasnaf.component.css']
})
export class GroupsElasnafComponent implements OnInit {

  lastId:any;

  groupList = <any>[];

  formdata:any;

  constructor(public unitService:UnitsService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {

    this.unitService.getGroupList().subscribe((data : any) => {
      this.groupList = data;
    });

    this.unitService.getGroupLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    this.formdata = new FormGroup({
      groupId: new FormControl(""),
      groupName: new FormControl("")
    })

  }

  addGroup(data:any){
    var groupData = {
      group_id : this.lastId + 1,
      group_name : data.groupName
    };

    if(data.groupName != ""){
      this.unitService.addGroup(groupData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.ngOnInit();
      });
    }
    else{
      this.pushNotification.show("اسم المجموعة فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }

  deleteGroup(){
    var inputs = document.querySelectorAll('input[name=cb]:checked');

    if(confirm('هل انت متأكد؟')){
      if(inputs.length > 0){
        for(var i = 0; i < inputs.length; i++){
          var groupidvalue = inputs[i].getAttribute("value");
          this.unitService.deleteGroup(groupidvalue).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
            this.ngOnInit();
          });
        }
        
      }
      else{
        this.pushNotification.show("اختر المجموعة التى تريدها", {}, 6000, );
        this.router.navigated = false;
      }
    }
    
    //console.log(inputs[0].getAttribute("value"));
  }

}
