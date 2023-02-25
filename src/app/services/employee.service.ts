import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly APIUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  //getEmployeeList
  getEmployeeList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Employee/getAllEmployees');
  }

  //new addEmployee
  addEmployee(val: any){
    return this.http.post(this.APIUrl+'/Employee',val);
  }

  //deleteEmployee
  deleteEmployee(val: any){
    return this.http.delete(this.APIUrl+'/Employee/'+val);
  }

  //getEmployeeLastId
  getEmployeeLastId(){
    return this.http.get(this.APIUrl+'/Employee/GetEmployeeLastID');
  }


  //
  // insert employees penalties deduction
  addEmployeePenaltiesDeduction(val: any){
    return this.http.post(this.APIUrl+'/Employeepenaltiesdeduction',val);
  }

  //get last employees penalties deduction id
  getEmployeePenaltiesDeductionLastId(){
    return this.http.get(this.APIUrl+'/Employeepenaltiesdeduction/GetLastID');
  }

  
  // insert employees penalties deduction
  GetPenaltiesReport(val: any){
    return this.http.post(this.APIUrl+'/Employeepenaltiesdeduction/GetPenaltiesReport',val);
  }

}
