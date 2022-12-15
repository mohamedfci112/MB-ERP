import { Component, OnInit } from '@angular/core';
import { TreasurybankService } from '../../services/treasurybank.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-treasury-bank-credit',
  templateUrl: './treasury-bank-credit.component.html',
  styleUrls: ['./treasury-bank-credit.component.css']
})
export class TreasuryBankCreditComponent implements OnInit {

  totalTreasury:any;

  totalBank:any;

  treasuryList = <any>[];

  bankList = <any>[];

  formdata:any;
  constructor(public treasuryService:TreasurybankService) {
  }

  ngOnInit(): void {
    this.totalTreasury = "";
    this.totalBank = "";

    this.treasuryService.getTreasuryList().subscribe((data : any) => {
      this.treasuryList = data;
    });

    this.treasuryService.getBankList().subscribe((data : any) => {
      this.bankList = data;
    });

    this.formdata = new FormGroup({
      treasury_id: new FormControl(""),
      bank_id: new FormControl("")
    });
  }

  myTreasury(lang:any) {
    var val = {treasury_id : lang.target.value};
    this.treasuryService.getTotalBalanceTreasury(val).subscribe((data : any) => {
      this.totalTreasury = data[0].total;
    });
  }

  myBank(lang:any) {
    var val = {bank_id : lang.target.value};
    this.treasuryService.getTotalBalanceBank(val).subscribe((data : any) => {
      this.totalBank = data[0].total;
    });
  }

}
