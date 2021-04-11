import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { CategoryService } from 'src/app/services/categoryService/category.service';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';
import { Category } from 'src/app/models/category';


@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddFrom: FormGroup;
  carImageForm: FormGroup;

  brands: Brand[] = [];
  colors: Color[] = [];
  categories: Category[] = [];

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
  ) {

  }

  ngOnInit(): void {
    this.getBrand();
    this.getColor();
    this.getCategory();
    this.createCarAddForm();
  }
  onSelectedCategory(val: any) {
    this.selectedCategory = val;
  }

  onSelected(val: any) {
    this.selectedBrand = val;
  }
  onSelectedColor(val: any) {
    this.selectedColor = val;
  }
  createCarAddForm() {

    this.carAddFrom = this.formBuilder.group({
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


  getCategory() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
      console.log(this.categories);
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

  add() {

    let carModel = Object.assign({}, this.carAddFrom.value);

    var brandId: number = +this.selectedBrand;
    var colorId: number = +this.selectedColor;
    var categoryId: number = +this.selectedCategory;

    carModel.brandId = brandId;
    carModel.colorId = colorId;
    carModel.categoryId = categoryId;

    if (this.carAddFrom.valid) {

      this.carService.add(carModel).subscribe(response => {
        if(response.success){
          this.toastrService.success('Car was added','Adding Process is Successful')
        }
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              , "Validation Error")
          }
        }
      });
    } else {
      this.toastrService.error("Error", "You can't pass empty")
    }
  }

}
