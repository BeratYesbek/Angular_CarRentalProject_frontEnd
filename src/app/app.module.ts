import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { CategoryComponent } from './components/category/category.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { from } from 'rxjs';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './components/payment/payment.component';
import { HomeComponent } from './components/home/home.component';
import {AuthInterceptor} from 'src/app/interceptors/auth.interceptor';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { BrandColorManagerComponent } from './components/brand-color-manager/brand-color-manager.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CategoryManageComponent } from './components/category-manage/category-manage.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { BrandListOperationComponent } from './components/brand-list-operation/brand-list-operation.component';
import { ColorListOperationComponent } from './components/color-list-operation/color-list-operation.component';
import { UserCustomerManagerComponent } from './components/user-customer-manager/user-customer-manager.component';
import { UserComponent } from './components/user/user.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarListOperationComponent } from './components/car-list-operation/car-list-operation.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavProfileComponent } from './components/nav-profile/nav-profile.component';
import { CustomerDemandComponent } from './components/customer-demand/customer-demand.component';
import { PaymentRentalListOperationComponent } from './components/payment-rental-list-operation/payment-rental-list-operation.component';
import { MyCreditCardComponent } from './components/my-credit-card/my-credit-card.component';
import { EmailDirective } from './directives/email.directive';
import { CarDetailsComponent } from './components/car-details/car-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    CategoryComponent,
    NavbarComponent,
    FooterComponent,
    FilterPipePipe,
    CartSummaryComponent,
    CarAddComponent,
    BrandComponent,
    ColorComponent,
    PaymentComponent,
    HomeComponent,
    AdminDashboardComponent,
    CarEditComponent,
    BrandColorManagerComponent,
    BrandAddComponent,
    ColorAddComponent,
    CategoryManageComponent,
    CategoryAddComponent,
    BrandEditComponent,
    BrandListOperationComponent,
    ColorListOperationComponent,
    UserCustomerManagerComponent,
    UserComponent,
    CustomerComponent,
    CarListOperationComponent,
    SettingsComponent,
    RentalComponent,
    LoginComponent,
    RegisterComponent,
    NavProfileComponent,
    CustomerDemandComponent,
    PaymentRentalListOperationComponent,
    MyCreditCardComponent,
    EmailDirective,
    CarDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
