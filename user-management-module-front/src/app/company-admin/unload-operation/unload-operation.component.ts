import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { LoadUnloadService } from 'src/app/services/operation-services/load-unload.service';
import { RedirectUserInfo } from 'src/app/models/backend-fetch/load-unload';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-unload-operation',
    templateUrl: './unload-operation.component.html',
    styleUrls: ['./unload-operation.component.css']
})
export class UnloadOperationComponent implements OnInit {

    constructor(private loadUnloadService: LoadUnloadService, private breakpointObserver: BreakpointObserver, private utilService: UtilService, private languageService: LanguageService) { }

    viewComponent = false;
    componentCode: string = AppConstant.COMP.UNLOAD_MENU;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    uiLabels: any = {
        pageHeader: 'Unload Operation',
        openScannerBtn: 'Open Scanner'
    }

    ngOnInit(): void {
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    openScanner() {
        this.loadUnloadService.redirectToUnloadOp();

        // var redirectUserInfo: RedirectUserInfo = {
        //     redirectSessionId: this.utilService.generateUniqueId(),
        //     userId: this.utilService.getUserIdCookie(),
        //     userAuth: this.utilService.getUserAuthPassCookie(),
        //     companyId: this.utilService.getCompanyIdCookie(),
        //     tripQrData: '',
        //     redirectMenuUrlParentSegment: AppConstant.PROCESSOR_MOBILE_MENU_REDIRECT_INFO.parentSegment,
        //     redirectMenuUrl: AppConstant.PROCESSOR_MOBILE_MENU_REDIRECT_INFO.url,
        //     redirectMenuOutlet: AppConstant.PROCESSOR_MOBILE_MENU_REDIRECT_INFO.outlet,
        //     userMenuAccess: JSON.stringify(this.languageService.getUserAccessInfo()),
        //     selectedDate: '',
        //     langIndex: this.utilService.getSelectedLanguageIndex()
        // }

        // this.loadUnloadService.setMobileAppRedirectInfo(redirectUserInfo).subscribe(response => {
        //     if (response) {
        //         // setTimeout(() => window.open(environment.MOBILE_APP_BASE_URL.concat(redirectUserInfo.redirectSessionId), '_blank'), 10);
        //         window.open(environment.MOBILE_APP_BASE_URL.concat(redirectUserInfo.redirectSessionId), '_blank');
        //     }
        // })

    }


}
