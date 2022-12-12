import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessorAdminComponent } from './processor-admin.component';

const routes: Routes = [{ path: '', component: ProcessorAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessorAdminRoutingModule { }
