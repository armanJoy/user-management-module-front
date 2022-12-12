import { Component, OnInit, Input } from '@angular/core';
import { SocketNotificationFetch } from 'src/app/models/backend-fetch/notification';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-notification-detail',
    templateUrl: './notification-detail.component.html',
    styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements OnInit {
    @Input()
    selectNotificationInfo: SocketNotificationFetch = {
        notificationTypeName: "",
        notificationTypeId: "",
        notificationNumberOftype: 0,
        browseURL: [],
        menuId: "",
        parentMenuId: "",
        notifications: []
    }
    @Input()
    public browseNotification!: (notificationInfoId: string, notificationTypeId: string, url: string[], menuId: string, parentMenuId: string) => void;
    componentCode: string = AppConstant.COMP.Notification_Detail_Component;
    isSystemAdmin: boolean = false;

    constructor(private utilService: UtilService, private languageService: LanguageService) { }

    ngOnInit(): void {
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.Notification_Detail_Component, AppConstant.UI_LABEL_TEXT);
    }
    uiLabels: any = {
        notificationListFor: "Notification List For  ",
        notification: "Notification ",
        browse: "Browse",
        dateAndTime: "Date&Time",
        organization: "Organization",
        userName: "User Name",
        message: "Message"
    }


    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    onClickBrowseBtn(notificationInfoId: string, notificationTypeId: string, url: string[], menuId: string, parentMenuId: string) {

        setTimeout(() => this.browseNotification(notificationInfoId, notificationTypeId, url, menuId, parentMenuId), 1000);
    }

}
