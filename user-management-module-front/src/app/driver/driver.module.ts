import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './driver.component';
// import { CommonDirectivesModule } from '../common-directives/common-directives.module';
// import { CommonUtilModule } from '../common-util/public-api';


@NgModule({
    declarations: [
        DriverComponent
    ],
    imports: [
        CommonModule,
        DriverRoutingModule,
        // CommonDirectivesModule,
        // CommonUtilModule,
    ]
})
export class DriverModule { }
