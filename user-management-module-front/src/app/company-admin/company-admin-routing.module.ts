import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyAdminComponent } from './company-admin.component';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { UserManagementMenuComponent } from './user-management/user-management-menu/user-management-menu.component';
import { CompanySettingsTabsComponent } from './company-settings/company-settings-tabs/company-settings-tabs.component';
import { InitiateProjectComponent } from './initiate-project/initiate-project.component';
import { InitiateProjectMenuComponent } from './initiate-project/initiate-project-menu/initiate-project-menu.component';
import { CreateScheduleMenuComponent } from './create-schedule/create-schedule-menu/create-schedule-menu.component';
import { BusinessPartnerTabsComponent } from './business-agreement/business-partner-tabs/business-partner-tabs.component';
import { DumperMenuComponent } from './dumper-menu/dumper-menu.component';
import { InvoiceMenuComponent } from './invoice-menu/invoice-menu/invoice-menu.component';
import { MenifestoMenuComponent } from './menifesto/menifesto-menu/menifesto-menu.component';
import { ManualmenifestoTabComponent } from './menifesto/manualmenifesto-tab/manualmenifesto-tab.component';
import { MenifestoTabComponent } from './menifesto/menifesto-tab/menifesto-tab.component';
import { LoadOperationComponent } from './load-operation/load-operation.component';
import { UnloadOperationComponent } from './unload-operation/unload-operation.component';
import { ProcessCompletionMenuComponent } from './processCompletion/process-completion-menu/process-completion-menu.component';
import { DataRestoreMenuComponent } from './dataRestore/data-restore-menu/data-restore-menu.component';

const routes: Routes = [
    {
        path: 'project',
        component: DumperMenuComponent,
        children: [
            {
                path: 'business-agreement',
                component: BusinessPartnerTabsComponent,
                outlet: 'dumperAdminOutlet'
            },
            {
                path: 'initiate-project',
                component: InitiateProjectMenuComponent,
                outlet: 'dumperAdminOutlet'
            },
            {
                path: 'create-schedule',
                component: CreateScheduleMenuComponent,
                outlet: 'dumperAdminOutlet'
            },
            {
                path: 'invoice',
                component: InvoiceMenuComponent,
                outlet: 'dumperAdminOutlet'
            },
            {
                path: 'menifesto',
                component: MenifestoTabComponent,
                outlet: 'dumperAdminOutlet'
            },
            {
                path: 'process-completion',
                component: ProcessCompletionMenuComponent,
                outlet: 'dumperAdminOutlet'
            },
            {
                path: 'load-web',
                component: LoadOperationComponent,
                outlet: 'dumperAdminOutlet'
            },
            {
                path: 'unload-web',
                component: UnloadOperationComponent,
                outlet: 'dumperAdminOutlet'
            },
            {
                path: 'data-restore',
                component: DataRestoreMenuComponent,
                outlet: 'dumperAdminOutlet'
            }


        ]
    },
    {
        path: 'settings',
        component: CompanyManagementComponent,
        children: [
            {
                path: 'user-management',
                component: UserManagementMenuComponent,
                outlet: 'companyAdminOutlet'
            },
            {
                path: 'company-settings',
                component: CompanySettingsTabsComponent,
                outlet: 'companyAdminOutlet'
            }

        ]
    },
    {
        path: 'create-schedule',
        component: CreateScheduleMenuComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyAdminRoutingModule { }
