"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(modalService, formBuilder, authService, toastrService, localStorageService, adminService, router, customerService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.toastrService = toastrService;
        this.localStorageService = localStorageService;
        this.adminService = adminService;
        this.router = router;
        this.customerService = customerService;
        this.closeResult = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.getLoginForm();
    };
    LoginComponent.prototype.getLoginForm = function () {
        this.loginFormGroup = this.formBuilder.group({
            email: ["", forms_1.Validators.required],
            password: ["", forms_1.Validators.required]
        });
    };
    LoginComponent.prototype.authLogin = function () {
        var _this = this;
        var loginModel = Object.assign({}, this.loginFormGroup.value);
        if (this.loginFormGroup.valid) {
            this.authService.login(loginModel).subscribe(function (response) {
                if (response.token !== null || response.userId !== null) {
                    _this.localStorageService.setItem(response.token, response.userId);
                    _this.adminCheck(response.userId);
                    setTimeout(function () {
                        window.location.reload();
                    }, 100);
                }
                else {
                    _this.toastrService.error("Login Error password or email wrong", 'Error');
                }
            }, function (responseError) {
                _this.toastrService.error(responseError, 'Error');
            });
        }
    };
    LoginComponent.prototype.adminCheck = function (userId) {
        var _this = this;
        this.adminService.getAdminByUserId(userId).subscribe(function (response) {
            if (response.success) {
                _this.localStorageService.setGroupItem('admin');
                _this.router.navigate(['admin-dashboard']);
            }
            else {
                _this.customerCheck(userId);
            }
        }, function (responseError) {
            _this.customerCheck(userId);
        });
    };
    LoginComponent.prototype.customerCheck = function (userId) {
        var _this = this;
        this.customerService.getById(userId).subscribe(function (response) {
            if (response.success) {
                _this.localStorageService.setGroupItem('customer');
                _this.localStorageService.setCustomerId(response.data.customerId);
                _this.router.navigate(['cars']);
            }
            else {
                _this.localStorageService.setGroupItem('user');
                _this.router.navigate(['cars']);
            }
        }, function (responseError) {
            _this.localStorageService.setGroupItem('user');
            _this.router.navigate(['cars']);
        });
    };
    LoginComponent.prototype.openLogin = function (content) {
        var _this = this;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    LoginComponent.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
