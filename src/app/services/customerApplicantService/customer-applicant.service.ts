import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/responseModels/ListResponseModule';
import { ResponseModel } from 'src/app/responseModels/responseModel';
import {CustomerApplication} from 'src/app/models/customerApplicant';
@Injectable({
  providedIn: 'root'
})
export class CustomerApplicantService {

  private apiUrl = "https://localhost:44348/api/applications";
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<CustomerApplication>> {
    return this.httpClient.get<ListResponseModel<CustomerApplication>>(this.apiUrl + "/getall");
  }

  delete(applicant: CustomerApplication): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/delete"
    return this.httpClient.post<ResponseModel>(newPath, applicant);
  }

  add(applicant: CustomerApplication): Observable<ResponseModel> {
    console.log(applicant);
    let newPath = this.apiUrl + "/add";
    return this.httpClient.post<ResponseModel>(newPath,applicant);
  }

  update(applicant: CustomerApplication): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/update";
    return this.httpClient.post<ResponseModel>(newPath, applicant);
  }
}
