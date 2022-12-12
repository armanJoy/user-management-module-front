import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, CompanyTripFetch, DriverTripPlan, PickInfo } from 'src/app/models/backend-fetch/load-unload';
import { LoadUnloadService } from 'src/app/services/operation-services/load-unload.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-trip-confirm-dashboard',
    templateUrl: './trip-confirm-dashboard.component.html',
    styleUrls: ['./trip-confirm-dashboard.component.css']
})
export class TripConfirmDashboardComponent implements OnInit {

    constructor(private loadUnloadService: LoadUnloadService, private breakpointObserver: BreakpointObserver, private utilService: UtilService, private languageService: LanguageService) { }

    viewComponent = false;
    componentCode: string = AppConstant.COMP.TRIP_CONFIRMATION_DASHBOARD;
    isSystemAdmin: boolean = this.utilService.languageEditMode();

    pickStatusLoaded = AppConstant.PICK_STATUS_LOADED;
    pickStatusUnloaded = AppConstant.PICK_STATUS_UNLOADED;

    uiLabels: any = {
        pageHeader: "Trip Confirmation Dashboard",
        dateLabel: "Trip Date",
        loadTripList: "Load Trip List",

    }

    driverTripPlan: DriverTripPlan[] = [];
    tripDate: any = {
        date: this.utilService.getCurrentDate()
    };
    driverUserId: string = '';
    companyId: string = this.utilService.getCompanyIdCookie();
    currentCompanyInfo!: CompanyInfo;

    loadConfirmPicks = new Map<string, boolean | undefined>();
    loadConfirmTrips = new Set<DriverTripPlan>();
    unloadConfirmPicks = new Set<PickInfo>();
    unloadConfirmTrips = new Set<DriverTripPlan>();

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.TRIP_CONFIRMATION_DASHBOARD;

        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.prepareInitialView();
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    prepareInitialView() {
        this.loadUnloadService.getCurrentDate().subscribe(response => {
            if (response) {
                this.tripDate.date = response.date;

            }

            this.getCompanyTripPlan(this.tripDate.date);
        });
    }

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
        this.loadConfirmPicks.clear();
        this.loadConfirmTrips.clear();
    }

    confirmPickLoad = (confirmedPick: Map<string, boolean | undefined>, loadConfirmTrips: DriverTripPlan[], callBack: any) => {
        // this.loadUnloadService.confirmHandover(confirmedPick.map(item => item.pickId),)
        var confirmedPicks: string[] = [];
        if (confirmedPick && confirmedPick.size > 0) {
            const keys: string[] = [...confirmedPick.keys()];
            const length: number = keys.length;
            var callBackCounter = 0;
            keys.forEach(eachPickId => {
                const isManifestoTrip: boolean = (confirmedPick.get(eachPickId)) ? true : false;
                const picks: string[] = [];
                picks.push(eachPickId);
                this.loadUnloadService.confirmHandover(picks, isManifestoTrip).subscribe(response => {

                    if (response) {
                        confirmedPicks.push(...response.map(item => item.pickId));
                    }
                    callBackCounter++;

                    if (callBackCounter == length) {
                        this.generateMenifestoForConfirmedTrips(loadConfirmTrips, callBack, confirmedPicks);
                    }
                })
            });
        } else if (loadConfirmTrips) {
            this.generateMenifestoForConfirmedTrips(loadConfirmTrips, callBack, confirmedPicks);
        }


    }

    generateMenifestoForConfirmedTrips(loadConfirmTrips: DriverTripPlan[], callBack: any, confirmedPicks: string[]) {
        var callBackCounter: number = 0;
        if (loadConfirmTrips) {
            loadConfirmTrips.forEach(eachTrip => {
                this.loadUnloadService.generateManifestoForTrip(eachTrip).subscribe(response => {
                    callBackCounter++;

                    if (callBackCounter == loadConfirmTrips.length) {
                        callBack(confirmedPicks);
                    }
                });
            })
        } else {
            callBack(confirmedPicks);
        }
    }

}
