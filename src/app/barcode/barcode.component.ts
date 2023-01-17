import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { PushNotificationService } from 'ng-push-notification';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
declare var require: any;
declare var $: any;
var JsBarcode = require('jsbarcode');
import jsPDF from 'jspdf';
import "jspdf-barcode";

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements OnInit {

  productDetailsList = <any>[];

  product_name: any;

  config: any;

  constructor(public prodService:ProductsService, private pushNotification: PushNotificationService,private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.productDetailsList.count
    };
   }

   pageChanged(event:any){
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.prodService.getAllProductsDetails().subscribe((data : any) => {
      this.productDetailsList = data;
    });

    JsBarcode("#barcode", "1");
  }

  printBarcode(data:any)
  {
    JsBarcode("#barcode", data);

    const img = document.querySelector('img#barcode') as HTMLImageElement;

    var doc = new jsPDF("l","mm",[26,55]);
    doc.barcode(data, {
      fontSize: 30,
      textColor: "#000000",
      x: 20,
      y: 15
    });
    
    function back() {
      window.close();
  }

    //doc.addImage(img.src, 'JPEG', 15, 40, 180, 160);
    //doc.autoPrint();
    var printWin = window.open(doc.output('bloburl'), 'PrintWindow', 
    'width=650,height=650,location=no,left=200px');
    
    setTimeout(()=>{
      if(printWin != null)
      {
        printWin.print();
        setTimeout(() => {
          $("*").hover(function(){
            if(printWin != null)
            printWin.window.close();
          });
        }, 50);
        
      }
      
    },50);
    

  }

}
