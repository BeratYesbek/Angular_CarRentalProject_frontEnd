import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/responseModels/ListResponseModule';
import { ResponseModel } from 'src/app/responseModels/responseModel';
import {UserImage} from 'src/app/models/userImage';
@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  private apiUrl = "https://localhost:44348/api/userImages";
  constructor(private httpClient: HttpClient) { }

  add(formData: FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", formData);
  }

  update(formData: FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", formData);
  }


  delete(userImage: UserImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/delete", userImage);
  }
}
