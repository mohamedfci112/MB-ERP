import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public userService:UserService) { }

  ngOnInit(): void {
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
