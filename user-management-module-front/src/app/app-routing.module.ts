import { state } from '@angular/animations';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { RouteAccessService } from './services/visitor-services/route-access.service';
import { SystemOverviewComponent } from './visitor/system-overview/system-overview.component';

const routes: Routes = [

    {
        path: 'dumper-admin',
        canActivate: [RouteAccessService],
        loadChildren: () => import('./dumper-admin/dumper-admin.module').then(m => m.DumperAdminModule)
    },
    {
        path: 'transporter-admin',
        canActivate: [RouteAccessService],
        loadChildren: () => import('./transporter-admin/transporter-admin.module').then(m => m.TransporterAdminModule)
    },
    {
        path: 'processor-admin',
        canActivate: [RouteAccessService],
        loadChildren: () => import('./processor-admin/processor-admin.module').then(m => m.ProcessorAdminModule)
    },
    {
        path: 'driver',
        canActivate: [RouteAccessService],
        loadChildren: () => import('./driver/driver.module').then(m => m.DriverModule)
    },
    {
        path: 'processor-account',
        canActivate: [RouteAccessService],
        loadChildren: () => import('./processor-account/processor-account.module').then(m => m.ProcessorAccountModule)
    },
    {
        path: 'transporter-account',
        canActivate: [RouteAccessService],
        loadChildren: () => import('./transporter-account/transporter-account.module').then(m => m.TransporterAccountModule)
    },
    {
        path: 'dumper-account',
        canActivate: [RouteAccessService],
        loadChildren: () => import('./dumper-account/dumper-account.module').then(m => m.DumperAccountModule)
    },
    {
        path: 'visitor',
        loadChildren: () => import('./visitor/visitor.module').then(m => m.VisitorModule)

    },
    {
        path: 'models',
        loadChildren: () => import('./models/models.module').then(m => m.ModelsModule)
    },
    {
        path: 'visitor-service',
        loadChildren: () => import('./services/visitor-services/visitor-services.module').then(m => m.VisitorServicesModule)
    },
    {
        path: 'system-admin',
        canActivate: [RouteAccessService],
        loadChildren: () => import('./system-admin/system-admin.module').then(m => m.SystemAdminModule)
    },
    {
        path: 'common-directives',
        loadChildren: () => import('./common-directives/common-directives.module').then(m => m.CommonDirectivesModule)
    },
    {
        path: 'super-admin',
        canActivate: [RouteAccessService],
        loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule)
    },



    {
        path: 'company-admin',
        canActivate: [RouteAccessService],
        loadChildren: () => import('./company-admin/company-admin.module').then(m => m.CompanyAdminModule)
    },
    {
        path: 'notification',
        component: Notification,

    },
    {
        path: '**',
        redirectTo: '/',
    }



];
const options: ExtraOptions = {
    onSameUrlNavigation: 'reload'
}
@NgModule({
    imports: [RouterModule.forRoot(routes, options)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
