import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from '../config/app-constant';

@Component({
    selector: 'app-dumper-admin',
    templateUrl: './dumper-admin.component.html',
    styleUrls: ['./dumper-admin.component.css']
})
export class DumperAdminComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private router: Router, private route: ActivatedRoute) { }

    menuList: any = []

    //     [
    //     {
    //         menuId: "businessAgreement",
    //         menuTitle: "Business Agreement",
    //         menuUrl: "business-agreement",
    //         parentSegment: "/dumper-admin",
    //     },

    // ];
    selectedMenu: String = '';
    ngOnInit(): void {

        this.menuList = this.languageService.getSecondaryMenuList(AppConstant.MENU_ID.DUMPER_ADMIN_MENU_ID);
        this.selectedMenu = this.menuList[0].menuTitle;
        this.router.navigate([this.menuList[0].parentSegment, { outlets: { companyAdminOutlet: [this.menuList[0].menuUrl] } }]);
    }

    uiLabels: any = {
        secondaryMenuHead: 'Company Admin'
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    setSelectedMenuName(menuName: String) {
        this.selectedMenu = menuName;
    }

}
