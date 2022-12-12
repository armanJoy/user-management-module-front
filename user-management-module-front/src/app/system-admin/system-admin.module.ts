import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs'
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SystemAdminRoutingModule } from './system-admin-routing.module';
import { SystemAdminComponent } from './system-admin.component';
import { VisitorModule } from '../visitor/visitor.module';
import { FaqAdminComponent } from './faq/faq-admin/faq-admin.component';
import { FaqCategoryAdminComponent } from './faq/faq-category-admin/faq-category-admin.component';
import { FaqQuestionAnswerAdminComponent } from './faq/faq-question-answer-admin/faq-question-answer-admin.component';
import { AddFaqCategoryComponent } from './faq/add-faq-category/add-faq-category.component';
import { AddFaqQuestionAnswerComponent } from './faq/add-faq-question-answer/add-faq-question-answer.component';
import { SystemOverviewAdminComponent } from './system-overview-admin/system-overview-admin.component';
import { BenefitAdminComponent } from './system-overview-admin/benefit-admin/benefit-admin.component';
import { CaseAdminComponent } from './system-overview-admin/case-admin/case-admin.component';
import { TermsOfUseAdminComponent } from './system-overview-admin/terms-of-use-admin/terms-of-use-admin.component';
import { ClientListAdminComponent } from './system-overview-admin/client-list-admin/client-list-admin.component';
import { InquiryListComponent } from './inquiry-admin/inquiry-tabs/inquiry-tabs.component';
import { ResponseComponent } from './inquiry-admin/response/response.component';
import { InquiryReplyComponent } from './inquiry-admin/inquiry-reply/inquiry-reply.component';
import { InquiryInfoListComponent } from './inquiry-admin/inquiry-info-list/inquiry-info-list.component';
import { MatRadioModule } from '@angular/material/radio';
import { SubscriptionListComponent } from './subscription-admin/subscription-list/subscription-list.component';
import { SubscriptionListPopupComponent } from './subscription-admin/subscription-list-popup/subscription-list-popup.component';
import { SubscriptionSubmissionInfoComponent } from './subscription-admin/subscription-submission-info/subscription-submission-info.component';
import { SubscriptionConfirmationComponent } from './subscription-admin/subscription-confirmation/subscription-confirmation.component';
import { SubscriptionSaveSnackbarComponent } from './subscription-admin/subscription-save-snackbar/subscription-save-snackbar.component';
import { RoleDefAdminComponent } from './role-def-admin/role-def-admin.component';
import { RoleDefMenuListComponent } from './role-def-admin/role-def-menu-list/role-def-menu-list.component';
import { RoleAssignPopupComponent } from './role-def-admin/role-assign-popup/role-assign-popup.component';
import { MatChipsModule } from '@angular/material/chips';
import { ResponseFilter } from './subscription-admin/subscription-list/response-filter';
import { InquiryFilter } from './inquiry-admin/inquiry-info-list/InquiryFilter';
import { CreateCompanyAdminComponent } from './subscription-admin/create-company-admin/create-company-admin.component';
import { SubscriptionTabGroupComponent } from './subscription-admin/subscription-tab-group/subscription-tab-group.component';
import { WasteCategoryComponent } from './waste-def/waste-category/waste-category.component';
import { WasteItemComponent } from './waste-def/waste-item/waste-item.component';
import { WasteDefFormComponent } from './waste-def/waste-def-form/waste-def-form.component';
import { WasteCategoryFormComponent } from './waste-def/waste-category-form/waste-category-form.component';
import { WasteDefComponent } from './waste-def/waste-def.component';
import { WasteRequestTabsComponent } from './waste-request/waste-request-tabs/waste-request-tabs.component';
import { WasteRequestListTabComponent } from './waste-request/waste-request-list-tab/waste-request-list-tab.component';
import { RequestResponseTabComponent } from './waste-request/request-response-tab/request-response-tab.component';
import { RequestReplyPopupComponent } from './waste-request/request-reply-popup/request-reply-popup.component';
import { CreateWasteTabComponent } from './waste-request/create-waste-tab/create-waste-tab.component';
import { WasteFilter } from './waste-request/waste-request-list-tab/wasteFilter';
import { MatSelectModule } from '@angular/material/select';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';
import { AddCategoryTabComponent } from './waste-def/add-category-tab/add-category-tab.component';
import { AddCategoryPopupComponent } from './waste-def/add-category-popup/add-category-popup.component';
import { CarbonDioxideTabComponent } from './waste-def/carbon-dioxide-tab/carbon-dioxide-tab.component';
import { VehicleSetupMenuComponent } from './vehicle-setup-menu/vehicle-setup-menu.component';
import { GasolineTabComponent } from './vehicle-setup-menu/gasoline-tab/gasoline-tab.component';
import { VehicleTabComponent } from './vehicle-setup-menu/vehicle-tab/vehicle-tab.component';
import { AddMethodePopupComponent } from './waste-def/add-methode-popup/add-methode-popup.component';
import { ConfirmationSubscriptionStatusComponent } from './subscription-admin/confirmation-subscription-status/confirmation-subscription-status.component';
import { CompanyWasteCoefficientComponent } from './waste-def/company-waste-coefficient/company-waste-coefficient.component';
import { BulkSubscriptionComponent } from './bulk-subscription/bulk-subscription.component';
import { SubscriptionFormComponent } from '../visitor/subscription/subscription-form/subscription-form.component';

@NgModule({
    declarations: [
        SystemAdminComponent,
        FaqAdminComponent,
        FaqCategoryAdminComponent,
        FaqQuestionAnswerAdminComponent,
        AddFaqCategoryComponent,
        AddFaqQuestionAnswerComponent,
        SystemOverviewAdminComponent,
        BenefitAdminComponent,
        CaseAdminComponent,
        TermsOfUseAdminComponent,
        ClientListAdminComponent,
        InquiryListComponent,
        ResponseComponent,
        InquiryReplyComponent,
        InquiryInfoListComponent,
        SubscriptionListComponent,
        SubscriptionListPopupComponent,
        SubscriptionSubmissionInfoComponent,
        SubscriptionConfirmationComponent,
        SubscriptionSaveSnackbarComponent,
        RoleDefAdminComponent,
        RoleDefMenuListComponent,
        RoleAssignPopupComponent,
        ResponseFilter,
        InquiryFilter,
        CreateCompanyAdminComponent,
        SubscriptionTabGroupComponent,
        WasteCategoryComponent,
        WasteItemComponent,
        WasteDefFormComponent,
        WasteCategoryFormComponent,
        WasteDefComponent,
        WasteRequestTabsComponent,
        WasteRequestListTabComponent,
        RequestResponseTabComponent,
        RequestReplyPopupComponent,
        CreateWasteTabComponent,
        WasteFilter,
        AddCategoryTabComponent,
        AddCategoryPopupComponent,
        CarbonDioxideTabComponent,
        VehicleSetupMenuComponent,
        GasolineTabComponent,
        VehicleTabComponent,
        AddMethodePopupComponent,
        ConfirmationSubscriptionStatusComponent,
        CompanyWasteCoefficientComponent,
        BulkSubscriptionComponent
    ],
    imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatRadioModule,
        CommonModule,
        SystemAdminRoutingModule,
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
        ReactiveFormsModule,
        MatInputModule,
        MatTreeModule,
        FormsModule,
        MatExpansionModule,
        MatDialogModule,
        MatCardModule,
        MatTabsModule,
        FlexLayoutModule,
        MatRadioModule,
        MatCheckboxModule,
        VisitorModule,
        MatChipsModule,
        MatSelectModule,
        CommonDirectivesModule
    ],
    exports: [
        FaqAdminComponent,
        SystemAdminComponent,
        // SubscriptionListComponent,
        BulkSubscriptionComponent

    ],
    providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }]
})
export class SystemAdminModule { }
