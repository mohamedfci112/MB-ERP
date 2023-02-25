import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SnadatService {

  readonly APIUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  //get last id
  getLastAbdId(){
    return this.http.get(this.APIUrl+'/Snadat/getLastAbdId');
  }

  //get last id
  getLastSrfId(){
    return this.http.get(this.APIUrl+'/Snadat/getLastSrfId');
  }

  //insert abd snd check
  insertSndAbdCheck(val:any){
    return this.http.post(this.APIUrl+'/Snadat/insertSndAbdCheck', val);
  }

  //insert abd snd check
  insertSndSrfCheck(val:any){
    return this.http.post(this.APIUrl+'/Snadat/insertSndSrfCheck', val);
  }

}
