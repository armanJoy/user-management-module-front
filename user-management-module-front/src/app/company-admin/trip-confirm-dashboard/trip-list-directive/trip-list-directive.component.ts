import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { LoadUnloadService } from 'src/app/services/operation-services/load-unload.service';
import { DriverTripPlan, PickInfo } from 'src/app/models/backend-fetch/load-unload';
import { MenifestoService } from 'src/app/services/operation-services/menifesto.service';

@Component({
    selector: 'app-trip-list-directive',
    templateUrl: './trip-list-directive.component.html',
    styleUrls: ['./trip-list-directive.component.css']
})
export class TripListDirectiveComponent implements OnInit {

    @Input()
    isTripConfirmation: boolean = false;

    @Input()
    driverTripPlan: DriverTripPlan[] = [];

    @Input()
    loadPick!: (selectedTrip: DriverTripPlan, selectedPickIndex: number) => void;

    @Input()
    loadConfirmPicks: Map<string, boolean | undefined> = new Map<string, boolean | undefined>();

    @Input()
    loadConfirmTrips: Set<DriverTripPlan> = new Set<DriverTripPlan>();

    @Input()
    unloadConfirmPicks!: Set<PickInfo>;

    @Input()
    confirmPickLoad!: (confirmedPick: Map<string, boolean | undefined>, loadConfirmTrips: DriverTripPlan[], callBack: any) => void;

    constructor(private loadUnloadService: LoadUnloadService, private breakpointObserver: BreakpointObserver, private utilService: UtilService, private languageService: LanguageService, private manifestoService: MenifestoService) { }

    viewContent: boolean = false;
    uiLabels: any = {};
    componentCode: string = AppConstant.COMP.LOAD_MENU;
    isSystemAdmin: boolean = this.utilService.languageEditMode();
    pickStatusLoaded = AppConstant.PICK_STATUS_LOADED;
    pickStatusUnloaded = AppConstant.PICK_STATUS_UNLOADED;

    ngOnInit() {
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    onLoadClick(pick: PickInfo, trip: DriverTripPlan, loadCheckBox: any, event: any) {

        if (pick.loadStatus >= this.pickStatusLoaded) {
            this.utilService.stopEventPropagation(event);
            return;
        }

        if (!loadCheckBox.checked) {
            this.loadConfirmPicks.set(pick.pickId, trip.isManualManifestoTrip);
            this.loadConfirmTrips.add(trip);
        } else {
            this.loadConfirmPicks.delete(pick.pickId);
        }
    }

    onUnloadClick(pick: PickInfo, trip: DriverTripPlan, $event: any) {
        if (pick.loadStatus >= this.pickStatusUnloaded || this.utilService.showLoadButton() || (!this.utilService.showLoadButton() && !this.utilService.showUnloadButton())) {
            this.utilService.stopEventPropagation($event);
            return;
        }

        ($event.checked) ? this.unloadConfirmPicks.add(pick) : this.unloadConfirmPicks.delete(pick);
    }

    confirmPicks() {

        // if (this.utilService.showUnloadButton() || (!this.utilService.showLoadButton() && !this.utilService.showUnloadButton())) {
        this.confirmPickLoad(this.loadConfirmPicks, [...this.loadConfirmTrips], (confirmedPicks: string[]) => {
            this.updatePicksLoadStatus(confirmedPicks);
        });
        // }
    }

    updatePicksLoadStatus(confirmedPicks: string[]) {
        if (this.driverTripPlan) {
            this.driverTripPlan.forEach(eachTrip => {
                if (eachTrip.pickList) {
                    eachTrip.pickList.forEach(eachPick => {
                        eachPick.loadStatus = (confirmedPicks.includes(eachPick.pickId)) ? AppConstant.PICK_STATUS_LOADED : eachPick.loadStatus;
                    })
                }
            })
        }

        this.loadConfirmPicks.clear();
        this.loadConfirmTrips.clear();
    }

    printManifesto(pickId: string, isManifestoTrip: boolean | undefined) {

        this.manifestoService.getManifestoAndReportByPickId(pickId, (isManifestoTrip) ? true : false);
    }
}
