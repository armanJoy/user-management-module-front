import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransporterAccountComponent } from './transporter-account.component';

const routes: Routes = [{ path: '', component: TransporterAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransporterAccountRoutingModule { }
