import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})

export class BrandEditComponent implements OnInit {

  @Input() brandId: number;

  closeResult = '';
  brandUpdateForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.brandId);

    this.createBrandForm();
  }

  createBrandForm() {

    this.brandUpdateForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    })
  }

}
