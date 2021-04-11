"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var car_component_1 = require("./components/car/car.component");
var category_component_1 = require("./components/category/category.component");
var navbar_component_1 = require("./components/navbar/navbar.component");
var footer_component_1 = require("./components/footer/footer.component");
var filter_pipe_pipe_1 = require("./pipes/filter-pipe.pipe");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_toastr_1 = require("ngx-toastr");
var cart_summary_component_1 = require("./components/cart-summary/cart-summary.component");
var car_add_component_1 = require("./components/car-add/car-add.component");
var brand_component_1 = require("./components/brand/brand.component");
var color_component_1 = require("./components/color/color.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var payment_component_1 = require("./components/payment/payment.component");
var home_component_1 = require("./components/home/home.component");
var auth_interceptor_1 = require("src/app/interceptors/auth.interceptor");
var admin_dashboard_component_1 = require("./components/admin-dashboard/admin-dashboard.component");
var car_edit_component_1 = require("./components/car-edit/car-edit.component");
var brand_color_manager_component_1 = require("./components/brand-color-manager/brand-color-manager.component");
var brand_add_component_1 = require("./components/brand-add/brand-add.component");
var color_add_component_1 = require("./components/color-add/color-add.component");
var category_manage_component_1 = require("./components/category-manage/category-manage.component");
var category_add_component_1 = require("./components/category-add/category-add.component");
var brand_edit_component_1 = require("./components/brand-edit/brand-edit.component");
var brand_list_operation_component_1 = require("./components/brand-list-operation/brand-list-operation.component");
var color_list_operation_component_1 = require("./components/color-list-operation/color-list-operation.component");
var user_customer_manager_component_1 = require("./components/user-customer-manager/user-customer-manager.component");
var user_component_1 = require("./components/user/user.component");
var customer_component_1 = require("./components/customer/customer.component");
var car_list_operation_component_1 = require("./components/car-list-operation/car-list-operation.component");
var settings_component_1 = require("./components/settings/settings.component");
var rental_component_1 = require("./components/rental/rental.component");
var login_component_1 = require("./components/login/login.component");
var register_component_1 = require("./components/register/register.component");
var nav_profile_component_1 = require("./components/nav-profile/nav-profile.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                car_component_1.CarComponent,
                category_component_1.CategoryComponent,
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                filter_pipe_pipe_1.FilterPipePipe,
                cart_summary_component_1.CartSummaryComponent,
                car_add_component_1.CarAddComponent,
                brand_component_1.BrandComponent,
                color_component_1.ColorComponent,
                payment_component_1.PaymentComponent,
                home_component_1.HomeComponent,
                admin_dashboard_component_1.AdminDashboardComponent,
                car_edit_component_1.CarEditComponent,
                brand_color_manager_component_1.BrandColorManagerComponent,
                brand_add_component_1.BrandAddComponent,
                color_add_component_1.ColorAddComponent,
                category_manage_component_1.CategoryManageComponent,
                category_add_component_1.CategoryAddComponent,
                brand_edit_component_1.BrandEditComponent,
                brand_list_operation_component_1.BrandListOperationComponent,
                color_list_operation_component_1.ColorListOperationComponent,
                user_customer_manager_component_1.UserCustomerManagerComponent,
                user_component_1.UserComponent,
                customer_component_1.CustomerComponent,
                car_list_operation_component_1.CarListOperationComponent,
                settings_component_1.SettingsComponent,
                rental_component_1.RentalComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                nav_profile_component_1.NavProfileComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                animations_1.BrowserAnimationsModule,
                forms_1.ReactiveFormsModule,
                ng_bootstrap_1.NgbModule,
                ngx_toastr_1.ToastrModule.forRoot({
                    positionClass: "toast-bottom-right"
                })
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: auth_interceptor_1.AuthInterceptor, multi: true }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
