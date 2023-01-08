import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { DashboardComponent } from './dashboard.component';
import { ProductComponent } from './product/product.component';
import { ReportComponent } from './report/report.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ChargesComponent } from './charges/charges.component';
import { UserComponent } from './user/user.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { BoardComponent } from './board/board.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductComponent,
    ReportComponent,
    NavBarComponent,
    ChargesComponent,
    UserComponent,
    ProfileInfoComponent,
    BoardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedComponentsModule,
  ]
})
export class DashboardModule { }
