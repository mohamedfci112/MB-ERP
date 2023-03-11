import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from 'ng-push-notification';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  groupId:any;

  constructor(public userService: UsersService,private pushNotification: PushNotificationService) { 
  }

  ngOnInit(): void {
    this.groupId = localStorage.getItem('group_id');
    
    var dta={group_id: this.groupId};

    this.userService.GetGroupScreens(dta).subscribe((data : any) => {
      this.userService.setScreens(data);
    });
  }


}
