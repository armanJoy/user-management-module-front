import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransporterAdminComponent } from './transporter-admin.component';

const routes: Routes = [{ path: '', component: TransporterAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransporterAdminRoutingModule { }
