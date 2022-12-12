import { Injectable } from '@angular/core';
import { UriService } from './uri.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SocketNotificationFetch } from 'src/app/models/backend-fetch/notification';
import { AppConstant } from 'src/app/config/app-constant';

declare var SockJS: new (arg0: string) => any;
declare var Stomp: { over: (arg0: any) => any; };
@Injectable({
    providedIn: 'root'
})
export class SocketioService {
    public stompClient!: { connect: (arg0: {}, arg1: (frame: any) => void) => void; subscribe: (arg0: string, arg1: (message: any) => void) => void; send: (arg0: string, arg1: {}, arg2: any) => void; };
    public msg: string[] = [];
    socket: any;
    navigateUrl: string = ''
    public message$: BehaviorSubject<string> = new BehaviorSubject('');
    isDxrSysAdminNotification: boolean = false;
    isCompanyAdminNotification: boolean = false;
    selectedNotificationMenu: string = "";


    constructor(private uriService: UriService) { }
    public sendUserLoginTrigger(userId: string): Observable<string> {
        var url = '/notification/get-initial-notification';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, userId);
    }

    setNotoficationViewForCompanyAdmin(flag: boolean) {
        this.isCompanyAdminNotification = flag;
    }
    isCompanyAdminNotificationView(): boolean {
        return this.isCompanyAdminNotification;

    }
    setNotoficationViewForDxrSysAdmin(flag: boolean) {
        this.isDxrSysAdminNotification = flag;
    }
    isNotificationViewOrNot(): boolean {
        return this.isDxrSysAdminNotification;

    }
    setNotificationMenu(menu: string) {
        this.selectedNotificationMenu = menu;
    }


    getNotificationMenu(): string {

        return this.selectedNotificationMenu;
    }

    removeNotification(notificationId: string): Observable<string> {
        var url = '/notification/remove-notification';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, notificationId);

        // var data: string = "1";
        // return of(data);
    }
    removeNotificationFromNotificationList(notificationInfoId: string, notificationTypeId: string, notificationList: SocketNotificationFetch[]): SocketNotificationFetch[] {
        var index1 = -1;
        var index2 = -1;
        index1 = notificationList.findIndex(item => item.notificationTypeId == notificationTypeId);
        if (index1 >= 0) {
            index2 = notificationList[index1].notifications.findIndex(item => item.notificationId == notificationInfoId);
            if (index2 >= 0) {
                notificationList[index1].notifications.splice(index2, 1);
                notificationList[index1].notificationNumberOftype = notificationList[index1].notifications.length;
                if (notificationList[index1].notificationNumberOftype <= 0) {
                    notificationList.splice(index1, 1);
                }
            }
        }
        return notificationList;
    }

    // getNotification(userId: string): SocketNotificationFetch[] {
    //     this.initializeWebSocketConnection(userId);

    //     return this.socketNotificationList;
    // }
    // initializeWebSocketConnection(userId: string) {
    //     var subscribeURL: string = "/topic/" + userId;

    //     this.msg.push("Hii");
    //     // const serverUrl = 'http://192.168.68.109:8000/socket';
    //     // = io(environment.SOCKET_ENDPOINT);
    //     const serverUrl = environment.SOCKET_ENDPOINT;
    //     // console.log(serverUrl);
    //     const ws = new SockJS(serverUrl);
    //     this.stompClient = Stomp.over(ws);
    //     const that = this;

    //     this.stompClient.connect({}, function (frame: any) {
    //         that.stompClient.subscribe(subscribeURL, (message: { body: any; }) => {
    //             if (message.body) {
    //                 that.msg.push(message.body);


    //             }
    //         });
    //     });

    //     // this.stompClient.connect({}, function (frame: any) {
    //     //     that.stompClient.subscribe('/topic/raju', (message: { body: any; }) => {
    //     //         if (message.body) {
    //     //             that.msg.push(message.body);


    //     //         }
    //     //     });
    //     // });
    // }
    public prepareUserNotification(companyId: string, reciveNotification: SocketNotificationFetch[]): SocketNotificationFetch[] {

        var prepareNotification: SocketNotificationFetch[] = [];

        reciveNotification.forEach(element => {
            var notificationInfo: SocketNotificationFetch = {
                notificationTypeName: "",
                notificationTypeId: "",
                notificationNumberOftype: 0,
                parentMenuId: "",
                menuId: "",
                browseURL: [],
                notifications: []
            }
            notificationInfo.notificationTypeId = element.notificationTypeId;
            notificationInfo.notificationTypeName = element.notificationTypeName;
            notificationInfo.browseURL = element.browseURL;
            notificationInfo.menuId = element.menuId;
            notificationInfo.parentMenuId = element.parentMenuId;
            element.notifications.forEach(item => {
                if (item.recieverCompanyId == companyId) {
                    notificationInfo.notifications.push(item);
                }

            });
            notificationInfo.notificationNumberOftype = notificationInfo.notifications.length;
            if (notificationInfo.notificationNumberOftype > 0) {
                prepareNotification.push(notificationInfo);
            }
        });
        return prepareNotification;
    }

    userNotificationCount(prepareNotification: SocketNotificationFetch[]): number {
        var totalNotification: number = 0;
        prepareNotification.forEach(element => {
            totalNotification += element.notificationNumberOftype;
        });
        return totalNotification
    }
    // private subject: Rx.Subject<MessageEvent>;
    // public connect(url:any): Rx.Subject<MessageEvent> {
    //     if (!this.subject) {
    //         this.subject = this.create(url);
    //         console.log("Successfully connected: " + url);
    //     }
    //     return this.subject;
    // }

    // private create(url:any): Rx.Subject<MessageEvent> {
    //     let ws = new WebSocket(url);

    //     let observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
    //         ws.onmessage = obs.next.bind(obs);
    //         ws.onerror = obs.error.bind(obs);
    //         ws.onclose = obs.complete.bind(obs);
    //         return ws.close.bind(ws);
    //     });
    //     let observer = {
    //         next: (data: Object) => {
    //             if (ws.readyState === WebSocket.OPEN) {
    //                 ws.send(JSON.stringify(data));
    //             }
    //         }
    //     };
    //     return Rx.Subject.create(observer, observable);
    // }


    // setupSocketConnection() {
    //     
    //     // this.socket = io(environment.SOCKET_ENDPOINT);
    //     console.log(this.socket)
    //     // this.getNewMessage();
    // }
    // public getNewMessage = () => {
    //     this.socket.on('message', (message: any) => {
    //         this.message$.next(message);
    //     });
    //     console.log(this.message$);
    //     return this.message$.asObservable();
    // };
    socketNotificationList: SocketNotificationFetch[] = [
        {
            notificationTypeName: "Subscription",
            notificationTypeId: "notificationTypeId001",
            notificationNumberOftype: 0,
            menuId: "sysAdminSubscription",
            parentMenuId: "menudefSystemAdmin",
            // browseURL: "['/system-admin',{outlets:{dxrSysAdminOutlet:['subscription-admin']}}]",
            browseURL: ["/system-admin", "dxrSysAdminOutlet", "subscription-admin"],
            notifications: [
                {
                    notificationId: "notificationId001",
                    recieverCompanyId: "dxr00001",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Mangrove Systems",
                    senderUserName: "Joy",
                    message: "New Subscription",
                },
                {
                    notificationId: "notificationId002",
                    recieverCompanyId: "dxr00001",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Waste process Systems",
                    senderUserName: "Mokid",
                    message: "New Subscription",
                },
                {
                    notificationId: "notificationId003",
                    recieverCompanyId: "dxr00001",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Mangrove Systems",
                    senderUserName: "rakib",
                    message: "New Subscription",
                },
                {
                    notificationId: "notificationId004",
                    recieverCompanyId: "dxr00001",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Waste process Systems",
                    senderUserName: "raju",
                    message: "New Subscription",
                },

            ]
        },
        {
            notificationTypeName: "Inquiry",
            notificationTypeId: "notificationTypeId002",
            notificationNumberOftype: 0,
            // browseURL: "['/system-admin', { outlets: { dxrSysAdminOutlet: ['inquiry-admin'] } }]",
            browseURL: ["/system-admin", "dxrSysAdminOutlet", "inquiry-admin"],
            parentMenuId: "menudefSystemAdmin",
            menuId: "sysAdminInquiry",
            notifications: [
                {
                    notificationId: "notificationId005",
                    recieverCompanyId: "dxr00001",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Mangrove Systems",
                    senderUserName: "Joy",
                    message: "New Inquiry",
                },
                {
                    notificationId: "notificationId006",
                    recieverCompanyId: "dxr00001",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Waste process Systems",
                    senderUserName: "Mokid",
                    message: "New Inquiry",
                },
                {
                    notificationId: "notificationId007",
                    recieverCompanyId: "dxr00001",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Mangrove Systems",
                    senderUserName: "rakib",
                    message: "New Inquiry",
                },
                {
                    notificationId: "notificationId008",
                    recieverCompanyId: "dxr00001",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Waste process Systems",
                    senderUserName: "raju",
                    message: "New Inquiry",
                },

            ]
        },
        {
            notificationTypeName: "Waste Request",
            notificationTypeId: "notificationTypeId003",
            notificationNumberOftype: 0,
            // browseURL: "['/system-admin', { outlets: { dxrSysAdminOutlet: ['waste-request-admin'] } }]",
            browseURL: ["/system-admin", "dxrSysAdminOutlet", "waste-request-admin"],
            menuId: "sysAdminWasteRequest",
            parentMenuId: "menudefSystemAdmin",
            notifications: [
                {
                    notificationId: "notificationId009",
                    recieverCompanyId: "dxr00001",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Mangrove Systems",
                    senderUserName: "Joy",
                    message: "New Waste Request",
                },
                {
                    notificationId: "notificationId0010",
                    recieverCompanyId: "dxr00001",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Waste process Systems",
                    senderUserName: "Mokid",
                    message: "New Waste Request",
                },
                {
                    notificationId: "notificationId0011",
                    recieverCompanyId: "dxr00001",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Mangrove Systems",
                    senderUserName: "rakib",
                    message: "New Waste Request",
                },
                {
                    notificationId: "notificationId0012",
                    recieverCompanyId: "dxr00001",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Waste process Systems",
                    senderUserName: "raju",
                    message: "New Waste Request",
                },

            ]
        },
        {
            notificationTypeName: "Project",
            notificationTypeId: "notificationTypeId004",
            notificationNumberOftype: 0,
            // browseURL: "['/company-admin/project', { outlets: { dumperAdminOutlet: ['initiate-project'] } }]",
            browseURL: ["/company-admin/project", "dumperAdminOutlet", "initiate-project"],
            menuId: "initiateProject",
            parentMenuId: "menudef0002",
            notifications: [
                {
                    notificationId: "notificationId0013",
                    recieverCompanyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Mangrove Systems",
                    senderUserName: "Joy",
                    message: "New Project",
                },
                {
                    notificationId: "notificationId0014",
                    recieverCompanyId: "0716fabb-9a0c-432f-818e-c7277940ee07",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Waste process Systems",
                    senderUserName: "Mokid",
                    message: "New Project",
                },
                {
                    notificationId: "notificationId0015",
                    recieverCompanyId: "562dbdb4-7fcf-430f-9703-c27f8079971a",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Mangrove Systems",
                    senderUserName: "rakib",
                    message: "New Project",
                },
                {
                    notificationId: "notificationId0016",
                    recieverCompanyId: "0716fabb-9a0c-432f-818e-c7277940ee07",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Waste process Systems",
                    senderUserName: "raju",
                    message: "New Project",
                },

            ]
        },
        {
            notificationTypeName: "Agreement",
            notificationTypeId: "notificationTypeId005",
            notificationNumberOftype: 0,
            // browseURL: ["/company-admin/project", "dumperAdminOutlet", "business-agreement"] "['/company-admin/project', { outlets: { dumperAdminOutlet: ['business-agreement'] } }]",
            browseURL: ["/company-admin/project", "dumperAdminOutlet", "business-agreement"],
            menuId: "menudefBusinessAgreement",
            parentMenuId: "menudef0002",
            notifications: [
                {
                    notificationId: "notificationId0017",
                    recieverCompanyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Mangrove Systems",
                    senderUserName: "Joy",
                    message: "New Agreement",
                },
                {
                    notificationId: "notificationId0018",
                    recieverCompanyId: "0716fabb-9a0c-432f-818e-c7277940ee07",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Waste process Systems",
                    senderUserName: "Mokid",
                    message: "New Agreement",
                },
                {
                    notificationId: "notificationId0019",
                    recieverCompanyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Mangrove Systems",
                    senderUserName: "rakib",
                    message: "New Agreement",
                },
                {
                    notificationId: "notificationId0020",
                    recieverCompanyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                    recieverUserId: "",
                    dateAndTime: "2022/06/01",
                    senderOrganizationName: "Waste process Systems",
                    senderUserName: "raju",
                    message: "New Agreement",
                },
                // {
                //     notificationId: "notificationId009",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "Joy",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0010",
                //     companyId: "0716fabb-9a0c-432f-818e-c7277940ee07",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "Mokid",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0011",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "rakib",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0012",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "raju",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId009",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "Joy",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0010",
                //     companyId: "0716fabb-9a0c-432f-818e-c7277940ee07",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "Mokid",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0011",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "rakib",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0012",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "raju",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId009",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "Joy",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0010",
                //     companyId: "0716fabb-9a0c-432f-818e-c7277940ee07",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "Mokid",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0011",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "rakib",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0012",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "raju",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId009",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "Joy",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0010",
                //     companyId: "0716fabb-9a0c-432f-818e-c7277940ee07",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "Mokid",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0011",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "rakib",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0012",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "raju",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId009",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "Joy",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0010",
                //     companyId: "0716fabb-9a0c-432f-818e-c7277940ee07",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "Mokid",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0011",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "rakib",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0012",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "raju",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId009",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "Joy",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0010",
                //     companyId: "0716fabb-9a0c-432f-818e-c7277940ee07",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "Mokid",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0011",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "rakib",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0012",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "raju",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId009",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "Joy",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0010",
                //     companyId: "0716fabb-9a0c-432f-818e-c7277940ee07",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "Mokid",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0011",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "rakib",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0012",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "raju",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId009",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "Joy",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0010",
                //     companyId: "0716fabb-9a0c-432f-818e-c7277940ee07",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "Mokid",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0011",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "rakib",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0012",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "raju",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId009",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "Joy",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0010",
                //     companyId: "0716fabb-9a0c-432f-818e-c7277940ee07",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "Mokid",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0011",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Mangrove Systems",
                //     userName: "rakib",
                //     message: "New Agreement",
                // },
                // {
                //     notificationId: "notificationId0012",
                //     companyId: "562dbdb4-7fcf-430f-9703-c27f8079971b",
                //     notifyUserId: "",
                //     dateAndTime: "2022/06/01",
                //     organizationName: "Waste process Systems",
                //     userName: "raju",
                //     message: "New Agreement",
                // },

            ]
        }
    ]
}
