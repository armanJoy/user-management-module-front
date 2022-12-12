import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyAdminRoutingModule } from './company-admin-routing.module';
import { CompanyAdminComponent } from './company-admin.component';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { HttpClientModule } from '@angular/common/http';
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
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs'
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserManagementMenuComponent } from './user-management/user-management-menu/user-management-menu.component';
import { UserListTabComponent } from './user-management/user-list-tab/user-list-tab.component';
import { DefineRoleTabComponent } from './user-management/define-role-tab/define-role-tab.component';
import { AddUserPopupComponent } from './user-management/add-user-popup/add-user-popup.component';
import { ViewUserInfoPopupComponent } from './user-management/view-user-info-popup/view-user-info-popup.component';
import { SetRolePopupComponent } from './user-management/set-role-popup/set-role-popup.component';
import { RoleTabComponent } from './user-management/role-tab/role-tab.component';
import { MenuAccessTabComponent } from './user-management/menu-access-tab/menu-access-tab.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { LicenseViewPopupComponent } from './user-management/license-view-popup/license-view-popup.component';
import { CompanySettingsTabsComponent } from './company-settings/company-settings-tabs/company-settings-tabs.component';
import { CompanyInfoTabComponent } from './company-settings/company-info-tab/company-info-tab.component';
import { BranchInfoTabComponent } from './company-settings/branch-info-tab/branch-info-tab.component';
import { VehicleInfoTabComponent } from './company-settings/vehicle-info-tab/vehicle-info-tab.component';
import { BasePriceTabComponent } from './company-settings/base-price-tab/base-price-tab.component';
import { CompanyInfoPopupComponent } from './company-settings/company-info-popup/company-info-popup.component';
import { BranchInfoAddPopupComponent } from './company-settings/branch-info-add-popup/branch-info-add-popup.component';
import { BranchInfoViewPopupComponent } from './company-settings/branch-info-view-popup/branch-info-view-popup.component';
import { VehicleInfoAddPopupComponent } from './company-settings/vehicle-info-add-popup/vehicle-info-add-popup.component';
import { VehicleInfoViewPopupComponent } from './company-settings/vehicle-info-view-popup/vehicle-info-view-popup.component';
import { AddWastePopupComponent } from './company-settings/add-waste-popup/add-waste-popup.component';
import { PriceSelectionPopupComponent } from './company-settings/price-selection-popup/price-selection-popup.component';
import { AccountInfoTabComponent } from './company-settings/account-info-tab/account-info-tab.component';
import { AccountInfoPopupComponent } from './company-settings/account-info-popup/account-info-popup.component';
import { BankAccountInfoPopupComponent } from './company-settings/bank-account-info-popup/bank-account-info-popup.component';
import { ScaleSettingTabComponent } from './company-settings/scale-setting-tab/scale-setting-tab.component';
import { ScaleSettingPopupComponent } from './company-settings/scale-setting-popup/scale-setting-popup.component';
import { InitiateProjectComponent } from './initiate-project/initiate-project.component';
import { ProjectListDashBoardTabComponent } from './initiate-project/project-list-dash-board-tab/project-list-dash-board-tab.component';
import { CreateNewProjectTabComponent } from './initiate-project/create-new-project-tab/create-new-project-tab.component';
import { InitiateProjectMenuComponent } from './initiate-project/initiate-project-menu/initiate-project-menu.component';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { CreateScheduleMenuComponent } from './create-schedule/create-schedule-menu/create-schedule-menu.component';
import { ScheduleDashboardTabComponent } from './create-schedule/schedule-dashboard-tab/schedule-dashboard-tab.component';
import { ProjectInfoTabComponent } from './create-schedule/project-info-tab/project-info-tab.component';
import { VehicleTripScheduleComponent } from './create-schedule/vehicle-trip-schedule/vehicle-trip-schedule.component';
import { ProjectTripScheduleComponent } from './create-schedule/project-trip-schedule/project-trip-schedule.component';
import { SelectAgreementPopupComponent } from './initiate-project/select-agreement-popup/select-agreement-popup.component';
import { AgreementListTabComponent } from './initiate-project/agreement-list-tab/agreement-list-tab.component';
import { WastePickTabComponent } from './initiate-project/waste-pick-tab/waste-pick-tab.component';
import { PickScheduleTabComponent } from './initiate-project/pick-schedule-tab/pick-schedule-tab.component';
import { ProceesScheduleTabComponent } from './initiate-project/procees-schedule-tab/procees-schedule-tab.component';
import { NewWasteRequestInfoComponent } from './company-settings/new-waste-request-info/new-waste-request-info.component';
import { RequestSubmitPopupComponent } from './company-settings/request-submit-popup/request-submit-popup.component';
import { VehicleTripMatrixComponent } from './create-schedule/vehicle-trip-matrix/vehicle-trip-matrix.component';
import { DriverScheduleComponent } from './create-schedule/driver-schedule/driver-schedule.component';
import { AgreementFilter } from '../services/operation-services/dumper-admin/agreement-filter';
import { CompanyCategoryFilter } from '../services/operation-services/dumper-admin/company-category-filter';
import { AgreementActionConfirmPopupComponent } from './agreement-action-confirm-popup/agreement-action-confirm-popup.component';
import { AddBankInfoPopupComponent } from './business-agreement/add-bank-info-popup/add-bank-info-popup.component';
import { BusinessAgreementListTabComponent } from './business-agreement/agreement-list-tab/agreement-list-tab.component';
import { AgreementTabComponent } from './business-agreement/agreement-tab/agreement-tab.component';
import { AgreementViewPopupComponent } from './business-agreement/agreement-view-popup/agreement-view-popup.component';
import { BusinessPartnerTabsComponent } from './business-agreement/business-partner-tabs/business-partner-tabs.component';
import { PartnerDetailsPopupComponent } from './business-agreement/partner-details-popup/partner-details-popup.component';
import { PartnerListTabComponent } from './business-agreement/partner-list-tab/partner-list-tab.component';
import { SelectAgreementPartnerPopupComponent } from './business-agreement/select-agreement-partner-popup/select-agreement-partner-popup.component';
import { SelectBankPopupComponent } from './business-agreement/select-bank-popup/select-bank-popup.component';
import { SelectLocationPopupComponent } from './business-agreement/select-location-popup/select-location-popup.component';
import { SelectPersonInChargePopupComponent } from './business-agreement/select-person-in-charge-popup/select-person-in-charge-popup.component';
import { SelectWastePopupComponent } from './business-agreement/select-waste-popup/select-waste-popup.component';
import { DumperMenuComponent } from './dumper-menu/dumper-menu.component';
import { AddTripPopupComponent } from './create-schedule/add-trip-popup/add-trip-popup.component';
import { TripDetailsPopupComponent } from './create-schedule/trip-details-popup/trip-details-popup.component';
import { AddPickPopupComponent } from './create-schedule/add-pick-popup/add-pick-popup.component';
import { DriverBandViewPopupComponent } from './create-schedule/driver-band-view-popup/driver-band-view-popup.component';
import { SendSubRequestComponent } from './business-agreement/send-sub-request/send-sub-request.component';
import { ProjectActionConfirmPopupComponent } from './initiate-project/project-action-confirm-popup/project-action-confirm-popup.component';
import { ProjectFilter } from '../services/operation-services/project-filter';
import { ConfirmSchedulePopupComponent } from './create-schedule/confirm-schedule-popup/confirm-schedule-popup.component';
import { SetMethodePopupComponent } from './company-settings/set-methode-popup/set-methode-popup.component';
import { Co2TabComponent } from './company-settings/co2-tab/co2-tab.component';
import { Co2DetailPopupComponent } from './company-settings/co2-detail-popup/co2-detail-popup.component';
import { DumpingOperationTabComponent } from './company-settings/dumping-operation-tab/dumping-operation-tab.component';
import { ProcessingOperationTabComponent } from './company-settings/processing-operation-tab/processing-operation-tab.component';
import { TransportingOperationTabComponent } from './company-settings/transporting-operation-tab/transporting-operation-tab.component';
import { BarChartDumpingOperationComponent } from './company-settings/bar-chart-dumping-operation/bar-chart-dumping-operation.component';
import { InvoiceMenuComponent } from './invoice-menu/invoice-menu/invoice-menu.component';
import { MenifestoMenuComponent } from './menifesto/menifesto-menu/menifesto-menu.component';
import { ConfirmationInvoiceStatusComponent } from './invoice-menu/confirmation-invoice-status/confirmation-invoice-status.component';
import { CompanyInvitationPopupComponent } from './business-agreement/company-invitation-popup/company-invitation-popup.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { MenifestoTabComponent } from './menifesto/menifesto-tab/menifesto-tab.component';
import { ManualmenifestoTabComponent } from './menifesto/manualmenifesto-tab/manualmenifesto-tab.component';
import { LoadOperationComponent } from './load-operation/load-operation.component';
import { UnloadOperationComponent } from './unload-operation/unload-operation.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProcessCompletionMenuComponent } from './processCompletion/process-completion-menu/process-completion-menu.component';
import { GeneratedMenifestoListComponent } from './processCompletion/generated-menifesto-list/generated-menifesto-list.component';
import { AddDisposalDateComponent } from './processCompletion/add-disposal-date/add-disposal-date.component';
import { ManifestoFilter } from './menifesto/menifesto-menu/menifesto-filter';
import { ManifestoListDirectiveComponent } from './processCompletion/manifesto-list-directive/manifesto-list-directive.component';
import { ConfirmCompletionRevertComponent } from './processCompletion/confirm-completion-revert/confirm-completion-revert.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormProcessingTabComponent } from './menifesto/form-processing-tab/form-processing-tab.component';
import { DataRestoreMenuComponent } from './dataRestore/data-restore-menu/data-restore-menu.component';
import { CompleteManifestoProcessComponent } from './menifesto/complete-manifesto-process/complete-manifesto-process.component';
import { ProcessFilter } from './initiate-project/create-new-project-tab/process-item-filter-by-waste';
import { PartnerCategoryFilter } from './business-agreement/agreement-tab/partner-category-filter';
import { QrCodePopupComponent } from './menifesto/qr-code-popup/qr-code-popup.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { TripFilterBasedOnDisposalPick } from './create-schedule/vehicle-trip-matrix/trip-filter-based-on-disposal-pick';
import { TargetCompanyTabComponent } from './invoice-menu/target-company-tab/target-company-tab.component';
import { CashInvoicePopupComponent } from './invoice-menu/cash-invoice-popup/cash-invoice-popup.component';
import { CashManifestTabComponent } from './invoice-menu/cash-manifest-tab/cash-manifest-tab.component';
import { TripConfirmDashboardComponent } from './trip-confirm-dashboard/trip-confirm-dashboard.component';
import { TripListDirectiveComponent } from './trip-confirm-dashboard/trip-list-directive/trip-list-directive.component';

@NgModule({
    declarations: [
        CompanyManagementComponent,
        UserManagementMenuComponent,
        UserListTabComponent,
        DefineRoleTabComponent,
        AddUserPopupComponent,
        ViewUserInfoPopupComponent,
        SetRolePopupComponent,
        RoleTabComponent,
        MenuAccessTabComponent,
        LicenseViewPopupComponent,
        CompanyAdminComponent,
        CompanyManagementComponent,
        AddUserPopupComponent,
        CompanySettingsTabsComponent,
        CompanyInfoTabComponent,
        BranchInfoTabComponent,
        VehicleInfoTabComponent,
        BasePriceTabComponent,
        CompanyInfoPopupComponent,
        BranchInfoAddPopupComponent,
        BranchInfoViewPopupComponent,
        VehicleInfoAddPopupComponent,
        VehicleInfoViewPopupComponent,
        AddWastePopupComponent,
        PriceSelectionPopupComponent,
        AccountInfoTabComponent,
        AccountInfoPopupComponent,
        BankAccountInfoPopupComponent,
        ScaleSettingTabComponent,
        ScaleSettingPopupComponent,
        InitiateProjectComponent,
        ProjectListDashBoardTabComponent,
        CreateNewProjectTabComponent,
        InitiateProjectMenuComponent,
        CreateScheduleComponent,
        CreateScheduleMenuComponent,
        ScheduleDashboardTabComponent,
        ProjectInfoTabComponent,
        VehicleTripScheduleComponent,
        ProjectTripScheduleComponent,
        SelectAgreementPopupComponent,
        AgreementListTabComponent,
        WastePickTabComponent,
        PickScheduleTabComponent,
        ProceesScheduleTabComponent,
        NewWasteRequestInfoComponent,
        RequestSubmitPopupComponent,
        VehicleTripMatrixComponent,
        DriverScheduleComponent,
        BusinessPartnerTabsComponent,
        PartnerListTabComponent,
        PartnerDetailsPopupComponent,
        BusinessAgreementListTabComponent,
        AgreementViewPopupComponent,
        AgreementTabComponent,
        SelectPersonInChargePopupComponent,
        SelectAgreementPartnerPopupComponent,
        SelectWastePopupComponent,
        SelectLocationPopupComponent,
        SelectBankPopupComponent,
        AddBankInfoPopupComponent,
        DumperMenuComponent,
        AgreementActionConfirmPopupComponent,
        AgreementFilter,
        CompanyCategoryFilter,
        AddTripPopupComponent,
        TripDetailsPopupComponent,
        AddPickPopupComponent,
        DriverBandViewPopupComponent,
        SendSubRequestComponent,
        ProjectActionConfirmPopupComponent,
        ProjectFilter,
        ConfirmSchedulePopupComponent,
        SetMethodePopupComponent,
        Co2TabComponent,
        Co2DetailPopupComponent,
        DumpingOperationTabComponent,
        ProcessingOperationTabComponent,
        TransportingOperationTabComponent,
        BarChartDumpingOperationComponent,
        InvoiceMenuComponent,
        MenifestoMenuComponent,
        ConfirmationInvoiceStatusComponent,
        CompanyInvitationPopupComponent,
        MenifestoTabComponent,
        ManualmenifestoTabComponent,
        LoadOperationComponent,
        UnloadOperationComponent,
        ProcessCompletionMenuComponent,
        GeneratedMenifestoListComponent,
        AddDisposalDateComponent,
        ManifestoFilter,
        ManifestoListDirectiveComponent,
        ConfirmCompletionRevertComponent,
        FormProcessingTabComponent,
        DataRestoreMenuComponent,
        CompleteManifestoProcessComponent,
        ProcessFilter,
        PartnerCategoryFilter,
        QrCodePopupComponent,
        TripFilterBasedOnDisposalPick,
        TargetCompanyTabComponent,
        CashInvoicePopupComponent,
        CashManifestTabComponent,
        TripConfirmDashboardComponent,
        TripListDirectiveComponent
    ],
    imports: [
        MatChipsModule,
        MatButtonModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        HttpClientModule,
        MatIconModule,
        MatGridListModule,
        MatFormFieldModule,
        MatTreeModule,
        FormsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatDialogModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatSnackBarModule,
        FlexLayoutModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatSidenavModule,
        CommonModule,
        CompanyAdminRoutingModule,
        CommonDirectivesModule,
        MatSelectModule,
        CommonDirectivesModule,
        CommonModule,
        CompanyAdminRoutingModule,
        CommonDirectivesModule,
        MatCheckboxModule,
        LayoutModule,
        GoogleChartsModule,
        ScrollingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxQRCodeModule,
    ],
    providers: [
        MatDialog,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        // { provide: MAT_DATE_FORMATS, useValue: {} }
    ]

})
export class CompanyAdminModule { }
