import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/adminService/admin.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  auth: boolean;
  admin: boolean;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.loginControl();
    this.adminControl();
1  }
  loginControl() {
    this.auth = this.authService.isAuthenticated();
  }
  adminControl() {
    const userId = this.localStorageService.getUserIdItem();
    this.adminService.getAdminByUserId(userId).subscribe(response => {
      if(response.success){
        console.log(response);
        this.admin = true;
      }
    });
  }




}
