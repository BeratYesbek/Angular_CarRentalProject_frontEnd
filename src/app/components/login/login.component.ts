import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AdminService } from 'src/app/services/adminService/admin.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  closeResult = '';
  loginFormGroup: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    private router: Router,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.getLoginForm();
  }
  getLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  authLogin() {

    let loginModel = Object.assign({}, this.loginFormGroup.value);

    if (this.loginFormGroup.valid) {
      this.authService.login(loginModel).subscribe(response => {
        if (response.token !== null || response.userId !== null) {
          this.localStorageService.setItem(response.token, response.userId);
          this.adminCheck(response.userId);
          setTimeout(() => {
            window.location.reload();
          }, 100);
        } else {
          this.toastrService.error("Login Error password or email wrong", 'Error');
        }
      }, responseError => {
        this.toastrService.error(responseError, 'Error');
      });
    }
  }

  adminCheck(userId) {
    this.adminService.getAdminByUserId(userId).subscribe(response => {
      if (response.success) {
        this.localStorageService.setGroupItem('admin');
        this.router.navigate(['admin-dashboard']);
      } else {
        this.customerCheck(userId);

      }
    }, responseError => {
      this.customerCheck(userId);

    });
  }
  customerCheck(userId: number) {
    this.customerService.getById(userId).subscribe(response => {
      if (response.success) {
        this.localStorageService.setGroupItem('customer');
        this.localStorageService.setCustomerId(response.data.customerId);
        this.router.navigate(['cars']);
      } else {
        this.localStorageService.setGroupItem('user');
        this.router.navigate(['cars']);
      }
    }, responseError => {
      this.localStorageService.setGroupItem('user');
      this.router.navigate(['cars']);

    });
  }




  openLogin(content) {
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
