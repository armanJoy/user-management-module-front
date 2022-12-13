import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyAdminRoutingModule } from './company-admin-routing.module';
import { CompanyAdminComponent } from './company-admin.component';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';
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
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
    declarations: [
        CompanyAdminComponent,
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
        MatCheckboxModule,
        LayoutModule
    ],
    providers: [
        MatDialog,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        // { provide: MAT_DATE_FORMATS, useValue: {} }
    ]

})
export class CompanyAdminModule { }
