import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand-list-operation',
  templateUrl: './brand-list-operation.component.html',
  styleUrls: ['./brand-list-operation.component.css']
})
export class BrandListOperationComponent implements OnInit {
  closeResult = '';

  brands: Brand[] = [];
  brandUpdateForm: FormGroup;

  selectedIndex: number;
  selectedBrand = '';

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,


  ) { }

  ngOnInit(): void {
    this.getBrand();
    this.createBrandForm();
  }

  createBrandForm() {

    this.brandUpdateForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    });
  }

  getBrand() {
    this.brandService.getBrand().subscribe(response => {
      this.brands = response.data;
    });
  }

  deleteBrand(index: number) {
    console.log(this.brands[index]);
    this.brandService.delete(this.brands[index]).subscribe(response => {
      if (response.success) {
        this.toastrService.success('Brand was deleted successfully', 'Success');
        this.getBrand();
      } else {
        this.toastrService.error('Brand was not deleted', 'Error');
      }
    });
  }

  updateBrand() {
    let brandModel = Object.assign({}, this.brandUpdateForm.value);
    brandModel.brandId = this.brands[this.selectedIndex].brandId;


    if (this.brandUpdateForm.valid) {
      this.brandService.update(brandModel).subscribe(response => {
        if (response.success) {
          this.toastrService.success('Color was updated successfully', 'Success');
          this.getBrand();
        } else {
          this.toastrService.error('Color was not updated', 'Error');

        }
      });
    }
  }




  open(content, index: number) {
    this.selectedIndex = index;
    this.selectedBrand = this.brands[index].brandName;
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
