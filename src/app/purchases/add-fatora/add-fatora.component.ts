import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ProductsService } from '../../services/products.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-fatora',
  templateUrl: './add-fatora.component.html',
  styleUrls: ['./add-fatora.component.css']
})
export class AddFatoraComponent implements OnInit {

  public disabledAdd = false;
  public disabledDelete = true;

  lastId:any;

  inventoryList = <any>[];
  productList = <any>[];

  productSearchResult = <any>[];

  searchTerm : FormControl = new FormControl();

  formdata:any;

  constructor(public inventService:InventoryService, public prodService:ProductsService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
  }

}
