import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransporterAdminRoutingModule } from './transporter-admin-routing.module';
import { TransporterAdminComponent } from './transporter-admin.component';
// import { CommonDirectivesModule } from '../common-directives/common-directives.module';
// import { CommonUtilModule } from '../common-util/public-api';

@NgModule({
    declarations: [
        TransporterAdminComponent
    ],
    imports: [
        CommonModule,
        TransporterAdminRoutingModule,
        // CommonDirectivesModule,
        // CommonUtilModule,
    ]
})
export class TransporterAdminModule { }
