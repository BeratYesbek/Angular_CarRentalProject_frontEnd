"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var admin_dashboard_component_1 = require("./components/admin-dashboard/admin-dashboard.component");
var brand_color_manager_component_1 = require("./components/brand-color-manager/brand-color-manager.component");
var car_add_component_1 = require("./components/car-add/car-add.component");
var car_edit_component_1 = require("./components/car-edit/car-edit.component");
var car_list_operation_component_1 = require("./components/car-list-operation/car-list-operation.component");
var car_component_1 = require("./components/car/car.component");
var category_manage_component_1 = require("./components/category-manage/category-manage.component");
var home_component_1 = require("./components/home/home.component");
var payment_component_1 = require("./components/payment/payment.component");
var user_customer_manager_component_1 = require("./components/user-customer-manager/user-customer-manager.component");
var login_guard_1 = require("./guards/login.guard");
var admin_guard_1 = require("./guards/admin.guard");
var settings_component_1 = require("./components/settings/settings.component");
var rental_component_1 = require("./components/rental/rental.component");
var payment_rental_list_operation_component_1 = require("./components/payment-rental-list-operation/payment-rental-list-operation.component");
var my_credit_card_component_1 = require("./components/my-credit-card/my-credit-card.component");
var car_details_component_1 = require("./components/car-details/car-details.component");
var routes = [
    { path: "", component: home_component_1.HomeComponent },
    { path: "settings", component: settings_component_1.SettingsComponent, canActivate: [login_guard_1.LoginGuard] },
    { path: "cars", component: car_component_1.CarComponent },
    { path: "payment", component: payment_component_1.PaymentComponent, canActivate: [login_guard_1.LoginGuard] },
    { path: "rental", component: rental_component_1.RentalComponent, canActivate: [login_guard_1.LoginGuard] },
    { path: "my-credit-card", component: my_credit_card_component_1.MyCreditCardComponent, canActivate: [login_guard_1.LoginGuard] },
    { path: "cars/category/:categoryId", component: car_component_1.CarComponent },
    { path: "cars/color/:colorId", component: car_component_1.CarComponent },
    { path: "cars/car-details/:carId", component: car_details_component_1.CarDetailsComponent },
    { path: "admin-dashboard/edit/:carId", component: car_edit_component_1.CarEditComponent, canActivate: [login_guard_1.LoginGuard, admin_guard_1.AdminGuard] },
    { path: "admin-dashboard", component: admin_dashboard_component_1.AdminDashboardComponent, canActivate: [login_guard_1.LoginGuard, admin_guard_1.AdminGuard] },
    { path: "admin-dashboard/category-manager", component: category_manage_component_1.CategoryManageComponent, canActivate: [login_guard_1.LoginGuard, admin_guard_1.AdminGuard] },
    { path: "admin-dashboard/brand-color-manager", component: brand_color_manager_component_1.BrandColorManagerComponent, canActivate: [login_guard_1.LoginGuard, admin_guard_1.AdminGuard] },
    { path: "admin-dashboard/car-list-operation", component: car_list_operation_component_1.CarListOperationComponent, canActivate: [login_guard_1.LoginGuard, admin_guard_1.AdminGuard] },
    { path: "admin-dashboard/carAdd", component: car_add_component_1.CarAddComponent, canActivate: [login_guard_1.LoginGuard, admin_guard_1.AdminGuard] },
    { path: "admin-dashboard/payments-rentals-operation", component: payment_rental_list_operation_component_1.PaymentRentalListOperationComponent, canActivate: [login_guard_1.LoginGuard, admin_guard_1.AdminGuard] },
    { path: "admin-dashboard/user-customer-manager", component: user_customer_manager_component_1.UserCustomerManagerComponent, canActivate: [login_guard_1.LoginGuard, admin_guard_1.AdminGuard] },
    { path: "cars/add", component: car_add_component_1.CarAddComponent, canActivate: [login_guard_1.LoginGuard, admin_guard_1.AdminGuard] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
