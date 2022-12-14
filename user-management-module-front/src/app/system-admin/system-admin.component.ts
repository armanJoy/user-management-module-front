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

    hideSecondaryMenu = true;
    viewComponent = false;
    menuList: any = [];
    selectedMenu: String = '';

    ngOnInit(): void {



        this.viewComponent = true;

    }

    uiLabels: any = {}

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    setSelectedMenuName(menuName: String) {
        this.selectedMenu = menuName;
    }



}
