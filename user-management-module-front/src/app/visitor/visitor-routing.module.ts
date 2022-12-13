import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FirstTimeLoginComponent } from './first-time-login/first-time-login.component';
import { ReloadPageComponent } from './reload-page/reload-page.component';

const routes: Routes = [
    {
        path: 'first-login/:userId',
        // canActivate: [false],
        component: FirstTimeLoginComponent,
    },
    {
        path: 'login',
        // canActivate: [false],
        component: UserLoginComponent,
    },
    {
        path: 'change-pass',
        component: ChangePasswordComponent,
    },
    {
        path: 'reloadPage',
        component: ReloadPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [

    ]
})
export class VisitorRoutingModule { }
