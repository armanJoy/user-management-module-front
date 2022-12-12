import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransporterAccountRoutingModule } from './transporter-account-routing.module';
import { TransporterAccountComponent } from './transporter-account.component';
// import { CommonDirectivesModule } from '../common-directives/common-directives.module';
// import { CommonUtilModule } from '../common-util/public-api';

@NgModule({
    declarations: [
        TransporterAccountComponent
    ],
    imports: [
        CommonModule,
        TransporterAccountRoutingModule,
        // CommonDirectivesModule,
        // CommonUtilModule,
    ]
})
export class TransporterAccountModule { }
