import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/dist/types/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  readonly APIUrl = "http://localhost:1195/api";

  constructor(private http:HttpClient) { }

  //get all expenses
  getExpensesTypesList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Expenses/getAllExpensesTypes');
  }

  // add new expenses
  addExpenseType(val: any){
    return this.http.post(this.APIUrl+'/Expenses',val);
  }

  //delete expenses
  deleteExpenseType(val: any){
    return this.http.delete(this.APIUrl+'/Expenses/'+val);
  }

  //get last expenses id
  getExpenseTypeLastId(){
    return this.http.get(this.APIUrl+'/Expenses/GetExpensesTypesLastID');
  }

  // add new expenses details
  addExpenseDetails(val: any){
    return this.http.post(this.APIUrl+'/Expenses/insertExpensesDetails',val);
  }

  //get last expenses details id
  getExpenseDetailsLastId(){
    return this.http.get(this.APIUrl+'/Expenses/GetExpensesDetailsLastID');
  }

  //get total expenses
  getTotalExpenses(val: any):Observable<any[]>{
    return this.http.post<any>(this.APIUrl+'/Expenses/getTotalExpenses',val);
  }

  //get total amount expenses
  getTotalAmountExpenses(val: any):Observable<any[]>{
    return this.http.post<any>(this.APIUrl+'/Expenses/getTotalAmountExpenses',val);
  }

}
