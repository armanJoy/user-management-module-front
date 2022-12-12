import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessorAccountRoutingModule } from './processor-account-routing.module';
import { ProcessorAccountComponent } from './processor-account.component';
// import { CommonDirectivesModule } from '../common-directives/common-directives.module';
// import { CommonUtilModule } from '../common-util/public-api';


@NgModule({
    declarations: [
        ProcessorAccountComponent
    ],
    imports: [
        CommonModule,
        ProcessorAccountRoutingModule,
        // CommonDirectivesModule,
        // CommonUtilModule,
    ]
})
export class ProcessorAccountModule { }
