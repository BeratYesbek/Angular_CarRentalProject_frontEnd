import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { UserDetailsModel } from 'src/app/models/userDetailsModel';
import { AdminService } from 'src/app/services/adminService/admin.service';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-nav-profile',
  templateUrl: './nav-profile.component.html',
  styleUrls: ['./nav-profile.component.css']
})
export class NavProfileComponent implements OnInit {

  userDetail: UserDetailsModel;
  admin: boolean;
  customer: boolean;
  private updateSubscription: Subscription;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.getUserDetail();
    this.isCustomer();
    this.isAdmin();

  }

  getUserDetail() {
    const userId = this.localStorageService.getUserIdItem();
    this.userService.getById(userId).subscribe(response => {
      this.userDetail = response.data[0];
      console.log(this.userDetail);
    });
  }

  isCustomer() {
    const userId = this.localStorageService.getUserIdItem();
    this.customerService.getById(userId).subscribe(response => {
      if (response.success) {
        this.customer = true;
      }

    });
  }
  isAdmin() {
    const userId = this.localStorageService.getUserIdItem();

    this.adminService.getAdminByUserId(userId).subscribe(adminResponse => {
      if (adminResponse.success) {
        this.admin = true;

      }
    });
  }

  signOut() {
    this.localStorageService.signOut();
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }
}
