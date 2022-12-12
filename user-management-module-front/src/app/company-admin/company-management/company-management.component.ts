import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from 'src/app/config/app-constant';

@Component({
    selector: 'app-company-management',
    templateUrl: './company-management.component.html',
    styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private router: Router, private readonly route: ActivatedRoute) { }

    hideSecondaryMenu = AppConstant.HIDE_SECONDARY_MENU;

    menuList: any = [];

    selectedMenu: String = '';
    componentCode: string = AppConstant.COMP.COMPANY_MANAGEMENT_MENU;

    viewComponent: boolean = false;

    ngOnInit(): void {

        this.menuList = this.languageService.getSecondaryMenuList(AppConstant.MENU_ID.COMPANY_MANAGEMENT_MENU_ID);
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.COMPANY_MANAGEMENT_MENU, AppConstant.UI_LABEL_TEXT);

        if (this.menuList && this.menuList.length > 0) {
            this.selectedMenu = this.menuList[0].menuTitle;

            // this.router.navigate([this.menuList[0].parentSegment, { outlets: { companyAdminOutlet: [this.menuList[0].menuUrl] } }]);
        }
        this.viewComponent = true;
    }

    uiLabels: any = {};
    //     = {
    //     secondaryMenuHead: 'Company Management'
    // }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    setSelectedMenuName(menuName: String) {
        this.selectedMenu = menuName;
    }

}
