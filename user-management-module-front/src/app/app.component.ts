import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppConstant } from './config/app-constant';
import { LanguageService } from './services/visitor-services/language.service';
import { UserLoginService } from './services/visitor-services/user-login.service';
import { LogoutEventInfo, UserIdentification } from './models/backend-update/user-login';
import { UriService } from './services/visitor-services/uri.service';
import { ChangePasswordComponent } from './visitor/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { CompanySettingsOperationService } from './services/operation-services/company-settings/company-settings-operation.service';
import { AddUserView, DxrRole, UserInfoFetch, UserInfoQuery } from './models/backend-fetch/user-management-fetch';
import { ViewUserInfoPopupComponent } from './company-admin/user-management/view-user-info-popup/view-user-info-popup.component';
import { UtilService } from './services/visitor-services/util.service';
import { CompanyContext, UserMenuDef } from './models/backend-fetch/dxr-system';
import { SwitchContextComponent } from './visitor/switch-context/switch-context.component';
import { UserMangementOperatinService } from './services/operation-services/user-mangement-operatin.service';
import { environment } from 'src/environments/environment';
import { SocketioService } from './services/visitor-services/socketio.service';
import { SocketNotificationFetch } from './models/backend-fetch/notification';
import { DefaultCompanySwitchComponent } from './visitor/default-company-switch/default-company-switch.component';
import { CompanyInvitationPopupComponent } from './company-admin/business-agreement/company-invitation-popup/company-invitation-popup.component';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
import { BusinessAgreementService } from './services/operation-services/dumper-admin/business-agreement.service';
import { GasolineCo2EmissionInfo } from './models/backend-fetch/carbon-emmition';
import { DriverTripPlan } from './models/backend-fetch/load-unload';
import { LoadUnloadService } from './services/operation-services/load-unload.service';

declare var SockJS: any;
declare var Stomp: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    windowHeight: any = window.innerHeight;
    public stompClient!: any;
    private applicationLabels: BehaviorSubject<any>;

    constructor(private breakpointObserver: BreakpointObserver, private router: Router, private languageService: LanguageService, private cookieService: CookieService, private activatedroute: ActivatedRoute, private userLoginService: UserLoginService, private uriService: UriService, private matDialog: MatDialog, private companySettingsOperationService: CompanySettingsOperationService, private utilService: UtilService, private userMangementOperatinService: UserMangementOperatinService, private userManagementService: UserMangementOperatinService, private socketioService: SocketioService, private createScheduleOperationService: CreateScheduleOperationService, private businessAgreementService: BusinessAgreementService, private loadUnloadService: LoadUnloadService) {

        this.applicationLabels = new BehaviorSubject<any>(null);
    }

    setApplicationLabels(newValue: any): void {
        this.applicationLabels.next(newValue);
    }

    getApplicationLabels(): Observable<any> {
        return this.applicationLabels.asObservable();
    }

    @ViewChild('drawer') drawer!: any;

    toggle() {
        if (this.drawer) {
            this.drawer.toggle();
        }
    }

    selectedLangIndex = this.languageService.getSelectedLanguageIndex();
    isNotification: boolean = false;
    clickCount: number = 0;
    APP_VERSION: string = environment.appVersion;
    uiLabels: any = {};
    menuList: any = [];
    selectedMenu!: String;
    isLogedIn = false;
    primaryMenuTypeId = AppConstant.MENU_TYPE_PRIMARY;
    languageArray = ['jpn', 'eng'];
    public show: boolean = false;
    userNotification: SocketNotificationFetch[] = [];
    totalNotification: number = 0;
    selectedLanguage: string = (this.cookieService.get(AppConstant.LANG_INDEX_KEY)) ? this.cookieService.get(AppConstant.LANG_INDEX_KEY) : this.languageArray[0];
    selectedLanguageModel: string = this.selectedLanguage;
    profileArray: any = [];
    selectedProfileItem: string = '';
    selectedProfileFunction: any;
    dxrRolelist: DxrRole[] = [];
    viewContent = false;

    isSystemAdmin = this.utilService.languageEditMode();
    componentCode = AppConstant.COMP.APP_ROOT;

    connectionStatus = -1;

    ngOnInit(): void {

        this.activatedroute.paramMap.subscribe(params => {
            var langIndex = params.get('langIndex') ? params.get('langIndex') : null;

            if (langIndex) {
                this.selectedLangIndex = langIndex;
            }

            this.getDxrRoles();

        });

        this.router.events.subscribe((val) => {

            if (this.previousUrl != window.location.href) {
                this.previousUrl = window.location.href;
                var splited: string[] = window.location.href.split("/")

                if (splited && splited.length == 4) {
                    console.log("Returned to base url....");
                    if (this.menuList && this.menuList.length > 0) {

                        // this.router.navigate([this.menuList[0].menuUrl]);
                        this.setSelectedMenuName(this.menuList[0].menuTitle, this.menuList[0].menuUrl, this.menuList[0], "", true);
                    }
                }
            }


        });

    }

    previousUrl: string = '';

    hidden = false;

    getLanguage() {
        if (!this.selectedLangIndex || this.selectedLangIndex == '') {
            this.cookieService.set(AppConstant.LANG_INDEX_KEY, AppConstant.LANG_INDEX_JPN);
            this.selectedLanguage = AppConstant.LANG_INDEX_JPN;
        }

        var backUrl = '/language-competency/language';
        var cacheUrl = backUrl;
        this.uriService.callBackendWithCache(backUrl, AppConstant.HTTP_GET, cacheUrl, {}, (data: any) => {

            if (data) {
                this.languageService.setLanguageDefData(data);
                this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.APP_ROOT, AppConstant.UI_LABEL_TEXT);
                this.isSystemAdmin = this.utilService.languageEditMode();
                this.componentCode = AppConstant.COMP.APP_ROOT;
                this.prepareProfileItem();
            }

            this.setApplicationLabels(this.uiLabels);

            this.initialLogin();


        });


    }

    toggleBadgeVisibility() {
        this.hidden = !this.hidden;
    }

    prepareProfileItem() {
        this.uiLabels.profile = (this.uiLabels.profile != null) ? (this.uiLabels.profile) : 'Profile';
        this.uiLabels.switchCompany = (this.uiLabels.switchCompany != null) ? (this.uiLabels.switchCompany) : 'Switch Company';
        this.uiLabels.companyPreference = (this.uiLabels.companyPreference != null) ? (this.uiLabels.companyPreference) : 'Company Preference';
        this.uiLabels.changePassword = (this.uiLabels.changePassword != null) ? (this.uiLabels.changePassword) : 'Change Password';
        this.uiLabels.switchUser = (this.uiLabels.switchUser) ? (this.uiLabels.switchUser) : 'Switch User';
        this.uiLabels.logoutUser = (this.uiLabels.logoutUser) ? (this.uiLabels.logoutUser) : 'Logout User';
        this.profileArray = [
            {
                title: this.uiLabels.profile,
                function: this.viewProfile
            },
            {
                title: this.uiLabels.switchCompany,
                function: this.switchCompany
            },
            {
                title: this.uiLabels.companyPreference,
                function: this.companyPreference
            },
            {
                title: this.uiLabels.changePassword,
                function: this.changePassword
            },
            {
                title: this.uiLabels.switchUser,
                function: this.switchUser
            },
            {
                title: this.uiLabels.logoutUser,
                function: this.logoutCurrentUser
            }
        ]

        this.selectedProfileItem = this.profileArray[0].title;
    }

    redirectToUserManagementMenu = () => {

        var userManagementMenu: UserMenuDef | undefined = this.languageService.getMenuById(AppConstant.USER_MANAGEMENT_MENU_ID);
        if (userManagementMenu && userManagementMenu.menuUrl && userManagementMenu.parentSegment) {
            const outletName: string = AppConstant.COMPANY_ADMIN_OUTLET;
            const url: string = userManagementMenu.menuUrl;
            const parentSegment: string = userManagementMenu.parentSegment;

            setTimeout(() => this.router.navigate([parentSegment, { outlets: { [outletName]: [url] } }]), 200);
        }

    }

    redirectToDataRestoreMenu = () => {

        var dataRestoreMenu: UserMenuDef | undefined = this.languageService.getMenuById(AppConstant.DATA_RESTORE_MENU_ID);
        if (dataRestoreMenu && dataRestoreMenu.menuUrl && dataRestoreMenu.parentSegment) {
            const outletName: string = AppConstant.DUMPER_ADMIN_OUTLET;
            const url: string = dataRestoreMenu.menuUrl;
            const parentSegment: string = dataRestoreMenu.parentSegment;

            setTimeout(() => this.router.navigate([parentSegment, { outlets: { [outletName]: [url] } }]), 200);
        }
    }

    profileItemClick = () => {

        var itemIndex = this.profileArray.findIndex((item: any) => (item.title == this.selectedProfileItem));

        if (itemIndex >= 0) {
            this.profileArray[itemIndex].function(this.utilService, this.matDialog);
        }

    }

    companyPreference = () => {
        var defaultCompanyId: any = this.utilService.getDefaultCompany();
        var defaultContextInfo: CompanyContext = this.languageService.getCurrentCompany(defaultCompanyId);
        var contextList: CompanyContext[] = this.languageService.getEnrolledCompanyList();

        this.matDialog.open(DefaultCompanySwitchComponent, {
            width: '55%',
            height: '75%',
            data: {
                companyContext: defaultContextInfo,
                companyContextList: contextList
            }
        });
    }

    switchUser = () => {
        this.router.navigate(['visitor/login']);
    }

    viewProfile = () => {

        var userInfoQuery: UserInfoQuery = {} as UserInfoQuery;

        var userIdentificationId = this.utilService.getUserIdCookie();
        var companyId = this.utilService.getCompanyIdCookie();

        if (userIdentificationId && companyId) {
            userInfoQuery.userIdentificationId = userIdentificationId;
            userInfoQuery.companyId = companyId;

            this.companySettingsOperationService.getUserInfoByUserIdentificationAndCompanyId(userInfoQuery).subscribe(data => {

                if (data) {
                    this.SelectedUserInfoPopupOpenForView(data);
                }
            })
        }


    }

    switchCompany = () => {
        var currentCompanyId: any = this.utilService.getCompanyIdCookie();
        var currentContextInfo: CompanyContext = this.languageService.getCurrentCompany(currentCompanyId);
        var contextList: CompanyContext[] = this.languageService.getEnrolledCompanyList();

        this.matDialog.open(SwitchContextComponent, {
            width: '55%',
            height: '75%',
            data: {
                companyContext: currentContextInfo,
                companyContextList: contextList
            }
        })
    }

    SelectedUserInfoPopupOpenForView(userInfo: UserInfoFetch) {
        var companyId: any = this.utilService.getCompanyIdCookie();

        this.userMangementOperatinService.getCompanyInfo(companyId).subscribe(companyInfo => {
            if (companyInfo) {
                var addUserPopupData: AddUserView = {
                    users: userInfo,
                    companyInfo: companyInfo,

                };

                const dialogRef = this.matDialog.open(ViewUserInfoPopupComponent, {
                    width: '65%',
                    data: userInfo,
                    disableClose: true
                });
                dialogRef.afterClosed().subscribe(result => {

                });

                // var width: string = (!this.isHandset$) ? '90%' : '50%'
                // const dialogRef = this.matDialog.open(ViewUserInfoPopupComponent, {
                //     width: '65%',
                //     data: {
                //         userData: Object.assign({}, addUserPopupData),
                //         userRole: this.dxrRolelist
                //     },
                //     disableClose: true
                // });
                // dialogRef.afterClosed().subscribe(result => {

                // });
            }
        })



    }

    getDxrRoles() {
        this.userManagementService.getDxrRole().subscribe((data) => {
            if (data) {
                this.dxrRolelist = data;
            }

            this.getLanguage();
        });
    }

    changePassword(utilService: UtilService, matDialog: MatDialog) {

        var authId = utilService.getUserIdCookie();
        var width: string = '';
        var height: string = '';
        if (this.isHandset$) {
            width = '75%';
            height = '75%';
        } else {
            width = '700px';
            height = '530px';
        }

        const forgetPassDialog = matDialog.open(ChangePasswordComponent, {
            width: width,
            height: height,
            data: {
                userId: authId,
                fromProfile: true
            },
            disableClose: true
        });

    }

    initialLogin() {

        var userCookie: any = this.userLoginService.getInitialLoginUserCookie();
        var authId: any = (userCookie) ? userCookie.userId : null;
        var authPass: any = (userCookie) ? userCookie.userAuth : null;
        var cookieCompanyId: string = this.utilService.getCompanyIdCookie();
        // var lastCompanyIdCookie: any = this.userLoginService.getLastCompanyIdCookie(authId);
        // var sessionCompanyId: string = (cookieCompanyId) ? cookieCompanyId : lastCompanyIdCookie;

        if (authId && authPass && cookieCompanyId) {

            this.userLoginService.getUserSession(authId).subscribe(userSession => {
                if (userSession) {
                    var userIdentification: UserIdentification = {
                        userId: authId,
                        userAuth: authPass,
                        oneTimeAccessFlag: ''
                    }

                    this.userLoginService.login(userIdentification).subscribe(data => {

                        var userAccess: any[] = data;


                        var defaultCompany: any = (userAccess.find(item => item.preference == true));
                        if (!defaultCompany) {
                            defaultCompany = userAccess[0];
                        }

                        this.userLoginService.setUserLoginCookie(userIdentification.userId, userIdentification.userAuth, defaultCompany.companyId, cookieCompanyId, this.utilService.getSelectedLanguageIndex(), () => {
                            this.prepareUserAccessAndMenu(data);
                        });

                    });
                } else {
                    this.prepareUserAccessAndMenu();
                }
            })

        } else {
            this.prepareUserAccessAndMenu();

        }

    }

    prepareUserAccessAndMenu(data?: any) {
        if (data && data.length > 0) {
            this.isLogedIn = true;
            var previouslySelectedCompanyId = this.utilService.getCompanyIdCookie();

            this.languageService.setUserAccessInfo(data);

            if (previouslySelectedCompanyId) {
                this.languageService.setCurrentContextMenuItems(data, previouslySelectedCompanyId);
            } else {
                this.languageService.setCurrentContextMenuItems(data);
            }


            this.reloadMenuList(true, true);

        } else {
            this.reloadMenuList(false, false);
        }


    }

    changeLanguage() {
        if (confirm('Page will reload')) {
            this.utilService.setSelectedLanguageIndex(this.selectedLanguage, () => {
                window.location.assign('/' + this.selectedLanguage);
            });

        } else {
            this.selectedLanguage = (this.selectedLanguage == this.languageArray[0]) ? this.languageArray[1] : this.languageArray[0];
        }
    }

    dxrAdminMenuClick = 0;
    changeSecondaryMenuClick() {

        this.dxrAdminMenuClick = this.uriService.adjustDxrAdminMenuClick();

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    setSelectedMenuForRedirect(redirectMenuId: String) {
        var menuItem = this.menuList.find((item: any) => item.menuId == redirectMenuId);
        this.selectedMenu = menuItem.menuTitle;
    }

    setSelectedMenuName(menuName: String, url: string, menuItem?: any, parentMenuName?: string, fromBrowserBackAction?: boolean) {

        if (AppConstant.CREATE_SCHEDULE_MENU_ID == menuItem.menuId) {
            this.createScheduleOperationService.setIsRedirectedFromInitiateProjectMenu(false);
        }

        this.selectedMenu = (parentMenuName) ? parentMenuName : menuName;
        var browserUrl = this.router.isActive(url, false);
        if ((!this.router.isActive(url, false) && menuItem?.parentSegment == '') || (fromBrowserBackAction && menuItem?.parentSegment == '')) {
            this.router.navigate([url]);
        } else {
            if (menuItem.outletName && menuItem.outletName == AppConstant.DUMPER_ADMIN_OUTLET) {
                this.router.navigate([menuItem?.parentSegment, { outlets: { dumperAdminOutlet: [menuItem?.menuUrl] } }]);

            } else if (menuItem.outletName && menuItem.outletName == AppConstant.COMPANY_ADMIN_OUTLET) {
                this.router.navigate([menuItem?.parentSegment, { outlets: { companyAdminOutlet: [menuItem?.menuUrl] } }]);

            } else if (menuItem.outletName && menuItem.outletName == AppConstant.SYSTEM_ADMIN_OUTLET) {
                this.router.navigate([menuItem?.parentSegment, { outlets: { dxrSysAdminOutlet: [menuItem?.menuUrl] } }]);

            }

        }
    }

    footerRoutes = AppConstant.FOOTER_ROUTES;

    footerRoute(url: string) {
        var browserUrl = this.router.isActive(url, false);
        if (!this.router.isActive(url, false)) {
            this.router.navigate([url]);
        }
    }

    logoutFromCompany(fromLogoutAction: boolean, logoutCompanyId: any) {
        var cookieCompanyId: string = this.utilService.getCompanyIdCookie();

        if (fromLogoutAction || (logoutCompanyId && cookieCompanyId == logoutCompanyId)) {

            var logoutEventInfo: LogoutEventInfo = this.prepareLogoutEventInfo(AppConstant.COMPANY_LOGOUT);

            this.clearSessionCookieAndUserAccess(cookieCompanyId, () => {

                if (fromLogoutAction) {
                    this.publishLogoutEvent(logoutEventInfo);
                }
            });
        }
    }

    prepareLogoutEventInfo(logoutType: string): LogoutEventInfo {
        var userId: string = this.utilService.getUserIdCookie();
        var cookieCompanyId: string = this.utilService.getCompanyIdCookie();
        var browserSessionId: string = this.utilService.getBrowserSessionIdCookie();

        var logoutEventInfo: LogoutEventInfo = {
            browserSessionId: browserSessionId,
            userId: userId,
            companyId: cookieCompanyId,
            logoutType: logoutType
        }

        return logoutEventInfo;
    }

    clearSessionCookieAndUserAccess(removedCompanyId: string, callBack: any) {
        this.userLoginService.clearSessionStorageCookie(removedCompanyId, () => {
            callBack();
            this.resetUserAccessAndMenu();
        });
    }

    resetUserAccessAndMenu() {
        this.languageService.resetUserAccessInfo();
        this.languageService.resetUserMenuItems();
        this.reloadMenuList(false, false);
    }

    publishLogoutEvent(logoutEventInfo: LogoutEventInfo) {
        this.userLoginService.publishLogoutEvent(logoutEventInfo).subscribe(response => {
            if (response) {

            }
        });
    }

    logoutCurrentUser = () => {
        var userId: string = this.utilService.getUserIdCookie();
        this.logoutFromUser(userId, true);
    }

    logoutFromUser(userId: string, fromLogoutAction: boolean) {

        var sessionUserId: string = this.utilService.getUserIdCookie();
        var sessionCompanyId: string = this.utilService.getCompanyIdCookie();

        if (fromLogoutAction) {
            var logoutEventInfo: LogoutEventInfo = this.prepareLogoutEventInfo(AppConstant.USER_LOGOUT);

            this.userLoginService.clearUserSession(userId).subscribe(data => {

                this.userLoginService.clearUserCookie(userId, () => {

                    this.clearSessionCookieAndUserAccess(sessionCompanyId, () => {

                        if (fromLogoutAction) {
                            this.publishLogoutEvent(logoutEventInfo);
                        }
                    });

                });
            });

        } else if (!fromLogoutAction && sessionUserId && sessionUserId == userId) {
            this.clearSessionCookieAndUserAccess(sessionCompanyId, () => {

            });
        }


    }

    setIsLoged(status: boolean, isSwitchCompany: boolean) {

        this.isLogedIn = status;

        if (this.isLogedIn) {
            var userId: any = this.utilService.getUserIdCookie();
            this.userNotification = [];
            this.totalNotification = 0;

            this.initiateServerConnectionChecking();
            this.initializeWebSocketConnection(userId);
            this.initializeBrowserSessionSocket();
        }
    }

    initializeBrowserSessionSocket() {

        var browserSessionId: string = this.utilService.getBrowserSessionIdCookie();
        if (!browserSessionId) {
            browserSessionId = this.utilService.setBrowserSessionIdCookie();
        }

        var subscribeURL: string = "/topic/" + browserSessionId + "/logout";
        const serverUrl = environment.SOCKET_ENDPOINT;
        const ws = new SockJS(serverUrl);
        const that = this;
        var header = this.uriService.getHttpOptions();

        // if (!this.stompClient) {
        this.stompClient = Stomp.over(ws);
        this.stompClient.debug = () => { };
        this.stompClient.connect({}, function (frame: any) {
            console.log(new Date() + " - Browser Session New Connection Established");
            if (that.stompClient) {
                that.checkSocketConStatus(0, () => {
                    that.stompClient.subscribe(subscribeURL, (message: { body: any; }) => {
                        if (message.body) {
                            message.body = JSON.parse(message.body);
                            that.applyLogoutEvent(message.body);
                        }
                    }, header.headers);

                    that.connectionStatus = 1;
                });
            }

        });
    }

    applyLogoutEvent(logoutInfo: LogoutEventInfo) {
        console.log(logoutInfo);

        if (logoutInfo.logoutType == AppConstant.COMPANY_LOGOUT) {
            this.logoutFromCompany(false, logoutInfo.companyId);
        } else {
            this.logoutFromUser(logoutInfo.userId, false);
        }
    }

    initiateServerConnectionChecking() {
        setInterval(() => {
            var url = '/util/check-serve';
            this.uriService.callBackend(url, AppConstant.HTTP_GET).subscribe(response => {
                if (response) {
                    // console.log("Online Status = " + this.connectionStatus);
                    if (this.connectionStatus == 0 && this.isLogedIn) {
                        this.connectionStatus = -1;
                        this.initializeWebSocketConnection(this.utilService.getCompanyIdCookie());
                        this.initializeBrowserSessionSocket();
                    }

                }
            }, error => {
                if (error) {
                    this.connectionStatus = (this.connectionStatus == 1 && this.isLogedIn) ? 0 : this.connectionStatus;
                    console.log('\nconnection lost...\n');
                }
            })
        }, 3000);
    }

    initializeWebSocketConnection(userId: string) {

        var subscribeURL: string = "/topic/" + userId + "/greetings";
        const serverUrl = environment.SOCKET_ENDPOINT;
        var ws = new SockJS(serverUrl);
        const that = this;
        var header = this.uriService.getHttpOptions();

        this.stompClient = Stomp.over(ws);
        this.stompClient.reconnect_delay = 5000;
        this.stompClient.debug = () => { };

        this.stompClient.connect({}, function (frame: any) {
            console.log(new Date() + " - Notification Session New Connection Established" + frame);
            if (that.stompClient) {
                that.checkSocketConStatus(0, () => {
                    that.stompClient.subscribe(subscribeURL, (message: { body: any; }) => {
                        console.log("Subscribed to Notification")

                        if (message.body) {
                            console.log(JSON.parse(message.body));
                            var notification = JSON.parse(message.body);
                            if (notification[0] instanceof Object) {
                                that.prepareNotificationViewData(notification);
                            }
                        }

                    }, header.headers);

                    that.connectionStatus = 1;
                });
            }
        }, (error: any) => {
            console.log('Subscribe: error: ' + error);
        });
    }

    checkSocketConStatus(checkNum: number, callBack: any) {
        console.log("Trying to connect : " + checkNum);
        setTimeout(() => {

            if (!this.stompClient.connected && checkNum <= 4) {
                this.checkSocketConStatus(checkNum + 1, callBack);

            } else if (this.stompClient.connected) {
                callBack();
            } else if (checkNum > 4) {
                console.log("Socket connection attempt failed.")
            }
        }, 500)

    }

    prepareNotificationViewData(receivedNotification: SocketNotificationFetch[]) {

        var companyId: any = this.utilService.getCompanyIdCookie();
        this.userNotification = this.socketioService.prepareUserNotification(companyId, receivedNotification);
        this.totalNotification = this.socketioService.userNotificationCount(this.userNotification);
    }

    reloadMenuList(isLogged: boolean, switchCompany: boolean) {
        this.menuList = this.languageService.getUserMenuItems();

        this.prepareUserManagementAndDataRestoreOption();

        if (this.socketioService.isNotificationViewOrNot()) {
            var menuId = this.socketioService.getNotificationMenu();
        }
        else {
            this.selectedMenu = this.menuList[0].menuTitle;
            // this.router.navigate([this.menuList[0].menuUrl]);
        }
        setTimeout(() => {

            (this.menuList[0]) ? ((this.menuList[0].child && this.menuList[0].child.length > 0) ? this.setSelectedMenuName(this.menuList[0].child[0].menuTitle, this.menuList[0].child[0].menuUrl, this.menuList[0].child[0], this.menuList[0].menuTitle) : this.setSelectedMenuName(this.menuList[0].menuTitle, this.menuList[0].menuUrl, this.menuList[0])) : '';

            this.viewContent = true;
        }, 10);

        this.setIsLoged(isLogged, switchCompany);

    }

    prepareUserManagementAndDataRestoreOption() {
        var userManagementMenu: UserMenuDef | undefined = this.languageService.getMenuById(AppConstant.USER_MANAGEMENT_MENU_ID);
        if (userManagementMenu) {
            const userManagementMenuOption: any = {
                title: this.uiLabels.userManagement,
                function: this.redirectToUserManagementMenu
            };

            this.profileArray.splice(2, 0, userManagementMenuOption);
        }

        var dataRestoreMenu: UserMenuDef | undefined = this.languageService.getMenuById(AppConstant.DATA_RESTORE_MENU_ID);
        if (dataRestoreMenu) {
            const dataRestoreMenuOption: any = {
                title: this.uiLabels.dataRestoreMenu,
                function: this.redirectToDataRestoreMenu
            };

            this.profileArray.push(dataRestoreMenuOption);
        }
    }

    onClickNotificationIcon() {

        this.isNotification = true;

    }
    close(reason: string) {
        this.isNotification = false;

    }
    browseMenu(browseURL: string[], menuId: string): Observable<string> {
        setTimeout(() => this.router.navigate([browseURL[0], { outlets: { [browseURL[1]]: [browseURL[2]] } }]), 1000);
        return of(AppConstant.SUCCESS_RESPONSE_FROM_BACKEND);
    }
    public removeBrowseNotification = (notificationInfoId: string, notificationTypeId: string, url: string[], menuId: string, parentMenuId: string) => {
        this.router.navigateByUrl('/visitor/reloadPage');


        if (parentMenuId == AppConstant.DXR_SYSTEM_ADMIN_MENU_ID) {
            this.socketioService.setNotoficationViewForDxrSysAdmin(true);
            this.socketioService.setNotoficationViewForCompanyAdmin(false);
        }
        else if (parentMenuId == AppConstant.COMPANY_ADMIN_MENU_ID) {
            this.socketioService.setNotoficationViewForCompanyAdmin(true);
            this.socketioService.setNotoficationViewForDxrSysAdmin(false);
        }

        this.socketioService.setNotificationMenu(menuId);

        if (notificationInfoId && notificationTypeId) {
            this.socketioService.removeNotification(notificationInfoId).subscribe(data => {

                if (data == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {
                    this.userNotification = this.socketioService.removeNotificationFromNotificationList(notificationInfoId, notificationTypeId, this.userNotification)
                    this.totalNotification = this.socketioService.userNotificationCount(this.userNotification);

                    this.browseMenu(url, menuId).subscribe(element => {
                        if (element == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {


                        }
                    })

                    this.menuList.forEach((menuItem: any) => {
                        if (menuItem.menuId == parentMenuId) {
                            this.selectedMenu = menuItem.menuTitle;
                        }
                    });
                    setTimeout(() => this.isNotification = false, 1000);

                }
            });


        }

    }

    openCompanyInvitationDiolog() {
        var currentCompanyId: string = this.utilService.getCompanyIdCookie();

        this.businessAgreementService.getCompanyInfo(currentCompanyId).subscribe(companyInfo => {
            if (companyInfo) {

                const sampleDialog = this.matDialog.open(CompanyInvitationPopupComponent, {
                    width: '60%',
                    height: '50%',
                    data: companyInfo,
                    // disableClose: true
                });

                sampleDialog.afterClosed().subscribe(result => {
                    if (result) {
                        this.businessAgreementService.sendCompanyInvitation(result).subscribe((data) => {
                            if (data) {
                                alert("Invitation Send Successfully");
                            }
                        })

                    }

                });
            }
        })
    }

    loadOp = AppConstant.LOAD_OP;
    unloadOp = AppConstant.UNLOAD_OP;

    showLoadButton() {
        return this.utilService.showLoadButton();
    }

    showUnloadButton() {
        return this.utilService.showUnloadButton();
    }

    redirectToMobileApp() {
        if (this.showLoadButton() && this.isLogedIn) {

            this.redirectToLoadOpForCurrentDate();

        } else if (this.showUnloadButton() && this.isLogedIn) {

            this.loadUnloadService.redirectToUnloadOp();
        } else if (this.isLogedIn) {
            this.loadUnloadService.redirectToUnloadOp();
        } else {
            window.open(environment.MOBILE_APP_BASE_URL, '_blank');
        }
    }

    redirectToLoadOpForCurrentDate() {
        var tripPlan: DriverTripPlan = {
            tripInfoId: '',
            pickUpDate: this.utilService.getCurrentDate(),
            pickUpDateView: this.utilService.getCurrentDate(),
            startTime: '',
            endTime: '',
            driverId: '',
            driverName: '',
            driverLicenseNo: '',
            pickList: [],
            vehicleInfo: {
                companyId: "",
                vehicleId: "",
                frontendDate: "",
                backendDate: "",
                manufacturerName: "",
                vehicleType: "",
                vehicleTypeId: "",
                modelName: "",
                vehicleRegNo: "",
                vehicleCapacity: "",
                vehicleWeight: "",
                gasolineType: [],
                vehicleGasolineTypeAndCo2Info: {} as GasolineCo2EmissionInfo,
                inspectionDate: "",
                vehicleOwnerShip: [],
                zipcode: "",
                zipcodeFormated: "",
                officeAddress: "",
                fitnessLicense: "",
                remarks: ""
            }
        }

        this.loadUnloadService.loadPick(tripPlan, -1, tripPlan.pickUpDateView);

    }
}
