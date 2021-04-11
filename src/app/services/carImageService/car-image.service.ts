import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from 'src/app/models/CarImage';
import { ResponseModel } from 'src/app/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {


  private apiUrl = "https://localhost:44348/api/carimages";
  constructor(private httpClient: HttpClient) { }

  add(formData: FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", formData);
  }

  update(formData: FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", formData);
  }


  delete(carImage: CarImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/delete", carImage);
  }
}
