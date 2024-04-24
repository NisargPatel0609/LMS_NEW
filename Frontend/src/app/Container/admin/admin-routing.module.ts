import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupRequestComponent } from './signup-request/signup-request.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AdminGuard } from '../../Services/Guards/admin-guard.service';
import { LoginGuard } from '../../Services/Guards/login-guard.service';
import { NotFound404Component } from '../../Components/not-found-404/not-found-404.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'signup-request', component: SignupRequestComponent },
      { path: 'manager', component: ManagerListComponent },
      { path: 'driver', component: DriverListComponent },
      { path: 'customer', component: CustomerListComponent },
      { path: '**', component: NotFound404Component },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
