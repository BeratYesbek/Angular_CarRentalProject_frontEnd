import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/Car';
import { CarDetailModel } from 'src/app/models/carDetailModel';
import { ListResponseModel } from 'src/app/responseModels/ListResponseModule';
import { ResponseModel } from 'src/app/responseModels/responseModel';
import { SingleResponseModel } from 'src/app/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = "https://localhost:44348/api/cars";

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<ListResponseModel<Car>> {

    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + "/getall");
  }

  getByBrand(brandId: number): Observable<ListResponseModel<CarDetailModel>> {
    return this.httpClient.get<ListResponseModel<CarDetailModel>>(this.apiUrl + "/getbybrandid?brandId=" + brandId);
  }

  getById(carId: number): Observable<ListResponseModel<CarDetailModel>> {
    return this.httpClient.get<ListResponseModel<CarDetailModel>>(this.apiUrl + "/getbyid?carId=" + carId);
  }

  getByCategory(categoryId: number): Observable<ListResponseModel<CarDetailModel>> {
    let newPath = this.apiUrl + "/getbycategoryid?categoryId=" + categoryId;
    return this.httpClient.get<ListResponseModel<CarDetailModel>>(newPath);
  }

  getByColor(colorId: number): Observable<ListResponseModel<CarDetailModel>> {
    let newPath = this.apiUrl + "/getbycolorid?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailModel>>(newPath);
  }

  getCarDetail(): Observable<ListResponseModel<CarDetailModel>> {
    let newPath = this.apiUrl + "/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetailModel>>(newPath);
  }

  getCarDetailByCarId(cardId: number): Observable<SingleResponseModel<CarDetailModel>> {
    let newPath = this.apiUrl + "/getcarsdetailbyid?carId=" + cardId;
    return this.httpClient.get<SingleResponseModel<CarDetailModel>>(newPath);
  }


  add(car: Car): Observable<ResponseModel> {

    return this.httpClient.post<ResponseModel>("https://localhost:44348/api/cars/add", car);
  }

  update(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", car);
  }

  delete(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/delete", car);
  }

}
