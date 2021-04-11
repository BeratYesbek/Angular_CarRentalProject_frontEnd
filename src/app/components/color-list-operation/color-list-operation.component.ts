import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color-list-operation',
  templateUrl: './color-list-operation.component.html',
  styleUrls: ['./color-list-operation.component.css']
})
export class ColorListOperationComponent implements OnInit {

  colorUpdateForm: FormGroup;

  colors: Color[] = [];
  closeResult = '';
  selectedIndex: number;
  selectedBrand = '';

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getColor();
    this.createBrandForm();

  }
  createBrandForm() {

    this.colorUpdateForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    });
  }
  getColor() {
    this.colorService.getColor().subscribe(response => {
      this.colors = response.data;
    });
  }

  deleteColor(index: number) {
    this.colorService.delete(this.colors[index]).subscribe(response => {
      if (response.success) {
        this.toastrService.success('Color was deleted successfully', 'Success');
        this.getColor();
      } else {
        this.toastrService.error('Color was not deleted', 'Error');

      }
    });
  }
  updateColor() {
    let colorModel = Object.assign({}, this.colorUpdateForm.value);
    colorModel.colorId = this.colors[this.selectedIndex].colorId;
    console.log(colorModel);
    if (this.colorUpdateForm.valid) {
      this.colorService.update(colorModel).subscribe(response => {
        if (response.success) {
          this.toastrService.success('Color was updated successfully', 'Success');
          this.getColor();
        } else {
          this.toastrService.error('Color was not updated', 'Error');

        }
      });
    }
  }





  open(content, index: number) {
    this.selectedIndex = index;
    this.selectedBrand = this.colors[index].colorName;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
