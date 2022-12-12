import { Component, OnInit, Input, Inject } from '@angular/core';
import { BackEndToFrontendConvertFetch, DriverInfoFetch, ProjectStatusUpdate, VehicleInfoFetch } from 'src/app/models/backend-fetch/create-schedule';
import { ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmSchedulePopupComponent } from '../confirm-schedule-popup/confirm-schedule-popup.component';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NotificationSetInfo } from 'src/app/models/backend-fetch/notification';
import { ActionConfirmationPopupComponent } from 'src/app/common-directives/action-confirmation-popup/action-confirmation-popup.component';
@Component({
    selector: 'app-project-trip-schedule',
    templateUrl: './project-trip-schedule.component.html',
    styleUrls: ['./project-trip-schedule.component.css']
})
export class ProjectTripScheduleComponent implements OnInit {

    @Input()
    project!: ProjectInfoFetch;

    @Input()
    row: BackEndToFrontendConvertFetch[] = [];

    @Input()
    dateWiseDisposePickList: any[] = [];

    @Input()
    isScheduleConfirmed!: boolean;

    componentCode!: string;

    isSystemAdmin: boolean = false;
    viewContent: boolean = false;
    isPopup: boolean = false;
    vehicleList: VehicleInfoFetch[] = [];
    driverList: DriverInfoFetch[] = [];
    notificationSetInfo: NotificationSetInfo = {
        contextId: "",
        companyId: "",
        baseTableId: "",
        trigerUserInfoId: "",
        status: {
            id: "",
            titleEng: "",
            titleJpn: ""
        }
    }

    projectScheduleConfirmDone = AppConstant.PROJECT_SCHEDULE_CONFIRM_DONE;
    projectScheduleConfirmNotDone = AppConstant.PROJECT_SCHEDULE_CONFIRM_NOT_DONE;

    disposeWiseScheduleConfirmDone = AppConstant.DISPOSE_WISE_SCHEDULE_CONFIRM_DONE;
    disposeWiseScheduleConfirmNotDone = AppConstant.DISPOSE_WISE_SCHEDULE_CONFIRM_NOT_DONE;


    transporterCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.TRANSPOTER_CATEGORY_VALUE_ID);
    transportPartnerCompanyId: string = "";

    constructor(private createScheduleOperationService: CreateScheduleOperationService, private matDialog: MatDialog, private utilService: UtilService, private languageService: LanguageService, private breakpointObserver: BreakpointObserver, public dialogRef: MatDialogRef<ProjectTripScheduleComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.PROJECT_TRIP_SCHEDULE_TAB, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.PROJECT_TRIP_SCHEDULE_TAB;

        if (this.data && this.data.checkValue) {
            this.project = this.data.projectInfo;
            this.isPopup = this.data.checkValue;

            if (this.project && this.project.wasteDisposalInfo) {

                this.transportPartnerCompanyId = this.createScheduleOperationService.getTrasnporterCompanyId(this.project);

                this.getVehicleList();

            }
        }
    }
    getVehicleList() {
        this.createScheduleOperationService.getVehicleList(this.transportPartnerCompanyId).subscribe((data) => {

            if (data) {
                this.vehicleList = data;

            }
            this.getDriverList()
        });
    }
    getDriverList() {
        this.createScheduleOperationService.getDriverList(this.transportPartnerCompanyId).subscribe((data) => {

            if (data) {
                this.driverList = data;
                this.project = this.createScheduleOperationService.prepareDisposalWisePickView(this.project, this.driverList, this.vehicleList);
                this.dateWiseDisposePickList = this.createScheduleOperationService.groupDisposepickByDate(this.project.wasteDisposalInfo);
                this.project.wasteDisposalInfo = this.createScheduleOperationService.prepareDisposalViewId(this.project.wasteDisposalInfo);
            }

            this.viewContent = true;

        });
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
        driverName: "Driver Name",
        tripSchedule: "Trip Schedule",
        confirmScheduleBtn: "Confirm Schedule"
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    onClickConfirmationBtn(project: ProjectInfoFetch) {

        const confirmationDialog = this.matDialog.open(ActionConfirmationPopupComponent, {
            width: '500px',
            height: '300px',
            data: {
                header: this.uiLabels.header,
                message: this.uiLabels.message,
                confirmButtonLabel: this.uiLabels.confirmButtonLabel,
                cancelButtonLabel: this.uiLabels.cancelButtonLabel
            }
        });

        confirmationDialog.afterClosed().subscribe(response => {
            if (response) {
                var projectStatusUpdate: ProjectStatusUpdate = {
                    projectInfoId: project.projectInfoId,
                    status: AppConstant.PROJECT_SCHEDULE_CONFIRM_DONE
                }

                this.createScheduleOperationService.updateProjectStatus(projectStatusUpdate).subscribe((data) => {

                    if (data == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {

                        this.saveNotification(projectStatusUpdate.projectInfoId);
                        this.utilService.showSnackbar(this.uiLabels.scheduleConfirmToast, 3000);

                        this.project.projectScheduleStatus = data;
                    }

                });
            }
        });

    }
    saveNotification(projectId: string) {

        this.notificationSetInfo.baseTableId = projectId;
        this.notificationSetInfo.contextId = AppConstant.PROJECT_SCHEDULE_NOTIFICAIONT_ID;
        this.notificationSetInfo.companyId = this.utilService.getCompanyIdCookie();
        this.notificationSetInfo.trigerUserInfoId = this.utilService.getUserIdCookie();
        this.createScheduleOperationService.sendNotification(this.notificationSetInfo).subscribe(data => {

        })
    }
}



