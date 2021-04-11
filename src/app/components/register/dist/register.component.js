"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(modalService, formBuilder, authService, toastrService, localStorageService, adminService, router) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.toastrService = toastrService;
        this.localStorageService = localStorageService;
        this.adminService = adminService;
        this.router = router;
        this.closeResult = '';
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.getRegisterForm();
    };
    RegisterComponent.prototype.getRegisterForm = function () {
        this.registerFormGroup = this.formBuilder.group({
            firstName: ["", forms_1.Validators.required],
            lastName: ["", forms_1.Validators.required],
            email: ["", forms_1.Validators.required],
            password: ["", forms_1.Validators.required],
            passwordAgain: ["", forms_1.Validators.required]
        });
    };
    RegisterComponent.prototype.authRegister = function () {
        var _this = this;
        var registerModel = Object.assign({}, this.registerFormGroup.value);
        if (registerModel.password === registerModel.passwordAgain) {
            if (this.registerFormGroup.valid) {
                this.authService.register(registerModel).subscribe(function (response) {
                    _this.toastrService.success("Registred was completed successfully. please login to the system", "Success");
                }, function (responseError) {
                    if (responseError.error.Errors.length > 0) {
                        for (var i = 0; i < responseError.error.Errors.length; i++) {
                            _this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Error");
                        }
                    }
                });
            }
        }
        else {
            this.toastrService.error("Passwords aren't equals.", "Error");
        }
    };
    RegisterComponent.prototype.openRegister = function (content) {
        var _this = this;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    RegisterComponent.prototype.getDismissReason = function (reason) {
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
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
