import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/config/app-constant';
import { UserMangementOperatinService } from 'src/app/services/operation-services/user-mangement-operatin.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { CompanyInfoFetch } from 'src/app/models/backend-fetch/user-management-fetch';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
import { SocketioService } from 'src/app/services/visitor-services/socketio.service';

@Component({
    selector: 'app-dumper-menu',
    templateUrl: './dumper-menu.component.html',
    styleUrls: ['./dumper-menu.component.css']
})
export class DumperMenuComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private router: Router, private route: ActivatedRoute, private userMangementOperatinService: UserMangementOperatinService, private utilService: UtilService, private createScheduleOperationService: CreateScheduleOperationService, private socketioService: SocketioService) { }

    hideSecondaryMenu = AppConstant.HIDE_SECONDARY_MENU;

    menuList: any = [
        {
            menuId: "1",
            menuTitle: "Agreement",
            menuUrl: "business-agreement",
            parentSegment: "/company-admin/project"
        },
        {
            menuId: "2",
            menuTitle: "Project",
            menuUrl: "initiate-project",
            parentSegment: "/company-admin/project"
        }
    ];

    selectedMenu: String = '';
    companyName: string = '';
    viewContent: boolean = false;

    uiLabels: any = {
        secondaryMenuHead: 'Company Operations',
        companyName: "Company Name",
    }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    MOBILE_MENU_IDS = AppConstant.MOBILE_MENU_IDS;

    ngOnInit(): void {


        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.COMPANY_OPERATION_MENU, AppConstant.UI_LABEL_TEXT);

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.COMPANY_OPERATION_MENU;

        this.menuList = this.languageService.getSecondaryMenuList(AppConstant.MENU_ID.DUMPER_ADMIN_MENU_ID);

        if (this.menuList && this.menuList.length > 0) {
            var flag: boolean = this.socketioService.isCompanyAdminNotificationView();

            if (flag) {

                var menu: string = this.socketioService.getNotificationMenu();
                var index = -1;
                for (var i = 0; i < this.menuList.length; i++) {
                    if (this.menuList[i].menuId == menu) {
                        index = i;
                        break;
                    }
                }
                this.selectedMenu = this.menuList[index].menuTitle;
                // this.router.navigate([this.menuList[index].parentSegment, { outlets: { dumperAdminOutlet: [this.menuList[index].menuUrl] } }]);
            }
            else {
                if (this.menuList && this.menuList.length > 0) {
                    this.selectedMenu = this.menuList[0].menuTitle;
                }

                // this.router.navigate([this.menuList[0].parentSegment, { outlets: { dumperAdminOutlet: [this.menuList[0].menuUrl] } }]);

            }
            // this.selectedMenu = this.menuList[0].menuTitle;
            // this.router.navigate([this.menuList[0].parentSegment, { outlets: { dumperAdminOutlet: [this.menuList[0].menuUrl] } }]);

            var companyId: string = this.utilService.getCompanyIdCookie();
            this.getCompanyName(companyId);
        } else {
            this.viewContent = true;
        }


    }



    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    setSelectedMenuName(menu: any) {

        this.selectedMenu = menu.menuTitle;

        this.createScheduleOperationService.setIsRedirectedFromInitiateProjectMenu(false);

        var url: string = '[' + menu.parentSegment + ', { outlets: { dumperAdminOutlet: [' + menu.menuUrl + '] } }]';
        this.router.navigateByUrl(menu.parentSegment, { skipLocationChange: true }).then(() => {
            this.router.navigate([menu.parentSegment, { outlets: { dumperAdminOutlet: [menu.menuUrl] } }]);
        });
    }

    getCompanyName(companyId: string) {
        this.userMangementOperatinService.getCompanyInfo(companyId).subscribe((company) => {
            if (company) {
                this.companyName = company.companyName;
                this.viewContent = true;
            }

        });
    }

}


