import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarImageModel } from 'src/app/models/carImageModel';

import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CategoryService } from 'src/app/services/categoryService/category.service';

import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';
import { Category } from 'src/app/models/category';
import { ActivatedRoute } from '@angular/router';
import { CarDetailModel } from 'src/app/models/carDetailModel';
import { CarImageService } from 'src/app/services/carImageService/car-image.service';




@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  carEditForm: FormGroup;
  carImageForm: FormGroup;

  brands: Brand[] = [];
  colors: Color[] = [];
  categories: Category[] = [];
  carDetailModel: CarDetailModel;


  defaultImage = "assets/img/defaultPicture.jpg";


  selectedFile: File = null;
  selectedBrand: number;
  selectedColor: number;
  selectedCategory: number;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService

  ) { }

  ngOnInit(): void {
    this.getBrand();
    this.getColor();
    this.getCategory();
    this.createCarUpdateForm();
    this.createImageForm();

    this.activatedRoute.params.subscribe(params => {

      if (params["carId"]) {
        this.getCarDetail(params["carId"]);
      }

    });
  }

  onSelectedCategory(val: any) {
    this.selectedCategory = val;
  }
  onFileSelected(fileIput: any) {
    this.selectedFile = <File>fileIput.target.files[0];

  }
  onSelected(val: any) {
    this.selectedBrand = val;
  }
  onSelectedColor(val: any) {
    this.selectedColor = val;
  }
  createCarUpdateForm() {

    this.carEditForm = this.formBuilder.group({
      categoryId: ["", Validators.required],
      modelYear: ["", Validators.required],
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      findeksScore: ["", Validators.required],
      modelName: ["", Validators.required],
      description: ["", Validators.required],
      dailyPrice: ["", Validators.required],
    });

  }
  getCarDetail(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe(response => {
      this.carDetailModel = response.data[0];
      console.log(this.carDetailModel);
    });
  }
  createImageForm() {
    this.carImageForm = this.formBuilder.group({
      file: ["", Validators.required],

    });
  }

  getCategory() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

  getBrand() {
    this.brandService.getBrand().subscribe(response => {
      this.brands = response.data;

    });
  }
  getColor() {
    this.colorService.getColor().subscribe(response => {
      this.colors = response.data;
    });
  }

  update() {
    let carModel = Object.assign({}, this.carEditForm.value);

    var brandId: number = +this.selectedBrand;
    var colorId: number = +this.selectedColor;
    var categoryId: number = +this.selectedCategory;

    carModel.brandId = brandId;
    carModel.colorId = colorId;
    carModel.categoryId = categoryId;
    carModel.carId = this.carDetailModel.carId;

    if (this.carEditForm.valid) {
      if (this.carImageForm.valid) {
        this.carService.update(carModel).subscribe(response => {

        }, responseError => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage
                , "Validation Error")
            }
          }
        });
      } else {
        this.toastrService.error("Error", "You can't pass picture")
      }
    } else {
      this.toastrService.error("Error", "You can't pass empty")
    }
  }


  checkImage(val: any) {

    const formData = new FormData();
    formData.append('file', <File>val.target.files[0]);
    formData.append('carId', this.carDetailModel.carId.toString());

    if (this.carDetailModel.carImages.length > 0) {
      formData.append('carImageId', this.carDetailModel.carImages[0].carImageId.toString());
      formData.append('imagePath', this.carDetailModel.carImages[0].imagePath);
      formData.append('carId', this.carDetailModel.carId.toString());
      this.updateImage(formData);
    } else {
      this.addImage(formData);
    }

  }

  updateImage(formData: FormData) {
    this.carImageService.update(formData).subscribe(response => {
      if (response.success) {
        this.toastrService.success('Picture was added successfully', 'Success');
      }
    });

  }
  addImage(formData: FormData) {
    this.carImageService.add(formData).subscribe(response => {
      if (response.success) {
        this.toastrService.success('Picture was added successfully', 'Success');
      }
    });
  }
}
