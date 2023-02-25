import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SalariesService {

  readonly APIUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  //add advance
  addSalary(val: any){
    return this.http.post(this.APIUrl+'/Salary',val);
  }

  //get last id
  getLastId(){
    return this.http.get(this.APIUrl+'/Salary/GetLastID');
  }

  //GetEmpAdvances
  GetEmpAdvances(val:any){
    return this.http.post(this.APIUrl+'/Salary/GetEmpAdvances', val);
  }

  //GetEmpPenalties
  GetEmpPenalties(val:any){
    return this.http.post(this.APIUrl+'/Salary/GetEmpPenalties', val);
  }

  //GetEmpPenalties
  GetEmpSalary(val:any){
    return this.http.post(this.APIUrl+'/Salary/GetEmpSalary', val);
  }

  //GetTotalEmpPenalties
  GetTotalEmpPenalties(val:any){
    return this.http.post(this.APIUrl+'/Salary/GetTotalEmpPenalties', val);
  }

  //GetTotalEmpPenalties
  GetTotalEmpAdvances(val:any){
    return this.http.post(this.APIUrl+'/Salary/GetTotalEmpAdvances', val);
  }

  //GetSalariesReport
  GetSalariesReport(val:any){
    return this.http.post(this.APIUrl+'/Salary/GetSalariesReport', val);
  }

}
