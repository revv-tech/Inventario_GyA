import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductComponent } from './product/product.component';
import { ReportComponent } from './report/report.component';
const routes: Routes = [
  {path : '' , component: DashboardComponent, children: [
    {path: 'product' , component: ProductComponent},
    {path: 'report', component: ReportComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
