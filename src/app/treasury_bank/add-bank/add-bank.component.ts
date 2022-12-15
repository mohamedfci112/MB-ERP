import { Component, OnInit } from '@angular/core';
import { TreasurybankService } from '../../services/treasurybank.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {

  lastId:any;

  bankList = <any>[];

  formdata:any;
  constructor(public bankService:TreasurybankService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {

    this.bankService.getBankList().subscribe((data : any) => {
      this.bankList = data;
    });

    this.bankService.getBankLastId().subscribe((data : any) => {
      this.lastId = data[0].Column1;
    });

    this.formdata = new FormGroup({
      bankId: new FormControl(""),
      bankName: new FormControl("")
    })
  }

  addBank(data:any){
    var bankData = {bank_id : this.lastId + 1,
                    bank_name : data.bankName};

    if(data.bankName != ""){
      this.bankService.addBank(bankData).subscribe((res:any)=>{
        this.pushNotification.show(res.toString(), {}, 6000, );
        this.ngOnInit();
      });
    }
    else{
      this.pushNotification.show("اسم البنك فارغ", {}, 6000, );
      this.router.navigated = false;
    }
    
  }

  deleteBank(){
    var inputs = document.querySelectorAll('input[name=cb]:checked');

    if(confirm('هل انت متأكد؟')){
      if(inputs.length > 0){
        for(var i = 0; i < inputs.length; i++){
          var bankidvalue = inputs[i].getAttribute("value");
          this.bankService.deleteBank(bankidvalue).subscribe((res:any)=>{
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
