import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BrandColorManagerComponent } from './components/brand-color-manager/brand-color-manager.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarListOperationComponent } from './components/car-list-operation/car-list-operation.component';
import { CarComponent } from './components/car/car.component';
import { CategoryManageComponent } from './components/category-manage/category-manage.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentComponent } from './components/payment/payment.component';
import { UserCustomerManagerComponent } from './components/user-customer-manager/user-customer-manager.component';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { SettingsComponent } from './components/settings/settings.component';
import { RentalComponent } from './components/rental/rental.component';
import { PaymentRentalListOperationComponent } from './components/payment-rental-list-operation/payment-rental-list-operation.component';
import { MyCreditCardComponent } from './components/my-credit-card/my-credit-card.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "settings", component: SettingsComponent, canActivate: [LoginGuard] },
  { path: "cars", component: CarComponent },
  { path: "payment", component: PaymentComponent, canActivate: [LoginGuard] },
  { path: "rental", component: RentalComponent, canActivate: [LoginGuard] },
  { path: "my-credit-card", component: MyCreditCardComponent, canActivate: [LoginGuard] },


  { path: "cars/category/:categoryId", component: CarComponent },
  { path: "cars/color/:colorId", component: CarComponent},
  { path: "cars/car-details/:carId", component: CarDetailsComponent},

  { path: "admin-dashboard/edit/:carId", component: CarEditComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: "admin-dashboard", component: AdminDashboardComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: "admin-dashboard/category-manager", component: CategoryManageComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: "admin-dashboard/brand-color-manager", component: BrandColorManagerComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: "admin-dashboard/car-list-operation", component: CarListOperationComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: "admin-dashboard/carAdd", component: CarAddComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: "admin-dashboard/payments-rentals-operation", component: PaymentRentalListOperationComponent, canActivate: [LoginGuard, AdminGuard] },

  { path: "admin-dashboard/user-customer-manager", component: UserCustomerManagerComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: "cars/add", component: CarAddComponent, canActivate: [LoginGuard, AdminGuard] }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
