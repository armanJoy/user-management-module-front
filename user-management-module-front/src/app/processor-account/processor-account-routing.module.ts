import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessorAccountComponent } from './processor-account.component';

const routes: Routes = [{ path: '', component: ProcessorAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessorAccountRoutingModule { }
