import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemAdminComponent } from './system-admin.component';
import { FaqAdminComponent } from './faq/faq-admin/faq-admin.component';
import { AddFaqCategoryComponent } from './faq/add-faq-category/add-faq-category.component';
import { SystemOverviewComponent } from '../visitor/system-overview/system-overview.component';
import { SubscriptionListComponent } from './subscription-admin/subscription-list/subscription-list.component';
import { InquiryListComponent } from './inquiry-admin/inquiry-tabs/inquiry-tabs.component';
import { RoleDefAdminComponent } from './role-def-admin/role-def-admin.component';
import { SystemOverviewAdminComponent } from './system-overview-admin/system-overview-admin.component';
import { RouteAccessService } from '../services/visitor-services/route-access.service';
import { WasteDefComponent } from './waste-def/waste-def.component';
import { WasteRequestTabsComponent } from './waste-request/waste-request-tabs/waste-request-tabs.component';
import { VehicleSetupMenuComponent } from './vehicle-setup-menu/vehicle-setup-menu.component';
import { AppConstant } from '../config/app-constant';
const routes: Routes = [

    {
        path: '',
        // canActivate: [RouteAccessService],
        component: SystemAdminComponent,
        children: [
            {
                path: 'faq-admin',
                component: FaqAdminComponent,
                outlet: 'dxrSysAdminOutlet'
            },
            {
                path: 'subscription-admin',
                component: SubscriptionListComponent,
                outlet: 'dxrSysAdminOutlet'
            },
            {
                path: 'system-overview-admin',
                component: SystemOverviewAdminComponent,
                outlet: 'dxrSysAdminOutlet'
            },
            {
                path: 'inquiry-admin',
                component: InquiryListComponent,
                outlet: 'dxrSysAdminOutlet'
            },
            {
                path: 'role-def-admin',
                component: RoleDefAdminComponent,
                outlet: 'dxrSysAdminOutlet'
            },
            {
                path: 'vehicle-setup',
                component: VehicleSetupMenuComponent,
                outlet: 'dxrSysAdminOutlet'

            },
            {
                path: 'waste-def-admin',
                component: WasteDefComponent,
                outlet: 'dxrSysAdminOutlet'
            },
            {
                path: 'waste-request-admin',
                component: WasteRequestTabsComponent,
                outlet: 'dxrSysAdminOutlet'
            },
            {
                path: 'vehicle-setup',
                component: VehicleSetupMenuComponent,
                outlet: 'dxrSysAdminOutlet'
            }

        ]
    },



];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemAdminRoutingModule { }
