import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NavigationComponent } from '../navigation/navigation.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  groupScreensList = <any>[];
  groupId:any;

  constructor(public userService:UsersService) { }

  ngOnInit(): void {
    this.groupId = localStorage.getItem('group_id');
    
    var dta={group_id: this.groupId};

    this.userService.GetGroupScreens(dta).subscribe((data : any) => {
      this.groupScreensList = data;
    });
  }

  ngAfterViewInit(){
    
  }


  // tslint:disable-next-line:typedef
  logout(){
    localStorage.removeItem('user_id');
    localStorage.removeItem('group_id');
    localStorage.removeItem('username');
    localStorage.removeItem('group_name');
    window.location.href = '/';
  }

}
