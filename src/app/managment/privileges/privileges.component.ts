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

  isShowVal : FormControl = new FormControl(false);
  isAddVal : FormControl = new FormControl(false);
  isUpdateVal : FormControl = new FormControl(false);
  isDeleteVal : FormControl = new FormControl(false);

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

      console.log(data);
    });
  }

  save(id:any){
    console.log(id);
    console.log(this.isAddVal.value);
    console.log(this.isDeleteVal.value);
    console.log(this.isShowVal.value);
    console.log(this.isUpdateVal.value);
  }

  givePriv(data:any)
  {}
}
