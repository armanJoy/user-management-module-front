export interface NotificationSetInfo {
    contextId: string;
    companyId: string;
    baseTableId: string;
    trigerUserInfoId: string;
    status: StatusInfo;


}
export interface StatusInfo {
    id: string;
    titleEng: string;
    titleJpn: string;
}

export interface SocketNotificationFetch {
    notificationTypeName: string;
    notificationTypeId: string;
    notificationNumberOftype: number;
    parentMenuId: string;
    menuId: string;
    browseURL: string[];
    notifications: NotificationInfo[],
}
export interface NotificationInfo {
    notificationId: string;
    recieverCompanyId: string;
    recieverUserId: string;
    dateAndTime: string;
    senderOrganizationName: string;
    senderUserName: string;
    message: string;

}