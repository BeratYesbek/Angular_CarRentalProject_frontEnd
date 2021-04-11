import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetailModel } from 'src/app/models/carDetailModel';
import { CarImageService } from 'src/app/services/carImageService/car-image.service';
import { CarService } from 'src/app/services/carService/car.service';

@Component({
  selector: 'app-car-list-operation',
  templateUrl: './car-list-operation.component.html',
  styleUrls: ['./car-list-operation.component.css']
})
export class CarListOperationComponent implements OnInit {

  carDetails: CarDetailModel[] = [];
  defaultImage = "assets/img/defaultPicture.jpg";
  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private carImageService: CarImageService

  ) { }

  ngOnInit(): void {
    this.getcar();
  }

  getcar() {
    this.carService.getCarDetail().subscribe(response => {
      this.carDetails = response.data;
      console.log(this.carDetails);

    });
  }
  delete(index: number) {

    this.carService.delete(this.carDetails[index]).subscribe(response => {
      if (response.success) {
        this.deleteImage(index);
        this.toastrService.success('Car was deleted', 'Success');
        this.getcar();
      }
    });
  }
  deleteImage(index: number) {
    this.carImageService.delete(this.carDetails[index].carImages[0]).subscribe(response => {

    });
  }

}
