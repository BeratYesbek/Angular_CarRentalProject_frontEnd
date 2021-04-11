import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from 'src/app/responseModels/singleResponseModel';
import { AdminModel } from 'src/app/models/adminModel';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../localStorageService/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = "https://localhost:44348/api/admins";

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getAdminByUserId(userId: number): Observable<SingleResponseModel<AdminModel>> {

    let newPath = this.apiUrl + "/getadminbyuserid?userId=" + userId;

    return this.httpClient.get<SingleResponseModel<AdminModel>>(newPath);

  }

  isAdmin(): boolean {
    const item = this.localStorageService.getGroupItem();
    if (item === 'admin') {
      return true;
    }
    return false;
  }
}
