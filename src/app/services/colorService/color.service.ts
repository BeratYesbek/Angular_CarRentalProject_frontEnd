import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color';
import { ListResponseModel } from 'src/app/responseModels/ListResponseModule';
import { ResponseModel } from 'src/app/responseModels/responseModel';
@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = "https://localhost:44348/api/colors";
  constructor(private httpClient: HttpClient) { }

  getColor(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + "/getall");
  }

  delete(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/delete"
    return this.httpClient.post<ResponseModel>(newPath, color);
  }

  add(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/add";
    return this.httpClient.post<ResponseModel>(newPath, color);
  }
  update(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/update";
    return this.httpClient.post<ResponseModel>(newPath, color);
  }
}
