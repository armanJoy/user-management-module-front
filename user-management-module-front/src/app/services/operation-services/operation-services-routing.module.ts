import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationServicesComponent } from './operation-services.component';

const routes: Routes = [{ path: '', component: OperationServicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationServicesRoutingModule { }
