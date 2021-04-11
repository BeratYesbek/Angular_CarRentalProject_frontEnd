import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../responseModels/ListResponseModule';
import { Rental } from 'src/app/models/rental';
import { RentalModel } from 'src/app/models/rentalModel';

import { Observable } from 'rxjs';
import { ResponseModel } from '../responseModels/responseModel';
@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private apiUrl = "https://localhost:44348/api/rentals";
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl + "/getall");
  }

  delete(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/delete"
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  add(rental: Rental): Observable<ResponseModel> {

    let newPath = this.apiUrl + "/add";
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  update(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/update";
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  getAllDetails() {
    return this.httpClient.get<ListResponseModel<RentalModel>>(this.apiUrl + "/getrentaldetails");

  }
}
