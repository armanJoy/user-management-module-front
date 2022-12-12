import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DumperAdminRoutingModule } from './dumper-admin-routing.module';
import { DumperAdminComponent } from './dumper-admin.component';

import { CommonDirectivesModule } from '../common-directives/common-directives.module';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// import { CommonUtilModule } from '../common-util/public-api';

@NgModule({
    declarations: [
        DumperAdminComponent,

    ],
    imports: [
        CommonModule,
        DumperAdminRoutingModule,
        CommonDirectivesModule,
        // CommonUtilModule,
    ],
    exports: [

    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
})
export class DumperAdminModule { }
