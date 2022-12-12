import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DumperAdminComponent } from './dumper-admin.component';


const routes: Routes = [


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DumperAdminRoutingModule { }
