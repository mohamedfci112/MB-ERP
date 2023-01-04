import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'eznFilter'
  })

  export class EznSrfFilterPipe implements PipeTransform {

    transform(list: any, value: string) {
  
        return value ? list.filter((item:any) => item.inv_no.includes(value)) : list;
      }
  
  }