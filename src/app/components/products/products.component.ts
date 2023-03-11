import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

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

}
