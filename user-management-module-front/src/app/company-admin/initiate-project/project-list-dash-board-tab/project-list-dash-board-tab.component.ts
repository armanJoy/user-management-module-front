import { Component, OnInit, Input } from '@angular/core';
import { AgreementInfoFetch, ProjectFilter, ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { CreateNewProjectTabComponent } from '../create-new-project-tab/create-new-project-tab.component';
import { Router } from '@angular/router';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
import { ProjectTripScheduleComponent } from '../../create-schedule/project-trip-schedule/project-trip-schedule.component';
import { SocketioService } from 'src/app/services/visitor-services/socketio.service';
import { InitiateProjectOperationService } from 'src/app/services/operation-services/initiate-project-operation.service';
import { MenifestoService } from 'src/app/services/operation-services/menifesto.service';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';
import { AppComponent } from 'src/app/app.component';
import { LoadUnloadService } from 'src/app/services/operation-services/load-unload.service';
import { DriverTripPlan } from 'src/app/models/backend-fetch/load-unload';
import { GasolineCo2EmissionInfo } from 'src/app/models/backend-fetch/carbon-emmition';
import { MenifestoInfo } from 'src/app/models/backend-fetch/menifesto';

@Component({
    selector: 'app-project-list-dash-board-tab',
    templateUrl: './project-list-dash-board-tab.component.html',
    styleUrls: ['./project-list-dash-board-tab.component.css']
})
export class ProjectListDashBoardTabComponent implements OnInit {

    @Input()
    projectProcessDef: any[] = [];

    @Input()
    companyId!: string;

    @Input()
    projectList!: ProjectInfoFetch[];

    @Input()
    public selectTab!: (index: number, project: ProjectInfoFetch, flag: boolean, selectedProcess?: any) => void;

    @Input()
    public search!: (companyId: string, pageNo: number, searchText: string, status: string, flag: boolean, callBack: any) => void;

    @Input()
    companyName!: string;

    @Input()
    selectedOperationFilter!: ProjectFilter;

    @Input()
    filterItems!: any[];

    @Input()
    showProgressBar: boolean = false;

    constructor(private breakpointObserver: BreakpointObserver, private utilService: UtilService, private matDialog: MatDialog, private languageService: LanguageService, private router: Router, private createScheduleOperationService: CreateScheduleOperationService, private socketioService: SocketioService, private initiateProjectOperationService: InitiateProjectOperationService, private menifestoService: MenifestoService, private appComponent: AppComponent, private loadUnloadService: LoadUnloadService) { }

    menuList: string = JSON.stringify(this.languageService.getUserMenuList());

    inOperationFilterId: string = AppConstant.PROJECT_STATUS_IN_USE;

    statusFilterModel: string = (this.utilService.showLoadButton() || this.utilService.showUnloadButton()) ? AppConstant.LOAD_UNLOAD_FILTER_DEF.statusId : AppConstant.PROJECT_STATUS_NEW;

    hideProjectOperationFilterDropdown = AppConstant.HIDE_PROJECT_OPERATION_FILTER_DROPDOWN;

    dumperCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.DUMPER_CATEGORY_VALUE_ID);
    transporterCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.TRANSPOTER_CATEGORY_VALUE_ID);
    processorCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.PROCESSOR_CATEGORY_VALUE_ID);

    componentCode!: string;
    newStatusTitle: any = "";
    isSystemAdmin: boolean = false;
    totalPage: number = 0;
    pageSize: number = AppConstant.DXR_LIST_VIEW_PAGE_SIZE;
    dataEndsLabel: string = AppConstant.Data_Ends_Label;
    processCompilationMenuId: string = "";
    isRedirectToProcessCompeletion: boolean = false;
    statusTemporaryUse = AppConstant.SUBSCRIPTION_TEMPORARY_COMPANY_STATUS;

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.PROJECT_LIST_DASH_BOARD_TAB_COMPONENT, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.PROJECT_LIST_DASH_BOARD_TAB_COMPONENT;

        this.newStatusTitle = (this.selectedOperationFilter.statusList.find(item => item.statusId == "statusNewProject")?.statusTitle);
        this.newProjectInfo.status.statusName = this.newStatusTitle;

        this.statusFilterModel = this.selectedOperationFilter.statusList[0].statusId;
    }

    showLoadOpDirective() {
        return (this.statusFilterModel == AppConstant.LOAD_UNLOAD_FILTER_DEF.statusId && this.utilService.showLoadButton());
    }

    showUnloadOpDirective() {
        return (this.statusFilterModel == AppConstant.LOAD_UNLOAD_FILTER_DEF.statusId && this.utilService.showUnloadButton());
    }

    showTripConfirmationDashboardDirective() {
        return (this.statusFilterModel == AppConstant.TRIP_CONFIRMATION_DASHBOARD_FILTER_DEF.statusId && true);
    }


    searchByText() {

        if (this.statusFilterModel != AppConstant.LOAD_UNLOAD_FILTER_DEF.statusId && this.statusFilterModel != AppConstant.TRIP_CONFIRMATION_DASHBOARD_FILTER_DEF.statusId) {

            this.showProgressBar = true;

            this.selectedOperationFilter.statusList.forEach(each => {
                each.isSelected = (each.statusId == this.statusFilterModel) ? true : false;
            })

            var status: string = this.statusFilterModel;
            var companyId: string = this.utilService.getCompanyIdCookie();
            var pageNo: number = JSON.parse(JSON.stringify(this.utilService.getPageNo()));
            var searchText: string = JSON.parse(JSON.stringify(this.utilService.getSearchText()));

            if (!searchText) {
                searchText = '';
            }

            if (!pageNo) {
                pageNo = 0;
            }

            this.search(companyId, pageNo, searchText, status, true, () => {
                debugger
                this.showProgressBar = false;
            });
        }



    }

    getProjectBasicInfo(event: any, projectInfo: ProjectInfoFetch, panel?: any) {

        if (!projectInfo.isBasicInfoFetched) {
            this.initiateProjectOperationService.getProjectBasicInfo(projectInfo.projectInfoId).subscribe(response => {
                if (response) {
                    var index = this.projectList.findIndex(item => item.projectInfoId == projectInfo.projectInfoId);

                    if (index >= 0) {
                        this.initiateProjectOperationService.prepareProjectViewModel(response, this.projectProcessDef, this.companyId, false, (preparedProject: ProjectInfoFetch) => {

                            this.getProjectManifesto(projectInfo, (manifesto: MenifestoInfo[]) => {
                                if (manifesto) {
                                    preparedProject.manifestoList = manifesto;
                                } else {
                                    preparedProject.manifestoList = [];
                                }
                            });

                            this.projectList[index] = preparedProject;
                            preparedProject.isOpen = (projectInfo.isOpen) ? false : true;
                            preparedProject.isBasicInfoFetched = true;
                        });


                    }
                }
            })
        } else {
            projectInfo.isOpen = (projectInfo.isOpen) ? false : true;
        }
    }

    getProjectManifesto(projectInfo: ProjectInfoFetch, callBack: any) {
        this.menifestoService.getMenifestoInfoByProject(projectInfo.projectInfoId).subscribe(response => {
            if (response) {
                projectInfo.manifestoList = response;
            }
            callBack(response);
        })
    }

    uiLabels: any = {
        createScheduleButton: "Create Schedule",
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
        filterLabel: "Filter"
    }

    newProjectInfo: ProjectInfoFetch = {
        companyCategorySelection: [],
        initiatorCompanyName: "",
        projectScheduleStatus: "",
        operatingOfficeName: "",
        operatingOfficeId: "",
        operatingAddress: "",
        operatingZipCode: "",
        companyId: "",
        projectInfoId: "",
        projectTitle: "",
        projectCreationDate: "",
        projectStartDate: "",
        projectEndDate: "",
        projectCreationDateView: "",
        projectStartDateView: "",
        projectEndDateView: "",
        operatingBranch: {
            companyId: "",
            branchId: "",
            branchName: "",
            zipcode: "",
            branchAddress: "",
            branchContactNo: "",
            branchInchargeName: "",
            branchBusinessCategory: [],
            remark: "",
        },
        status: {
            statusId: "Status001",
            statusCode: "",
            statusName: this.newStatusTitle,
            statusDescription: "",
        },
        dumperPartner: {
            companyInfoId: "",
            companyName: "",
            personIncharge: "",
            personInchargeEmail: "",
            assignRoles: ""
        },
        processorPartner: {
            companyInfoId: "",
            companyName: "",
            personIncharge: "",
            personInchargeEmail: "",
            assignRoles: ""
        },
        transporterPartner: {
            companyInfoId: "",
            companyName: " ",
            personIncharge: "",
            personInchargeEmail: "",
            assignRoles: ""
        },
        wasteItemList: [],
        agreementInfo: [],
        wastePickInfo: [],
        wasteProcessInfo: [],
        wasteDisposalInfo: [],
        processsList: [],
        isApproveRequiredState: false,
        isTransporter: false,
        isBasicInfoFetched: false,
        isOpen: false,
        manifestoList: [],
        remarks: ''
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    viewSchedulePopupOpen = (projectInfo: ProjectInfoFetch) => {

        this.initiateProjectOperationService.getProjectInfo(projectInfo.projectInfoId).subscribe(project => {
            if (project) {
                if (project.projectScheduleStatus == AppConstant.PROJECT_SCHEDULE_CONFIRM_DONE) {
                    var isPopup: boolean = true

                    this.createScheduleOperationService.getDisposalWisePickInfoList(project, () => {
                        const dialogRef = this.matDialog.open(ProjectTripScheduleComponent, {
                            width: '75%',
                            data: {
                                projectInfo: project,
                                checkValue: isPopup,
                                viewContent: false
                            }

                        });

                        dialogRef.afterClosed().subscribe(result => {

                        });


                    });

                }
                else {
                    this.utilService.showSnackbar("Schedule Not Confirmed By Transporter Partner", 5000);
                }
            }
        });


    }

    redirectToCreateSchedule = (projectInfo: ProjectInfoFetch) => {

        this.initiateProjectOperationService.getProjectInfo(projectInfo.projectInfoId).subscribe(project => {
            if (project) {
                this.appComponent.setSelectedMenuForRedirect(AppConstant.CREATE_SCHEDULE_MENU_ID);

                this.createScheduleOperationService.setSelectedProjectIdFromInitiateProjectMenu(project);
                this.createScheduleOperationService.setIsRedirectedFromInitiateProjectMenu(true);

                this.router.navigateByUrl('/visitor/reloadPage');
                setTimeout(() => {
                    this.router.navigate(['/company-admin/project', { outlets: { dumperAdminOutlet: ['create-schedule'] } }]);
                }, 200)
            }
        });
    }

    redirectToProcessCompletion = () => {
        this.router.navigateByUrl('/visitor/reloadPage');
        this.socketioService.setNotoficationViewForCompanyAdmin(true);
        this.socketioService.setNotificationMenu(AppConstant.PROCESS_COMPELETION_MENU_ID);
        setTimeout(() => this.router.navigate(['/company-admin/project', { outlets: { dumperAdminOutlet: ['process-completion'] } }]), 1000);
        ;

    }

    tabChangeForCreateNewProject(project: ProjectInfoFetch) {

        project.projectInfoId = this.utilService.generateUniqueId();
        this.selectTab(1, project, false);

    }

    tabChangeForCopyProject = (project: ProjectInfoFetch) => {
        this.initiateProjectOperationService.getProjectInfo(project.projectInfoId).subscribe(response => {
            if (response) {

                // this.ini
                var projectCopy: ProjectInfoFetch = Object.assign({}, response);

                projectCopy.projectInfoId = this.utilService.generateUniqueId();

                if (projectCopy.wasteDisposalInfo) {
                    projectCopy.wasteDisposalInfo.forEach(each => {
                        each.disposalInfoId = this.utilService.generateUniqueId();
                        each.projectId = projectCopy.projectInfoId;
                    })
                } else {
                    projectCopy.wasteDisposalInfo = [];
                }

                if (projectCopy.wasteProcessInfo) {
                    projectCopy.wasteProcessInfo.forEach(each => {
                        each.wasteProcessId = this.utilService.generateUniqueId();
                    })
                } else {
                    projectCopy.wasteProcessInfo = [];
                }

                projectCopy.projectScheduleStatus = '0';

                this.selectTab(1, projectCopy, true);
            }
        });
    }

    tabChangeForEditProject = (project: ProjectInfoFetch, selectedProcess?: any) => {

        if (selectedProcess && selectedProcess.processId == 'removeProcess') {
            this.removeProject(project.projectInfoId);
        } else {
            this.initiateProjectOperationService.getProjectInfo(project.projectInfoId).subscribe(response => {
                if (response) {
                    this.selectTab(1, response, true, selectedProcess);
                }
            });
        }
    }

    addMissingPartnerProcess: any = {
        processId: "addMissingPartner",
        processTitleEng: "Save",
        processTitleJpn: "作成",
        processTitle: "Save",
        initialStatus: [],
        triggeringProcessIds: [],
        creatorAccess: "edit",
        partyAccess: "edit",
        resultantStatusId: "statusWaitingForAproval",
        viewMode: false,
        companyId: "",
        isApprovalRequired: true,
        processAction: [
            {
                actionId: "addMissingPartnerActionId",
                actionTitleEng: "Save",
                actionTitleJpn: "保存",
                initialStatus: [],
                viewAcess: [],
                editAccess: ["creator", "party"],
                agreementStatusId: "statusWaitingForAproval",
                isApproval: false,
                actionTitle: "saveBtn"
            }],

    }

    projectViewPopupOpen = (projectInfo: ProjectInfoFetch) => {
        debugger
        this.initiateProjectOperationService.getProjectInfo(projectInfo.projectInfoId).subscribe(response => {
            if (response) {
                var companyIds: string[] = this.initiateProjectOperationService.getProjectPartnerCompanyIds(response);

                response.projectViewerIds = this.utilService.getProjectViewerIds(companyIds, response.companyId);

                const dialogRef = this.matDialog.open(CreateNewProjectTabComponent, {
                    width: '85%',
                    data: response,
                    disableClose: true
                });

                dialogRef.afterClosed().subscribe(result => {

                });
            }
        })


    }

    removeProject(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.PROJECT_REMOVE_OPERATION
        }

        const removeDialog = this.matDialog.open(DeleteConfirmationComponent, {
            width: '40%',
            // height: '30%',
            // data: forwardLinks,
            disableClose: true
        });

        removeDialog.afterClosed().subscribe(response => {
            if (response) {
                this.initiateProjectOperationService.removeProject(removeTriggerData).subscribe(response => {
                    if (response) {
                        this.utilService.showRemovedToast();
                        this.removeProjectFromViewList(itemId);

                    }
                });
            }
        });
    }

    removeProjectFromViewList(projectId: string) {
        var index = this.projectList.findIndex(item => item.projectInfoId == projectId);

        if (index >= 0) {
            this.projectList.splice(index, 1);
        }
    }

    canViewCompany(companyId: string, agreementList: AgreementInfoFetch[]) {
        var canView: boolean = false;

        agreementList.forEach(eachAgreement => {
            if ((eachAgreement.dumperPartner && eachAgreement.dumperPartner.companyInfoId == companyId) || (eachAgreement.transporterPartner && eachAgreement.transporterPartner.companyInfoId == companyId) || (eachAgreement.processorPartner && eachAgreement.processorPartner.companyInfoId == companyId)) {
                if ((eachAgreement.dumperPartner && eachAgreement.dumperPartner.companyInfoId == this.companyId) || (eachAgreement.transporterPartner && eachAgreement.transporterPartner.companyInfoId == this.companyId) || (eachAgreement.processorPartner && eachAgreement.processorPartner.companyInfoId == this.companyId)) {
                    canView = true;
                }
            }
        })
        return canView;
    }

    canViewAddMissingPartner(project: ProjectInfoFetch) {
        var canViewAddMissingPartner: boolean = false;

        if (project.missingRole && project.status.statusId == 'statusWaitingForAproval') {

            if (this.initiateProjectOperationService.getCompanyRole(this.companyId, project) != AppConstant.CATEGORY_NAME_DUMPER) {
                canViewAddMissingPartner = true;
            }
        }

        return canViewAddMissingPartner;

        // return (project.missingRole && project.status.statusId == 'statusWaitingForAproval' && project.companyId != this.companyId) ? true : false;

    }

    loadOp = AppConstant.LOAD_OP;
    unloadOp = AppConstant.UNLOAD_OP;

    redirectToMobileApp(opType: string) {
        if (opType == AppConstant.LOAD_OP) {

            this.redirectToLoadOpForCurrentDate();

        } else if (opType == AppConstant.UNLOAD_OP) {

            this.loadUnloadService.redirectToUnloadOp();
        }
    }

    redirectToLoadOpForCurrentDate() {
        var tripPlan: DriverTripPlan = {
            tripInfoId: '',
            pickUpDate: this.utilService.getCurrentDate(),
            pickUpDateView: this.utilService.getCurrentDate(),
            startTime: '',
            endTime: '',
            driverId: '',
            driverName: '',
            driverLicenseNo: '',
            pickList: [],
            vehicleInfo: {
                companyId: "",
                vehicleId: "",
                frontendDate: "",
                backendDate: "",
                manufacturerName: "",
                vehicleType: "",
                vehicleTypeId: "",
                modelName: "",
                vehicleRegNo: "",
                vehicleCapacity: "",
                vehicleWeight: "",
                gasolineType: [],
                vehicleGasolineTypeAndCo2Info: {} as GasolineCo2EmissionInfo,
                inspectionDate: "",
                vehicleOwnerShip: [],
                zipcode: "",
                zipcodeFormated: "",
                officeAddress: "",
                fitnessLicense: "",
                remarks: ""
            }
        }

        this.loadUnloadService.loadPick(tripPlan, -1, tripPlan.pickUpDateView);

    }

    showLoadButton() {
        return this.utilService.showLoadButton();
    }

    showUnloadButton() {
        return this.utilService.showUnloadButton();
    }
}
