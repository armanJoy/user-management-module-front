import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from '../config/app-constant';
import { SocketNotificationFetch } from '../models/backend-fetch/notification';
import { LanguageService } from '../services/visitor-services/language.service';
import { SocketioService } from '../services/visitor-services/socketio.service';
import { UtilService } from '../services/visitor-services/util.service';
// import { CompanyAdminComponent } from '../company-admin/company-admin.component';
@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    // @ViewChild(CompanyAdminComponent) childCaseStudy: any;
    @Input()
    userNotification: SocketNotificationFetch[] = [];
    @Input()
    public switchTab!: (index: number, notification: SocketNotificationFetch) => void;

    viewComponent: boolean = true;
    componentCode: string = AppConstant.COMP.Notification_Component;
    isSystemAdmin: boolean = false;

    constructor(private router: Router, private socketioService: SocketioService, private utilService: UtilService, private languageService: LanguageService) { }

    ngOnInit(): void {
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.Notification_Component, AppConstant.UI_LABEL_TEXT);
    }
    uiLabels: any = {
        detail: "Detail"
    }

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }
    onClickDetailBtn(notification: SocketNotificationFetch) {
        this.switchTab(1, notification);
    }


}
