import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { VisitorRoutingModule } from './visitor-routing.module';
import { VisitorComponent } from './visitor.component';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { UserLoginComponent } from './user-login/user-login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AppComponent } from '../app.component';
import { FirstTimeLoginComponent } from './first-time-login/first-time-login.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    declarations: [
        VisitorComponent,
        UserLoginComponent,
        ChangePasswordComponent,
        FirstTimeLoginComponent,
    ],
    imports: [
        MatCheckboxModule,
        CommonModule,
        VisitorRoutingModule,
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
        MatTreeModule,
        FormsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatDialogModule,
        FlexLayoutModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        CommonDirectivesModule,
        MatSelectModule,
        MatRadioModule,
        MatSnackBarModule,
        NgxMaskModule.forRoot()
    ],
    exports: [
    ],
    providers: [AppComponent,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
})
export class VisitorModule { }
