import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { UserRegister } from './user-register/user.register.component';
import { VisitorComponent } from './visitor/visitor.component'
const routes: Routes = [
    {
        path: 'register',
        component: UserRegister,
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
        loadChildren: () => import('./system-admin/system-admin.module').then(m => m.SystemAdminModule)
    },
    {
        path: 'common-directives',
        loadChildren: () => import('./common-directives/common-directives.module').then(m => m.CommonDirectivesModule)
    },
    {
        path: 'company-admin',
        loadChildren: () => import('./company-admin/company-admin.module').then(m => m.CompanyAdminModule)
    },
    {
        path: 'notification',
        component: Notification,

    },
    {
        path: '',
        component: VisitorComponent,
    },
    {
        path: '**',
        component: VisitorComponent,
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
