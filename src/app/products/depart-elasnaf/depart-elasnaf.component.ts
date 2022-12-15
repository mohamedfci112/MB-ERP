import { Component, OnInit } from '@angular/core';
import { DepartsService } from '../../services/departs.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-depart-elasnaf',
  templateUrl: './depart-elasnaf.component.html',
  styleUrls: ['./depart-elasnaf.component.css']
})
export class DepartElasnafComponent implements OnInit {

  lastId:any;

  departList = <any>[];

  formdata:any;

  constructor(public depService:DepartsService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }


  ngOnInit(): void {

    this.depService.getDepartList().subscribe((data : any) => {
      this.departList = data;
    });

    this.depService.getDepartLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    this.formdata = new FormGroup({
      departId: new FormControl(""),
      departName: new FormControl("")
    })

  }


  addDepart(data:any){
    var departData = {
      depart_id : this.lastId + 1,
      depart_name : data.departName
    };

    if(data.departName != ""){
      this.depService.addDepart(departData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.ngOnInit();
      });
    }
    else{
      this.pushNotification.show("اسم القسم فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }

  deleteDepart(){
    var inputs = document.querySelectorAll('input[name=cb]:checked');

    if(confirm('هل انت متأكد؟')){
      if(inputs.length > 0){
        for(var i = 0; i < inputs.length; i++){
          var departidvalue = inputs[i].getAttribute("value");
          this.depService.deleteDepart(departidvalue).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
            this.ngOnInit();
          });
        }
        
      }
      else{
        this.pushNotification.show("اختر القسم التى تريده", {}, 6000, );
        this.router.navigated = false;
      }
    }
    
  }



}
