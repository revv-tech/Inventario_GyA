import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductComponent } from './product/product.component';
import { ReportComponent } from './report/report.component';
import { UserComponent } from './user/user.component';
import { ChargesComponent } from './charges/charges.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { BoardComponent } from './board/board.component';
const routes: Routes = [
  {path : '' , component: DashboardComponent, children: [
    {path: 'product' , component: ProductComponent},
    {path: 'report', component: ReportComponent},
    {path: 'user', component: UserComponent},
    {path: 'charge', component: ChargesComponent},
    {path: 'profile', component: ProfileInfoComponent},
    {path: 'board', component: BoardComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
