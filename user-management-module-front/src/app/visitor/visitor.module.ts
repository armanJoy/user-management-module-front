import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTreeModule } from '@angular/material/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { VisitorRoutingModule } from './visitor-routing.module';
import { VisitorComponent } from './visitor.component';
import { FaqComponent } from './faq/faq.component';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';
import { FaqCategoryComponent } from './faq-category/faq-category.component';
import { FaqQuestionAnswerComponent } from './faq-question-answer/faq-question-answer.component';
import { SystemOverviewComponent } from './system-overview/system-overview.component';
import { BenefitComponent } from './system-overview/benefit/benefit.component';
import { CaseComponent } from './system-overview/case/case.component';
import { TermsOfUseComponent } from './system-overview/terms-of-use/terms-of-use.component';
import { ClientListComponent } from './system-overview/client-list/client-list.component';
import { SubscriptionFormComponent } from './subscription/subscription-form/subscription-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { SubscriptionPopComponent } from './subscription/subscription-pop-up/subscription-popup.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { ValidationSampleComponent } from './validation-sample/validation-sample.component';
import { InvalidMessageComponent } from './validation-sample/invalid-message/invalid-message.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { InquiryFormComponent } from './inquiry/inquiry-form/inquiry-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModifyStaticPageComponent } from './system-overview/modify-static-page/modify-static-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AppComponent } from '../app.component';
import { SubmitPopupComponent } from './inquiry/submit-popup/submit-popup.component';
import { CaseStudyComponent } from './system-overview/case-study/case-study.component';
import { HowToUseItComponent } from './system-overview/how-to-use-it/how-to-use-it.component';
import { IntroductionFlowComponent } from './system-overview/introduction-flow/introduction-flow.component';
import { CompanyUsingItComponent } from './system-overview/company-using-it/company-using-it.component';
import { CostingComponent } from './system-overview/costing/costing.component';
import { PrivacyPolicyComponent } from './system-overview/privacy-policy/privacy-policy.component';
import { FirstTimeLoginComponent } from './first-time-login/first-time-login.component';
import { SwitchContextComponent } from './switch-context/switch-context.component';
import { FaqVisitorComponent } from './faq-visitor/faq-visitor.component';
import { InquiryVisitorTabsComponent } from './inquiry/inquiry-visitor-tabs/inquiry-visitor-tabs.component';
import { InquiryDiscussionTabComponent } from './inquiry/inquiry-discussion-tab/inquiry-discussion-tab.component';
import { ThreadDiscussionPopupComponent } from './inquiry/thread-discussion-popup/thread-discussion-popup.component';
import { ReloadPageComponent } from './reload-page/reload-page.component';
import { DefaultCompanySwitchComponent } from './default-company-switch/default-company-switch.component';

@NgModule({
    declarations: [
        VisitorComponent,
        FaqComponent,
        FaqCategoryComponent,
        FaqQuestionAnswerComponent,
        SystemOverviewComponent,
        BenefitComponent,
        CaseComponent,
        TermsOfUseComponent,
        ClientListComponent,
        InquiryFormComponent,
        SubscriptionFormComponent,
        SubscriptionPopComponent,
        ValidationSampleComponent,
        InvalidMessageComponent,
        UserLoginComponent,
        ModifyStaticPageComponent,
        ChangePasswordComponent,
        SubmitPopupComponent,
        FirstTimeLoginComponent,
        CaseStudyComponent,
        HowToUseItComponent,
        IntroductionFlowComponent,
        CompanyUsingItComponent,
        CostingComponent,
        PrivacyPolicyComponent,
        SwitchContextComponent,
        FaqVisitorComponent,
        InquiryVisitorTabsComponent,
        InquiryDiscussionTabComponent,
        ThreadDiscussionPopupComponent,
        ReloadPageComponent,
        DefaultCompanySwitchComponent,
    ],
    imports: [
        MatCheckboxModule,
        CommonModule,
        VisitorRoutingModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatGridListModule,
        MatFormFieldModule,
        MatTreeModule,
        FormsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatDialogModule,
        FlexLayoutModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        CommonDirectivesModule,
        MatSelectModule,
        MatRadioModule,
        MatSnackBarModule,
        NgxMaskModule.forRoot()
    ],
    exports: [
        FaqComponent,
        FaqCategoryComponent,
        FaqQuestionAnswerComponent,
        SystemOverviewComponent,
        InquiryFormComponent,
        BenefitComponent,
        CaseComponent,
        TermsOfUseComponent,
        ClientListComponent,
        CaseStudyComponent,
        CompanyUsingItComponent,
        HowToUseItComponent,
        IntroductionFlowComponent,
        CostingComponent,
        TermsOfUseComponent,
        PrivacyPolicyComponent,
        ThreadDiscussionPopupComponent,
        SubscriptionFormComponent
    ],
    providers: [AppComponent,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
})
export class VisitorModule { }
