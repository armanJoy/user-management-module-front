import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DumperAccountComponent } from './dumper-account.component';

const routes: Routes = [{ path: '', component: DumperAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DumperAccountRoutingModule { }
