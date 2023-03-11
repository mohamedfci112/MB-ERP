import { Component } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.css']
})
export class PrivilegesComponent {

  formdata:any;
  screensList = <any>[];
  groupList = <any>[];
  groupScreensList = <any>[];

  group_id:any="";

  constructor(public userService: UsersService,private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.userService.getAllGroups().subscribe((data : any) => {
      this.groupList = data;
    });

    
  }

  myGroup(groupID:any) {
    var val = {group_id : groupID.target.value};
    this.userService.GetGroupScreens(val).subscribe((data : any) => {
      this.groupScreensList = data;
      this.screensList = data;
    });
  }

  save(id:any){
    //console.log(id);
    var show = <HTMLInputElement>document.getElementById("salesShow"+id);
    var add = <HTMLInputElement>document.getElementById("salesAdd"+id);
    var edit = <HTMLInputElement>document.getElementById("salesEdit"+id);
    var delet = <HTMLInputElement>document.getElementById("salesDelete"+id);
    if(show != null && add != null && edit !=null && delet != null)
    {
      var isShow;
      var isAdd;
      var isEdit;
      var isDelet;

      isShow=show.value;
      if(show.value == 'false'){isShow=0}
      else if(show.value == 'true'){isShow=1}

      isAdd=add.value;
      if(add.value == 'false'){isAdd=0}
      else if(add.value == 'true'){isAdd=1}

      isEdit=edit.value;
      if(edit.value == 'false'){isEdit=0}
      else if(edit.value == 'true'){isEdit=1}

      isDelet=delet.value;
      if(delet.value == 'false'){isDelet=0}
      else if(delet.value == 'true'){isDelet=1}

      var val = {isShow : isShow, isDelete: isDelet, isUpdate: isEdit, isAdd:isAdd, id:id};
      this.userService.givePriv(val).subscribe((res:any)=>{
        this.pushNotification.show("تم الحفظ", {}, 2000, );
      });

    }
  }

}
