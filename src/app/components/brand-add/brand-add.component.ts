import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {


  branAddForm: FormGroup;

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.branAddForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    });
  }

  add() {

    let brandModule = Object.assign({}, this.branAddForm.value);

    this.brandService.add(brandModule).subscribe(respone => {
      if (respone.success) {
        this.toastrService.success("Brand was added successfully", "Success");
      } else {
        this.toastrService.error("Brand was not added", "Error")
      }
    }, responseError => {
      for (let i = 0; i < responseError.error.Errors.length; i++) {
        this.toastrService.error(responseError.error.Errors[i].ErrorMessage
          , "Validation Error")
      }
    });
  }

}
