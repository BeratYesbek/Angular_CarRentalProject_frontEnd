import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ListResponseModel } from 'src/app/responseModels/ListResponseModule';
import { ResponseModel } from 'src/app/responseModels/responseModel';
import { SingleResponseModel } from 'src/app/responseModels/singleResponseModel';
import { UserDetailsModel } from 'src/app/models/userDetailsModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://localhost:44348/api/users";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<User>> {
    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl + "/getall");
  }
  getById(userId: number): Observable<SingleResponseModel<UserDetailsModel>> {
    let newPath = this.apiUrl + "/getuserbyid?userId=" + userId;

    return this.httpClient.get<SingleResponseModel<UserDetailsModel>>(newPath);
  }


  delete(user: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/delete"
    return this.httpClient.post<ResponseModel>(newPath, user);
  }

  add(user: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/add";
    return this.httpClient.post<ResponseModel>(newPath, user);
  }
  update(user: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/update";
    return this.httpClient.post<ResponseModel>(newPath, user);
  }
}
