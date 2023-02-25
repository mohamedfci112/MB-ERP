import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  username:any;
  
  group_name:any="";
  user_name:any="";
  user_id:any="";
  user_pass:any="";
  group_id:any="";

  last_group_id:any=0;

  groupList = <any>[];
  usersList = <any>[];

  constructor(public userService: UsersService,private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
   }

   ngOnInit(): void {
    this.userService.GetGroupLastID().subscribe((data : any) => {
      if(data[0].lastId == null)
      {
        this.user_id = '1';
      }
      else
      {
        this.user_id = data[0].lastId;
      }
    });

    this.userService.GetLastGroup().subscribe((data : any) => {
      if(data[0].lastId == null)
      {
        this.last_group_id = '1';
      }
      else
      {
        this.last_group_id = data[0].lastId;
      }
    });

    this.userService.getAllGroups().subscribe((data : any) => {
      this.groupList = data;
    });

    this.userService.getAllUsers().subscribe((data : any) => {
      this.usersList = data;
    });
  }

  deleteUser(){
    var inputs = document.querySelectorAll('input[name=cb]:checked');

    if(confirm('هل انت متأكد؟')){
      if(inputs.length > 0){
        for(var i = 0; i < inputs.length; i++){
          var useridvalue = inputs[i].getAttribute("value");

          this.userService.deleteUser(useridvalue).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
            this.ngOnInit();
          });
        }
        
      }
      else{
        this.pushNotification.show("اختر المستخدم الذى تريده", {}, 6000, );
        this.router.navigated = false;
      }
    }
    
  }

  addGroup(groName:any){
    var groupData = {group_name: groName};
    var groupData1 = {group_id: this.last_group_id};

    if(groName == "")
      {
        this.pushNotification.show("يرجى ادخال اسم المجموعة", {}, 6000, );
        this.router.navigated = false;
      }
      else
      {
        this.userService.insertGroupScreens(groupData1).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
        });

        this.userService.insertUserGroup(groupData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
          this.group_name="";
          this.ngOnInit();
        });
      }
  }

  addUser(username:any,userid:any,userpass:any,groupid:any)
  {
    var userData = 
    {
      username: username,
      password: userpass,
      group_id: groupid,
    };
    if(username == "" || userpass == "")
      {
        this.pushNotification.show("يرجى ادخال بيانات المستخدم", {}, 6000, );
        this.router.navigated = false;
      }
    else
      {
        this.userService.insertUser(userData).subscribe((res:any)=>{
          this.pushNotification.show(res.toString(), {}, 6000, );
          this.user_name="";
          this.user_pass="";
          this.ngOnInit();
        });
      }

  }

}
