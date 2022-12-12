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
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { CommonDirectivesRoutingModule } from './common-directives-routing.module';
import { CommonDirectivesComponent } from './common-directives.component';
import { PrimaryMenuComponent } from './primary-menu/primary-menu.component';
import { SecondaryMenuComponent } from './secondary-menu/secondary-menu.component';
import { ValidationReportPopupComponent } from './validation-report-popup/validation-report-popup.component';
import { TermAndConditionPopupComponent } from './term-and-condition-popup/term-and-condition-popup.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateTimeInputComponent } from './date-time-input/date-time-input.component';
import { LangDefButtonComponent } from './lang-def-button/lang-def-button.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchPaginationComponent } from './search-pagination/search-pagination.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ActionConfirmationPopupComponent } from './action-confirmation-popup/action-confirmation-popup.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { ProjectBasicInfoComponent } from './project-basic-info/project-basic-info.component';

@NgModule({
    declarations: [
        CommonDirectivesComponent,
        PrimaryMenuComponent,
        SecondaryMenuComponent,
        ValidationReportPopupComponent,
        TermAndConditionPopupComponent,
        DateTimeInputComponent,
        LangDefButtonComponent,
        PaginationComponent,
        SearchPaginationComponent,
        ActionConfirmationPopupComponent,
        DeleteConfirmationComponent,
        ProjectBasicInfoComponent,
    ],
    imports: [
        DragDropModule,
        CommonModule,
        CommonDirectivesRoutingModule,
        FlexLayoutModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
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
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        NgxMaskModule.forRoot(),
        MatChipsModule,
        MatCheckboxModule,
        NgxMaskModule.forRoot(),
        ScrollingModule
    ],
    exports: [
        FlexLayoutModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
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
        MatSelectModule,
        MatRadioModule,
        NgxMaskModule,
        MatDatepickerModule,
        MatChipsModule,
        MatCheckboxModule,
        DateTimeInputComponent,
        LangDefButtonComponent,
        SearchPaginationComponent,
        DeleteConfirmationComponent,
        ProjectBasicInfoComponent
    ],
    providers: [
        MatDialog,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
})
export class CommonDirectivesModule { }