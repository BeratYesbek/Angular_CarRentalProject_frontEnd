"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SettingsComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(userService, localStorageService, formBuilder, toastrService, userImageService, modalService, customerApplicantService) {
        this.userService = userService;
        this.localStorageService = localStorageService;
        this.formBuilder = formBuilder;
        this.toastrService = toastrService;
        this.userImageService = userImageService;
        this.modalService = modalService;
        this.customerApplicantService = customerApplicantService;
        this.closeResult = '';
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.getUserDetail();
        this.createUpdateForm();
        this.createApplicantForm();
    };
    SettingsComponent.prototype.createApplicantForm = function () {
        this.applicantForm = this.formBuilder.group({
            companyName: ["", forms_1.Validators.required]
        });
    };
    SettingsComponent.prototype.createUpdateForm = function () {
        this.updateForm = this.formBuilder.group({
            firstName: ["", forms_1.Validators.required],
            lastName: ["", forms_1.Validators.required],
            email: ["", forms_1.Validators.required]
        });
    };
    SettingsComponent.prototype.updateProfile = function () {
        var _this = this;
        var userModel = Object.assign({}, this.updateForm.value);
        userModel.id = this.localStorageService.getUserIdItem();
        userModel.passwordHash = this.userDetail[0].passwordHash;
        userModel.passwordSalt = this.userDetail[0].passwordSalt;
        userModel.status = true;
        if (this.updateForm.valid) {
            this.userService.update(userModel).subscribe(function (response) {
                if (response.success) {
                    _this.toastrService.success('User was updated successfully', 'Success');
                }
                else {
                    _this.toastrService.error('User was not updated', 'Error');
                }
            });
        }
    };
    SettingsComponent.prototype.customerApplication = function () {
        var _this = this;
        var customerApplicantModule = Object.assign({}, this.applicantForm.value);
        customerApplicantModule.userId = this.localStorageService.getUserIdItem();
        customerApplicantModule.status = false;
        console.log(customerApplicantModule);
        if (this.applicantForm.valid) {
            this.customerApplicantService.add(customerApplicantModule).subscribe(function (response) {
                if (response.success) {
                    _this.toastrService.success('Customer Applicant sended successfully ');
                }
            });
        }
    };
    SettingsComponent.prototype.checkImage = function (val) {
        var formData = new FormData();
        formData.append('file', val.target.files[0]);
        formData.append('userId', this.localStorageService.getUserIdItem().toString());
        if (this.userDetail[0].images.length > 0) {
            formData.append('userImageId', this.userDetail[0].images[0].userImageId);
            formData.append('imagePath', this.userDetail[0].images[0].imagePath);
            formData.append('userId', this.userDetail[0].id);
            this.updateImage(formData);
        }
        else {
            this.addImage(formData);
        }
    };
    SettingsComponent.prototype.updateImage = function (formData) {
        var _this = this;
        this.userImageService.update(formData).subscribe(function (response) {
            if (response.success) {
                _this.toastrService.success('Picture was added successfully', 'Success');
            }
        });
    };
    SettingsComponent.prototype.addImage = function (formData) {
        var _this = this;
        this.userImageService.add(formData).subscribe(function (response) {
            if (response.success) {
                _this.toastrService.success('Picture was added successfully', 'Success');
            }
        });
    };
    SettingsComponent.prototype.getUserDetail = function () {
        var _this = this;
        var userId = this.localStorageService.getUserIdItem();
        this.userService.getById(userId).subscribe(function (response) {
            _this.userDetail = response.data;
            console.log(_this.userDetail);
        });
    };
    SettingsComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    SettingsComponent.prototype.getDismissReason = function (reason) {
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
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'app-settings',
            templateUrl: './settings.component.html',
            styleUrls: ['./settings.component.css']
        })
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
