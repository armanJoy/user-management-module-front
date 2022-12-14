import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from './config/app-constant';
import { LanguageService } from './services/visitor-services/language.service';
import { UserLoginService } from './services/visitor-services/user-login.service';
import { LogoutEventInfo, UserIdentification } from './models/backend-update/user-login';
import { UtilService } from './services/visitor-services/util.service';
import { environment } from 'src/environments/environment';
import { SocketioService } from './services/visitor-services/socketio.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private router: Router, private languageService: LanguageService, private activatedroute: ActivatedRoute, private userLoginService: UserLoginService, private utilService: UtilService, private socketioService: SocketioService) {

    }
    @ViewChild('drawer') drawer!: any;
    primaryMenuHead = "Arcgen";
    menuList: any = [
        {
            menuId: "1",
            menuTitle: "Register User",
            menuUrl: "/register",
            menuTypeId: "menutype0001",
            child: []
        }
    ];
    viewContent: boolean = true;
    APP_VERSION: string = environment.appVersion;
    primaryMenuTypeId = AppConstant.MENU_TYPE_PRIMARY;
    selectedMenu!: String;
    isLogedIn = false;

    ngOnInit(): void {
        this.initialLogin();
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );


    toggle() {
        if (this.drawer) {
            this.drawer.toggle();
        }
    }

    close(reason: string) {
        // this.isNotification = false;

    }

    initialLogin() {
        var userCookie: any = this.userLoginService.getInitialLoginUserCookie();
        var authId: any = (userCookie) ? userCookie.userId : null;
        var authPass: any = (userCookie) ? userCookie.userAuth : null;
        debugger
        if (authId && authPass) {

            var userIdentification: UserIdentification = {
                userId: authId,
                userAuth: authPass,
            }

            this.userLoginService.loginUsingCookie(userIdentification).subscribe(data => {

                if (data) {
                    this.userLoginService.setUserLoginCookie(userIdentification.userId, userIdentification.userAuth, () => {
                        this.prepareUserAccessAndMenu(true);
                    });

                } else {
                    this.prepareUserAccessAndMenu(false);
                }

            });

        } else {
            this.prepareUserAccessAndMenu(false);

        }

    }

    logout() {
        this.userLoginService.clearUserCookie(() => {

        });
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

    resetUserAccessAndMenu() {
        this.prepareUserAccessAndMenu(false)
    }



    setSelectedMenuName(menuName: String, url: string, menuItem?: any, parentMenuName?: string, fromBrowserBackAction?: boolean) {
        this.selectedMenu = (parentMenuName) ? parentMenuName : menuName;
        this.router.navigate([url]);
    }


    setIsLoged(status: boolean, isSwitchCompany: boolean) {

        this.isLogedIn = status;

        if (this.isLogedIn) {
            var userId: any = this.utilService.getUserIdCookie();

        }
    }

    prepareUserAccessAndMenu(state: boolean) {
        this.isLogedIn = state;
    }

}
