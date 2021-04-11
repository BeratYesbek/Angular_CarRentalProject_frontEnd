import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/categoryService/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {


  categoryAddForm: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createCategoryAddForm();
  }

  createCategoryAddForm() {
    this.categoryAddForm = this.formBuilder.group({
      categoryName: ["", Validators.required]
    });
  }
  add() {
    let categoryModel = Object.assign({}, this.categoryAddForm.value);
    this.categoryService.addCategory(categoryModel).subscribe(response => {
      if (response.success) {
        this.toastrService.success('Category was added successfully', 'Success');
      }
      else {
        this.toastrService.error(response.message, 'Error')
      }
    }, responseError => {
      for (let i = 0; i < responseError.error.Errors.length; i++) {
        this.toastrService.error(responseError.error.Errors[i].ErrorMessage
          , "Validation Error")
      }
    });
  }
}
