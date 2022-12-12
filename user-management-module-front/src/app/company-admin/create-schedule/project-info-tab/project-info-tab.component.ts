import { Component, OnInit, Input, Inject } from '@angular/core';
import { VehicleInfoFetch, TripPlanFetch, DriverInfoFetch, DisposeWisePickInfo } from 'src/app/models/backend-fetch/create-schedule';
import { DisposalInfoFetch, ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
@Component({
    selector: 'app-project-info-tab',
    templateUrl: './project-info-tab.component.html',
    styleUrls: ['./project-info-tab.component.css']
})
export class ProjectInfoTabComponent implements OnInit {

    @Input()
    hideTitleBar!: boolean;

    @Input()
    project!: ProjectInfoFetch;

    @Input()
    public selectTab!: (index: number, disposal: DisposalInfoFetch) => void;

    @Input()
    companyId!: string;

    @Input()
    isViewPopup: boolean = false;

    @Input()
    public projectListView!: () => void;

    @Input()
    isRedirecteView!: boolean;

    componentCode!: string;
    isSystemAdmin: boolean = false;
    checkValue: boolean = false;
    isViewContent: boolean = false;

    constructor(private createScheduleOperationService: CreateScheduleOperationService,
        private utilService: UtilService, private languageService: LanguageService, private breakpointObserver: BreakpointObserver, public dialogRef: MatDialogRef<ProjectInfoTabComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {

        this.companyId = this.utilService.getCompanyIdCookie();
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.PROJECT_INFO_TAB, AppConstant.UI_LABEL_TEXT);

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.PROJECT_INFO_TAB;

        if (this.data && this.data.projectInfo) {
            this.project = this.data.projectInfo;
            this.checkValue = this.data.checkValue;
            this.isViewContent = true;
        }
        if (!this.checkValue || this.isViewPopup) {
            this.isViewContent = true;
        }

    }
    uiLabels: any = {
        title: "Project Information",
        createProjectBtn: "Create Project",
        projectTitle: "Project Title",
        projectCreationDate: "Project Creation Date",
        viewBtn: "View",
        projectStartDate: "Project Start Date",
        projectEndDate: "Project End Date",
        copyBtn: "Copy",
        oparatingBranch: "Oparating Branch",
        pickQuantity: "Pick Quantity",
        wasteItem: "Waste Item",
        disposalId: "Disposal Id",
        pickLocation: "Pick Location",
        dropLocation: "Drop Location",
        totalQuantity: "Total Quantity",
        planedQuantity: "Planed Quantity",
        remainingQuantity: "Remaining Quantity",
        vehicleName: "Vehicle Name",
        vehiclLicenseNo: "Vehicl License No",
        capacity: "Capacity",
        loadedQuantity: "Loaded Quantity",
        tripPlanBtn: "Trip Plan",
        date: "Date",
        from: "From",
        to: "To",
        pickNo: "Pick No",
        driverName: "Driver Name"
    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }
    onClickTripPlanButton(disposal: DisposalInfoFetch) {
        this.selectTab(2, disposal);

    }
    onClickProjectListBtn() {
        this.projectListView();
    }


}
