import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {path : '' , redirectTo: 'dashboard', pathMatch: 'full'},
  {path : 'dashboard' , component: DashboardComponent},
  {path: 'product' , component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
