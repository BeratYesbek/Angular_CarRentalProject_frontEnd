import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {


  colorAddForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    });
  }

  add() {
    let colorModel = Object.assign({}, this.colorAddForm.value);
    this.colorService.add(colorModel).subscribe(response => {

      if (response.success) {
        this.toastrService.success("Color was added successfully", "Success");
      } else {
        this.toastrService.error("Color was not added", "Error")
      }
    }, responseError => {
      for (let i = 0; i < responseError.error.Errors.length; i++) {
        this.toastrService.error(responseError.error.Errors[i].ErrorMessage
          , "Validation Error")
      }
    });
  }

}
