import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { MatTreeModule } from '@angular/material/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { LanguageService } from './services/visitor-services/language.service';
import { UriService } from './services/visitor-services/uri.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonDirectivesModule } from './common-directives/common-directives.module';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationComponent } from './notification/notification.component';
import { SocketioService } from './services/visitor-services/socketio.service';
import { NotificationMenuComponent } from './notification/notification-menu/notification-menu.component';
import { NotificationDetailComponent } from './notification/notification-detail/notification-detail.component';
import { CompanyAdminModule } from './company-admin/company-admin.module';
import { SystemAdminModule } from './system-admin/system-admin.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        AppComponent,
        NotificationComponent,
        NotificationMenuComponent,
        NotificationDetailComponent,

    ],
    imports: [

        BrowserAnimationsModule,
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatGridListModule,
        MatTreeModule,
        MatExpansionModule,
        FlexLayoutModule,
        MatSelectModule,
        MatDialogModule,

        HttpClientModule,
        MatSelectModule,
        CommonDirectivesModule,
        MatBadgeModule,
        CompanyAdminModule,
        SystemAdminModule,
        GoogleChartsModule,
        MatMenuModule

        // CommonUtilModule,

        // VisitorModule,
        // VisitorRoutingModule,
        // SystemAdminModule,
        // SystemAdminRoutingModule,
    ],
    providers: [CookieService, UriService, LanguageService, MatSnackBar, MatDialog, SocketioService],
    bootstrap: [AppComponent]
})
export class AppModule { }
