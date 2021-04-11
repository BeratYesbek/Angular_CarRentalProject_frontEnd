import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/payment';
import { ListResponseModel } from 'src/app/responseModels/ListResponseModule';
import { ResponseModel } from 'src/app/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = "https://localhost:44348/api/payments/";
  constructor(private httpClient: HttpClient) { }


  payment(payment: Payment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", payment);
  }
  getAll(): Observable<ListResponseModel<Payment>> {
    return this.httpClient.get<ListResponseModel<Payment>>(this.apiUrl + "getall");
  }
}
