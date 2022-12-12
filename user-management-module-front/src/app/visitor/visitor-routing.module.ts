import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { VisitorComponent } from './visitor.component';
import { FaqCategoryComponent } from './faq-category/faq-category.component';
import { FaqQuestionAnswerComponent } from './faq-question-answer/faq-question-answer.component';
import { SystemOverviewComponent } from './system-overview/system-overview.component';
import { InquiryFormComponent } from './inquiry/inquiry-form/inquiry-form.component';
import { SubscriptionFormComponent } from './subscription/subscription-form/subscription-form.component';
import { SubscriptionPopComponent } from './subscription/subscription-pop-up/subscription-popup.component';
import { ValidationSampleComponent } from './validation-sample/validation-sample.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { BenefitComponent } from './system-overview/benefit/benefit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PrivacyPolicyComponent } from './system-overview/privacy-policy/privacy-policy.component';
import { TermsOfUseAdminComponent } from '../system-admin/system-overview-admin/terms-of-use-admin/terms-of-use-admin.component';
import { TermsOfUseComponent } from './system-overview/terms-of-use/terms-of-use.component';
import { FirstTimeLoginComponent } from './first-time-login/first-time-login.component';
import { FaqVisitorComponent } from './faq-visitor/faq-visitor.component';
import { InquiryVisitorTabsComponent } from './inquiry/inquiry-visitor-tabs/inquiry-visitor-tabs.component';
import { InvoiceMenuComponent } from '../company-admin/invoice-menu/invoice-menu/invoice-menu.component';
import { SetInvoiceProcessDefComponent } from '../super-admin/set-invoice-process-def/set-invoice-process-def.component';
import { ReloadPageComponent } from './reload-page/reload-page.component';
import { DefaultCompanySwitchComponent } from './default-company-switch/default-company-switch.component';
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
        path: 'validation-sample',
        component: ValidationSampleComponent,
    },
    {
        path: 'system-overview/:menuId',
        component: SystemOverviewComponent,
    },
    {
        path: '',
        component: FaqVisitorComponent,
        children: [
            {
                path: 'faq',
                component: FaqVisitorComponent,
                outlet: 'primary'
            },

        ]
    },
    {
        path: 'inquiry',
        component: InquiryVisitorTabsComponent
    },

    {
        path: 'subscription',
        component: SubscriptionFormComponent
    },
    {
        path: 'subscription-popup',
        component: SubscriptionPopComponent
    },
    {
        path: 'benefit',
        component: BenefitComponent
    },
    {
        path: 'privacyPolicy',
        component: PrivacyPolicyComponent
    },
    {
        path: 'terms-of-use',
        component: TermsOfUseComponent
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
