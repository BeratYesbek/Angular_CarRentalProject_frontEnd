import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { ListResponseModel } from 'src/app/responseModels/ListResponseModule';
import { SingleResponseModel } from 'src/app/responseModels/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44348/api/auth';
  constructor(private httpClient: HttpClient) { }

  login(loginModel: LoginModel) {
    return this.httpClient.post<TokenModel>(this.apiUrl + "/login", loginModel);
  }

  register(registerModel: RegisterModel): Observable<ListResponseModel<TokenModel>> {
    let newPath = this.apiUrl + "/register";
    return this.httpClient.post<ListResponseModel<TokenModel>>(newPath, registerModel);
  }

  isAuthenticated() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }


}
