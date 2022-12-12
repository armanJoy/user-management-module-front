import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDxrAdminComponent } from './create-dxr-admin/create-dxr-admin.component';
import { ComponentListComponent } from './language-setup/component-list/component-list.component';
import { SetAgreementProcessDefComponent } from './set-agreement-process-def/set-agreement-process-def.component';
import { SetCompanyAdminAccessComponent } from './set-company-admin-access/set-company-admin-access.component';
import { SetDxrAdminAccessComponent } from './set-dxr-admin-access/set-dxr-admin-access.component';
import { SetInvoiceProcessDefComponent } from './set-invoice-process-def/set-invoice-process-def.component';
import { SetNotificationProcessDefComponent } from './set-notification-process-def/set-notification-process-def.component';
import { SetProjectProcessDefComponent } from './set-project-process-def/set-project-process-def.component';
import { SetSubscriptonProcessDefComponent } from './set-subscripton-process-def/set-subscripton-process-def.component';
import { SuperAdminComponent } from './super-admin.component';

const routes: Routes = [
    {
        path: '',
        component: SuperAdminComponent,
    },
    {
        path: 'create-dxr-admin',
        component: CreateDxrAdminComponent,
        // outlet: 'superAdminOutlet'
    },
    {
        path: 'set-dxr-admin-access',
        component: SetDxrAdminAccessComponent,
        // outlet: 'dxrSysAdminOutlet'
    },
    {
        path: 'set-company-admin-access',
        component: SetCompanyAdminAccessComponent,
        // outlet: 'dxrSysAdminOutlet'
    },
    {
        path: 'component-list',
        component: ComponentListComponent,
        // outlet: 'dxrSysAdminOutlet'
    },
    {
        path: 'set-agreement-process-def',
        component: SetAgreementProcessDefComponent,
        // outlet: 'dxrSysAdminOutlet'
    },
    {
        path: 'set-project-process-def',
        component: SetProjectProcessDefComponent,
        // outlet: 'dxrSysAdminOutlet'
    },
    {
        path: 'set-invoice-process-def',
        component: SetInvoiceProcessDefComponent,
        // outlet: 'dxrSysAdminOutlet'
    },
    {
        path: 'set-subscription-process-def',
        component: SetSubscriptonProcessDefComponent,
        // outlet: 'dxrSysAdminOutlet'
    },
    {
        path: 'set-notification-process-def',
        component: SetNotificationProcessDefComponent,
        // outlet: 'dxrSysAdminOutlet'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
