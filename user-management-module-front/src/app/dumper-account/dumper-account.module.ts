import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DumperAccountRoutingModule } from './dumper-account-routing.module';
import { DumperAccountComponent } from './dumper-account.component';
// import { CommonDirectivesModule } from '../common-directives/common-directives.module';
// import { CommonUtilModule } from '../common-util/public-api';


@NgModule({
    declarations: [
        DumperAccountComponent
    ],
    imports: [
        CommonModule,
        DumperAccountRoutingModule,
        // CommonDirectivesModule,
        // CommonUtilModule,
    ]
})
export class DumperAccountModule { }
