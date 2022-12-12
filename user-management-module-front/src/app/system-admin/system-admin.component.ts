import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstant } from '../config/app-constant';
import { SocketioService } from '../services/visitor-services/socketio.service';

@Component({
    selector: 'app-system-admin',
    templateUrl: './system-admin.component.html',
    styleUrls: ['./system-admin.component.css']
})
export class SystemAdminComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private matDialog: MatDialog, private languageService: LanguageService, private router: Router, private readonly route: ActivatedRoute, private socketioService: SocketioService) { }

    hideSecondaryMenu = AppConstant.HIDE_SECONDARY_MENU;
    viewComponent = false;
    menuList: any = [];
    selectedMenu: String = '';

    ngOnInit(): void {
        this.menuList = this.languageService.getSecondaryMenuList(AppConstant.MENU_ID.SYSTEM_ADMIN_MENU_ID);
        if (this.menuList && this.menuList.length > 0) {
            var flag: boolean = this.socketioService.isNotificationViewOrNot();
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
                // this.router.navigate([this.menuList[index].parentSegment, { outlets: { dxrSysAdminOutlet: [this.menuList[index].menuUrl] } }]);

            }
            else {
                if (this.menuList && this.menuList.length > 0) {
                    this.selectedMenu = this.menuList[0].menuTitle;
                    this.router.navigate([this.menuList[0].parentSegment, { outlets: { dxrSysAdminOutlet: [this.menuList[0].menuUrl] } }]);
                }

            }
        }


        this.viewComponent = true;

    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.SYSTEM_ADMIN, AppConstant.UI_LABEL_TEXT);

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    setSelectedMenuName(menuName: String) {
        this.selectedMenu = menuName;
    }



}
