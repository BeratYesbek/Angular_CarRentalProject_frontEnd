import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailModel } from 'src/app/models/carDetailModel';
import { CarService } from 'src/app/services/carService/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  carDetail: CarDetailModel;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      if (params["carId"]) {
        this.getCarDetail(params["carId"]);
      }

    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe(response => {
      this.carDetail = response.data[0];
      console.log(this.carDetail);
    });
  }

}
