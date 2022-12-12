import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { CreateDxrAdminComponent } from './create-dxr-admin/create-dxr-admin.component';
import { SetDxrAdminAccessComponent } from './set-dxr-admin-access/set-dxr-admin-access.component';
import { SetCompanyAdminAccessComponent } from './set-company-admin-access/set-company-admin-access.component';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';
import { MatCardModule } from '@angular/material/card';
import { ComponentListComponent } from './language-setup/component-list/component-list.component';
import { LanguageSetupPopupComponent } from './language-setup/language-setup-popup/language-setup-popup.component';
import { LanguageAlertPopupComponent } from './language-setup/language-alert-popup/language-alert-popup.component';
import { CompLanguageSetPopupComponent } from './comp-language-set-popup/comp-language-set-popup.component';
import { SetAgreementProcessDefComponent } from './set-agreement-process-def/set-agreement-process-def.component';
import { LanguageDefAddPopupComponent } from './language-def-add-popup/language-def-add-popup.component';
import { SetProjectProcessDefComponent } from './set-project-process-def/set-project-process-def.component';
import { SetInvoiceProcessDefComponent } from './set-invoice-process-def/set-invoice-process-def.component';
import { SetSubscriptonProcessDefComponent } from './set-subscripton-process-def/set-subscripton-process-def.component';
import { SetNotificationProcessDefComponent } from './set-notification-process-def/set-notification-process-def.component';

@NgModule({
    declarations: [
        SuperAdminComponent,
        CreateDxrAdminComponent,
        SetDxrAdminAccessComponent,
        SetCompanyAdminAccessComponent,
        ComponentListComponent,
        LanguageSetupPopupComponent,
        LanguageAlertPopupComponent,
        CompLanguageSetPopupComponent,
        SetAgreementProcessDefComponent,
        LanguageDefAddPopupComponent,
        SetProjectProcessDefComponent,
        SetInvoiceProcessDefComponent,
        SetSubscriptonProcessDefComponent,
        SetNotificationProcessDefComponent,

    ],
    imports: [
        CommonModule,
        SuperAdminRoutingModule,
        CommonDirectivesModule,
        MatCardModule
    ]
})
export class SuperAdminModule { }