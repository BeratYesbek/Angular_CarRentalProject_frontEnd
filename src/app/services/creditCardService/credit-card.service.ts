import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/responseModels/ListResponseModule';
import { CreditCard } from 'src/app/models/creditCard';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/responseModels/responseModel';
@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private apiUrl = "https://localhost:44348/api/creditcards";
  constructor(private httpClient: HttpClient) { }

  getCardByUserId(userId: number): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl + "/getcardbyuserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  delete(creditCard: CreditCard): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/delete"
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }

  add(creditCard: CreditCard): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/add";
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }
  update(creditCard: CreditCard): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/update";
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }
}

