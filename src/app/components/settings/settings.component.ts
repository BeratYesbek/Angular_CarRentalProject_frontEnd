import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserDetailsModel } from 'src/app/models/userDetailsModel';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';
import { UserImage } from 'src/app/models/userImage';
import { UserImageService } from 'src/app/services/userImageService/user-image.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerApplicantService } from 'src/app/services/customerApplicantService/customer-applicant.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  closeResult = '';

  updateForm: FormGroup;
  applicantForm: FormGroup;
  userDetail: UserDetailsModel;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userImageService: UserImageService,
    private modalService: NgbModal,
    private customerApplicantService: CustomerApplicantService
  ) { }

  ngOnInit(): void {
    this.getUserDetail();
    this.createUpdateForm();
    this.createApplicantForm();
  }

  createApplicantForm() {
    this.applicantForm = this.formBuilder.group({
      companyName: ["", Validators.required]
    });
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
    });
  }

  updateProfile() {

    let userModel = Object.assign({}, this.updateForm.value);

    userModel.id = this.localStorageService.getUserIdItem();
    userModel.passwordHash = this.userDetail[0].passwordHash;
    userModel.passwordSalt = this.userDetail[0].passwordSalt;
    userModel.status = true;

    if (this.updateForm.valid) {
      this.userService.update(userModel).subscribe(response => {
        if (response.success) {
          this.toastrService.success('User was updated successfully', 'Success');
        } else {
          this.toastrService.error('User was not updated', 'Error');
        }
      });
    }

  }

  customerApplication() {
    let customerApplicantModule = Object.assign({}, this.applicantForm.value);
    customerApplicantModule.userId = this.localStorageService.getUserIdItem();
    customerApplicantModule.status = false;
    console.log(customerApplicantModule)
    if (this.applicantForm.valid) {
      this.customerApplicantService.add(customerApplicantModule).subscribe(response => {
        if (response.success) {
          this.toastrService.success('Customer Applicant sended successfully ')
        }
      });
    }
  }
  checkImage(val: any) {

    const formData = new FormData();
    formData.append('file', <File>val.target.files[0]);
    formData.append('userId', this.localStorageService.getUserIdItem().toString());

    if (this.userDetail[0].images.length > 0) {
      formData.append('userImageId', this.userDetail[0].images[0].userImageId);
      formData.append('imagePath', this.userDetail[0].images[0].imagePath);
      formData.append('userId', this.userDetail[0].id);
      this.updateImage(formData);
    } else {
      this.addImage(formData);
    }

  }

  updateImage(formData: FormData) {
    this.userImageService.update(formData).subscribe(response => {
      if (response.success) {
        this.toastrService.success('Picture was added successfully', 'Success');
      }
    });

  }
  addImage(formData: FormData) {
    this.userImageService.add(formData).subscribe(response => {
      if (response.success) {
        this.toastrService.success('Picture was added successfully', 'Success');
      }
    });

  }


  getUserDetail() {
    const userId = this.localStorageService.getUserIdItem();
    this.userService.getById(userId).subscribe(response => {
      this.userDetail = response.data;
      console.log(this.userDetail);
    });
  }

  open(content) {
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
