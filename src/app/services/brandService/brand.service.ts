import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { ListResponseModel } from 'src/app/responseModels/ListResponseModule';
import { ResponseModel } from 'src/app/responseModels/responseModel';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl = "https://localhost:44348/api/brands";

  constructor(private httpClient: HttpClient) { }

  getBrand(): Observable<ListResponseModel<Brand>> {

    let newPath = this.apiUrl + "/getall";

    return this.httpClient.get<ListResponseModel<Brand>>(newPath);

  }

  add(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/add";
    return this.httpClient.post<ResponseModel>(newPath, brand);

  }

  update(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/update";
    return this.httpClient.post<ResponseModel>(newPath, brand);

  }
  delete(brand: Brand): Observable<ResponseModel> {

    let newPath = this.apiUrl + "/delete"
    return this.httpClient.post<ResponseModel>(newPath, brand);

  }
}
