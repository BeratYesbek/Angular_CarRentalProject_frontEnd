import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { ListResponseModel } from 'src/app/responseModels/ListResponseModule';
import { ResponseModel } from 'src/app/responseModels/responseModel';
import { SingleResponseModel } from 'src/app/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = "https://localhost:44348/api/customers";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl + "/getall");
  }

  getById(userId: number): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + "/getbyid?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }

  delete(customer: Customer): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/delete"
    return this.httpClient.post<ResponseModel>(newPath, customer);
  }

  add(customer: Customer): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/add";
    return this.httpClient.post<ResponseModel>(newPath, customer);
  }
  update(customer: Customer): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/update";
    return this.httpClient.post<ResponseModel>(newPath, customer);
  }

}
