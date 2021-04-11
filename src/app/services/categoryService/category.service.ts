import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { ListResponseModel } from 'src/app/responseModels/ListResponseModule';
import { ResponseModel } from 'src/app/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:44348/api/categories';

  constructor(private httpClient: HttpClient) { }


  getCategories(): Observable<ListResponseModel<Category>> {
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl + "/getall");
  }

  addCategory(category: Category): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/add";
    return this.httpClient.post<ResponseModel>(newPath, category);
  }

  updateCategory(category: Category): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/update";
    return this.httpClient.post<ResponseModel>(newPath, category);
  }

  deleteCategory(category: Category): Observable<ListResponseModel<Category>> {
    let newPath = this.apiUrl + "/delete";
    return this.httpClient.post<ListResponseModel<Category>>(newPath, category);
  }
}
