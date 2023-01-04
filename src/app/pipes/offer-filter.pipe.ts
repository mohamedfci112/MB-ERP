import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'offerFilter'
  })

  export class OfferFilterPipe implements PipeTransform {

    transform(list: any, value: string) {
  
        return value ? list.filter((item:any) => item.offer_no.includes(value)) : list;
      }
  
  }