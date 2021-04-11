"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomerApplicantService = void 0;
var core_1 = require("@angular/core");
var CustomerApplicantService = /** @class */ (function () {
    function CustomerApplicantService(httpClient) {
        this.httpClient = httpClient;
        this.apiUrl = "https://localhost:44348/api/applications";
    }
    CustomerApplicantService.prototype.getAll = function () {
        return this.httpClient.get(this.apiUrl + "/getall");
    };
    CustomerApplicantService.prototype["delete"] = function (applicant) {
        var newPath = this.apiUrl + "/delete";
        return this.httpClient.post(newPath, applicant);
    };
    CustomerApplicantService.prototype.add = function (applicant) {
        console.log(applicant);
        var newPath = this.apiUrl + "/add";
        return this.httpClient.post(newPath, applicant);
    };
    CustomerApplicantService.prototype.update = function (applicant) {
        var newPath = this.apiUrl + "/update";
        return this.httpClient.post(newPath, applicant);
    };
    CustomerApplicantService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CustomerApplicantService);
    return CustomerApplicantService;
}());
exports.CustomerApplicantService = CustomerApplicantService;
