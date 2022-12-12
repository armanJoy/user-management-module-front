import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { LoadUnloadService } from 'src/app/services/operation-services/load-unload.service';
import { CompanyInfo, CompanyTripFetch, DriverTripPlan } from 'src/app/models/backend-fetch/load-unload';

@Component({
    selector: 'app-load-operation',
    templateUrl: './load-operation.component.html',
    styleUrls: ['./load-operation.component.css']
})
export class LoadOperationComponent implements OnInit {

    constructor(private loadUnloadService: LoadUnloadService, private breakpointObserver: BreakpointObserver, private utilService: UtilService, private languageService: LanguageService) { }

    viewComponent = false;
    componentCode: string = AppConstant.COMP.LOAD_MENU;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    pickStatusLoaded = AppConstant.PICK_STATUS_LOADED;
    pickStatusUnloaded = AppConstant.PICK_STATUS_UNLOADED;

    uiLabels: any = {
        pageHeader: "Trip Dashboard",
        dateLabel: "Trip Date",
        loadTripList: "Load Trip List",
        tripList: "Trip List",
        tripTime: "Trip Time",
        pickListButton: "Pick List",
        driverName: "Driver Name",
        projectTitle: "Project Title",
        pick: "Pick",
        pickQuantity: "Quantity",
        pickStatusLoaded: "Loaded",
        loadButton: "Load"
    }

    driverTripPlan: DriverTripPlan[] = [];
    tripDate: any = {
        date: this.utilService.getCurrentDate()
    };
    driverUserId: string = '';
    companyId: string = this.utilService.getCompanyIdCookie();
    currentCompanyInfo!: CompanyInfo;

    ngOnInit(): void {
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.prepareInitialView();

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    prepareInitialView() {
        this.loadUnloadService.getCurrentDate().subscribe(response => {
            if (response) {
                this.tripDate.date = response.date;

            }

            this.getCompanyTripPlan(this.tripDate.date);
        });
    }

    // getOwnCompanyInfo() {
    //     this.loadUnloadService.getPartnerCompanyInfo(this.companyId).subscribe(response => {
    //         if (response) {
    //             this.currentCompanyInfo = response;
    //         }
    //     });
    // }

    getCompanyTripPlan(date: string) {

        var driverTripFetch: CompanyTripFetch = {
            date: date,
            companyId: this.companyId
        }

        this.loadUnloadService.getCompanyTrip(driverTripFetch).subscribe(data => {
            if (data) {
                this.driverTripPlan = data;
            }
            this.viewComponent = true;

        });
    }

    loadPick = (selectedTrip: DriverTripPlan, selectedPickIndex: number) => {
        this.loadUnloadService.loadPick(selectedTrip, selectedPickIndex, this.tripDate.date);

        // var qrData: TripQrData = {
        //     tripInfoId: selectedTrip.tripInfoId,
        //     pickLocation: selectedTrip.pickList[selectedPickIndex].disposalInfo.pickZipCode + ', ' + selectedTrip.pickList[selectedPickIndex].disposalInfo.pickLocation,
        //     driverCompanyId: selectedTrip.vehicleInfo.companyId,
        //     driverId: selectedTrip.driverId,
        // }

        // this.loadUnloadService.getEnglishFormatDate(this.tripDate.date).subscribe(response => {
        //     if (response) {
        //         var redirectUserInfo: RedirectUserInfo = {
        //             redirectSessionId: this.utilService.generateUniqueId(),
        //             userId: this.utilService.getUserIdCookie(),
        //             userAuth: this.utilService.getUserAuthPassCookie(),
        //             companyId: this.utilService.getCompanyIdCookie(),
        //             tripQrData: JSON.stringify(qrData),
        //             redirectMenuUrlParentSegment: AppConstant.DUMPER_MOBILE_MENU_REDIRECT_INFO.parentSegment,
        //             redirectMenuUrl: AppConstant.DUMPER_MOBILE_MENU_REDIRECT_INFO.url,
        //             redirectMenuOutlet: AppConstant.DUMPER_MOBILE_MENU_REDIRECT_INFO.outlet,
        //             userMenuAccess: JSON.stringify(this.languageService.getUserAccessInfo()),
        //             selectedDate: response.date,
        //             langIndex: this.utilService.getSelectedLanguageIndex()
        //         }

        //         this.loadUnloadService.setMobileAppRedirectInfo(redirectUserInfo).subscribe(response => {
        //             if (response) {

        //                 // setTimeout(() => window.open(environment.MOBILE_APP_BASE_URL.concat(redirectUserInfo.redirectSessionId), '_blank'), 10)
        //                 window.open(environment.MOBILE_APP_BASE_URL.concat(redirectUserInfo.redirectSessionId), '_blank');

        //             }
        //         });
        //     }
        // })

    }
}
