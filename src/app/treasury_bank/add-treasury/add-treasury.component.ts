import { Component, OnInit } from '@angular/core';
import { TreasurybankService } from '../../services/treasurybank.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-treasury',
  templateUrl: './add-treasury.component.html',
  styleUrls: ['./add-treasury.component.css']
})
export class AddTreasuryComponent implements OnInit {

  lastId:any;

  treasuryList = <any>[];

  formdata:any;

  constructor(public treaService:TreasurybankService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
   }

  ngOnInit(): void {
    this.treaService.getTreasuryList().subscribe((data : any) => {
      this.treasuryList = data;
    });

    this.treaService.getTreasuryLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    this.formdata = new FormGroup({
      treasuryId: new FormControl(""),
      treasuryName: new FormControl("")
    })
  }

  addTreasury(data:any){
    var trData = {treasury_id : this.lastId + 1,
                  treasury_name : data.treasuryName};

    if(data.treasuryName != ""){
      this.treaService.addTreasury(trData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.ngOnInit();
      });
    }
    else{
      this.pushNotification.show("اسم البنك فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }


  deleteTreasury(){
    var inputs = document.querySelectorAll('input[name=cb]:checked');

    if(confirm('هل انت متأكد؟')){
      if(inputs.length > 0){
        for(var i = 0; i < inputs.length; i++){
          var treasuryidvalue = inputs[i].getAttribute("value");
          this.treaService.deleteTreasury(treasuryidvalue).subscribe((res:any)=>{
            this.pushNotification.show(res.toString(), {}, 6000, );
            this.ngOnInit();
          });
        }
        
      }
      else{
        this.pushNotification.show("اختر البنك الذى تريده", {}, 6000, );
        this.router.navigated = false;
      }
    }
    
    //console.log(inputs[0].getAttribute("value"));
  }

}
