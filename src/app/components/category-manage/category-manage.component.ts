import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/categoryService/category.service';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.css']
})
export class CategoryManageComponent implements OnInit {


  selectedIndex: number;
  selectedCategory = '';
  closeResult = '';
  categories: Category[];
  categoryUpdateForm: FormGroup;


  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getCategory();
    this.createCategoryForm();
  }
  createCategoryForm() {

    this.categoryUpdateForm = this.formBuilder.group({
      categoryName: ["", Validators.required]
    });
  }

  getCategory() {

    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

  delete(index: number) {
    this.categoryService.deleteCategory(this.categories[index]).subscribe(response => {
      if (response.success) {
        this.toastrService.success("Category was deleted successfully", 'Success');
        this.getCategory();
      } else {
        this.toastrService.success("Category was not  deleted", 'Error');

      }
    });
  }
  updateCategory() {
    let categoryModel = Object.assign({}, this.categoryUpdateForm.value);
    categoryModel.categoryId = this.categories[this.selectedIndex].categoryId;


    if (this.categoryUpdateForm.valid) {
      this.categoryService.updateCategory(categoryModel).subscribe(response => {
        if (response.success) {
          this.toastrService.success('Color was updated successfully', 'Success');
          this.getCategory();
        } else {
          this.toastrService.error('Color was not updated', 'Error');

        }
      });
    }
  }
  open(content, index: number) {
    this.selectedIndex = index;
    this.selectedCategory = this.categories[index].categoryName;
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
