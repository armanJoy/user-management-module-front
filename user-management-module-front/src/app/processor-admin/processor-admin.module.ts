import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessorAdminRoutingModule } from './processor-admin-routing.module';
import { ProcessorAdminComponent } from './processor-admin.component';
// import { CommonDirectivesModule } from '../common-directives/common-directives.module';
// import { CommonUtilModule } from '../common-util/public-api';

@NgModule({
    declarations: [
        ProcessorAdminComponent
    ],
    imports: [
        CommonModule,
        ProcessorAdminRoutingModule,
        // CommonDirectivesModule,
        // CommonUtilModule,
    ]
})
export class ProcessorAdminModule { }
