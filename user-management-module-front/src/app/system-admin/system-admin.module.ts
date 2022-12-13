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
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';

@NgModule({
    declarations: [
        SystemAdminComponent
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
        SystemAdminComponent,
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }]
})
export class SystemAdminModule { }
