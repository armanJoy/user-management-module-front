import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/config/app-constant';
import { SocketNotificationFetch } from 'src/app/models/backend-fetch/notification';
import { SocketioService } from 'src/app/services/visitor-services/socketio.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
@Component({
    selector: 'app-notification-menu',
    templateUrl: './notification-menu.component.html',
    styleUrls: ['./notification-menu.component.css']
})
export class NotificationMenuComponent implements OnInit {
    @Input()
    userNotification: SocketNotificationFetch[] = [];
    @Input()
    totalNotification: number = 0;
    @Input()
    public removeBrowseNotification!: (notificationInfoId: string, notificationTypeId: string, url: string[], menuId: string, parentMenuId: string) => void;
    selectNotificationInfo: SocketNotificationFetch = {
        notificationTypeName: "",
        notificationTypeId: "",
        menuId: "",
        parentMenuId: "",
        notificationNumberOftype: 0,
        browseURL: [],
        notifications: []
    }
    componentCode: string = AppConstant.COMP.Notification_Menu_Component;
    isSystemAdmin: boolean = false;

    constructor(private router: Router, private socketioService: SocketioService, private utilService: UtilService, private languageService: LanguageService) { }

    ngOnInit(): void {

        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.Notification_Menu_Component, AppConstant.UI_LABEL_TEXT);


        if (this.userNotification.length > 0) {
            this.selectNotificationInfo = this.userNotification[0];
        }
    }
    uiLabels: any = {
        notification: "Notification",
        detail: "Detail"
    }
    isDone: boolean = false;
    isTab: boolean = false;
    onClickBrowseBtn() {
        this.isDone = false;
        var url = ['/system-admin', { outlets: { dxrSysAdminOutlet: ['inquiry-admin'] } }];
        this.setSelectedMenuName("Companay Operation", "/company-admin/project")
        // this.socketioService.navaigation(url);

        // this.childCaseStudy.routeFunction();
        // this.router.navigate(['/company-admin/project', { outlets: { dumperAdminOutlet: ['create-schedule'] } }]);
        // this.router.navigate(['/company-admin/project', { outlets: { dumperAdminOutlet: ['create-schedule'] } }]);
        this.router.navigate(url);

        if (this.isDone) {
            this.router.navigate(['/company-admin/project', { outlets: { dumperAdminOutlet: ['create-schedule'] } }]);
        }

    }
    setSelectedMenuName(menuName: String, url: string) {

        // this.selectedMenu = menuName;
        var browserUrl = this.router.isActive(url, false);
        if (!this.router.isActive(url, false)) {
            this.router.navigate([url]);
        }
        this.isDone = true;
    }
    selectedIndex = 0;
    informChange(index: any) {
        this.selectedIndex = index;
    }
    public switchTabToDetailTab = (index: number, notification: SocketNotificationFetch) => {
        this.selectNotificationInfo = notification;
        this.selectedIndex = index;
    }
    public browseNotification = (notificationInfoId: string, notificationTypeId: string, url: string[], menuId: string, parentMenuId: string) => {
        this.removeBrowseNotification(notificationInfoId, notificationTypeId, url, menuId, parentMenuId);
    }

}
