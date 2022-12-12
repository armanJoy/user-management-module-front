import { Component, OnInit, Input } from '@angular/core';
import { VehicleInfoFetch, TripPlanFetch } from 'src/app/models/backend-fetch/create-schedule';
import { DisposalInfoFetch, ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectInfoTabComponent } from '../project-info-tab/project-info-tab.component';
import { ProjectTripScheduleComponent } from '../project-trip-schedule/project-trip-schedule.component';
@Component({
    selector: 'app-schedule-dashboard-tab',
    templateUrl: './schedule-dashboard-tab.component.html',
    styleUrls: ['./schedule-dashboard-tab.component.css']
})
export class ScheduleDashboardTabComponent implements OnInit {

    @Input()
    isRedirecteView!: boolean;

    @Input()
    public switchTabToVehicleTripSchedule!: (index: number, disposal: DisposalInfoFetch) => void;

    @Input()
    companyId!: string;

    @Input()
    public projectListView!: () => void;

    @Input()
    isWastePickScheduleView!: boolean;


    @Input()
    projectList!: ProjectInfoFetch[];
    @Input()
    project!: ProjectInfoFetch;
    @Input()
    public selectTab!: (index: number, projectInfo: ProjectInfoFetch, callBack?: any) => void;
    @Input()
    public search!: (companyId: string, pageNo: number, searchText: string) => void;

    @Input()
    isLoadMenuAvailable!: boolean;

    @Input()
    isUnloadMenuAvailable!: boolean;

    @Input()
    public redirectToLoadMenu!: () => void;

    @Input()
    public redirectToUnloadMenu!: () => void;

    dumperCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.DUMPER_CATEGORY_VALUE_ID);
    transporterCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.TRANSPOTER_CATEGORY_VALUE_ID);
    processorCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.PROCESSOR_CATEGORY_VALUE_ID);
    componentCode!: string;
    isSystemAdmin: boolean = false;
    isPopup: boolean = true;
    totalPage: number = 0;
    pageSize: number = AppConstant.DXR_LIST_VIEW_PAGE_SIZE;
    dataEndsLabel: string = AppConstant.Data_Ends_Label;

    projectScheduleConfirmDone = AppConstant.PROJECT_SCHEDULE_CONFIRM_DONE;
    projectScheduleConfirmNotDone = AppConstant.PROJECT_SCHEDULE_CONFIRM_NOT_DONE;

    disposeWiseScheduleConfirmDone = AppConstant.DISPOSE_WISE_SCHEDULE_CONFIRM_DONE;
    disposeWiseScheduleConfirmNotDone = AppConstant.DISPOSE_WISE_SCHEDULE_CONFIRM_NOT_DONE;

    constructor(private matDialog: MatDialog, private languageService: LanguageService, private breakpointObserver: BreakpointObserver, private utilService: UtilService) { }
    uiLabels: any = {
        initiator: " (Initiator)",
        title: "Project List",
        createProjectBtn: "Create Project",
        projectTitle: "Project Title",
        projectCreationDate: "Project Creation Date",
        viewBtn: "View",
        projectStartDate: "Project Start Date",
        projectEndDate: "Project End Date",
        copyBtn: "Copy",
        oparatingBranch: "Oparating Branch",
        status: "Status",
        editBtn: "Edit",
        wasteItem: "Waste Item",
        businessPartner: "Business Partner",
        transporter: "Transporter",
        dumper: "Dumper",
        processor: "Processor",
        createTripPlanBtn: "Create Trip Plan",
        processScheduleBtn: "Process Schedule",
        wasteQuantity: "Waste Quantity"

    }
    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.SCHEDULE_DASHBOARD_TAB, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SCHEDULE_DASHBOARD_TAB;
    }

    searchByText() {
        var pageNo: number = JSON.parse(JSON.stringify(this.utilService.getPageNo()));
        var searchText: string = JSON.parse(JSON.stringify(this.utilService.getSearchText()));
        var companyId: string = this.utilService.getCompanyIdCookie();

        if (!searchText) {
            searchText = '';
        }

        if (!pageNo) {
            pageNo = 0;
        }

        this.search(companyId, pageNo, searchText);
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    tabChangeForSelectedProject(projectInfo: ProjectInfoFetch) {
        this.selectTab(1, projectInfo);
    }

    tabChangeForProjectTripSchedule(projectInfo: ProjectInfoFetch) {
        this.selectTab(3, projectInfo);
    }
    onClickViewBtn(projectInfo: ProjectInfoFetch) {
        // 
        // this.selectTab(0, projectInfo, () => {
        //     const dialogRef = this.matDialog.open(ProjectInfoTabComponent, {
        //         width: '75%',
        //         data: {
        //             projectInfo: this.project,
        //             checkValue: this.isPopup
        //         }
        //         // disableClose: true
        //     });
        // });


        this.selectTab(0, projectInfo, () => {


            const dialogRef = this.matDialog.open(ProjectTripScheduleComponent, {
                width: '75%',
                data: {
                    projectInfo: this.project,
                    checkValue: this.isPopup,
                    viewContent: false
                }
                // disableClose: true
            });
        });


    }

}
