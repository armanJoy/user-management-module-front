import { Component, OnInit } from '@angular/core';
import { VehicleInfoFetch, TripPlanFetch, DriverInfoFetch, VehicleInfoViewMatrix, DateArrayView, ParameterForTripPlanFetch, BackEndToFrontendConvertFetch, DisposeWisePickInfo, TripInfo, PickInfo, ProjectStatusUpdate } from 'src/app/models/backend-fetch/create-schedule';
import { DisposalInfoFetch, ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
import { CookieService } from 'ngx-cookie-service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { InitiateProjectOperationService } from 'src/app/services/operation-services/initiate-project-operation.service';
import { UserMangementOperatinService } from 'src/app/services/operation-services/user-mangement-operatin.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { Router } from '@angular/router';
import { SocketioService } from 'src/app/services/visitor-services/socketio.service';

@Component({
    selector: 'app-create-schedule-menu',
    templateUrl: './create-schedule-menu.component.html',
    styleUrls: ['./create-schedule-menu.component.css']
})

export class CreateScheduleMenuComponent implements OnInit {
    isProjectListView: boolean = true;
    isWastePickScheduleView: boolean = false;
    isVehicleTripScheduleView: boolean = false;
    menuList: any = [
        {
            menuId: "1",
            menuTitle: "Agreement",
            menuUrl: "business-agreement",
            parentSegment: "/company-admin/project"
        },
        {
            menuId: "2",
            menuTitle: "Project",
            menuUrl: "initiate-project",
            parentSegment: "/company-admin/project"
        }
    ];
    planQuantity: number = 0;
    project: ProjectInfoFetch = {
        companyCategorySelection: [],
        projectScheduleStatus: "",
        initiatorCompanyName: "",
        operatingOfficeName: "",
        operatingOfficeId: "",
        operatingAddress: "",
        operatingZipCode: "",
        processsList: [],
        isApproveRequiredState: false,
        companyId: "",
        projectInfoId: "",
        projectTitle: "",
        projectCreationDate: "",
        projectStartDate: "",
        projectEndDate: "",
        projectCreationDateView: "",
        projectStartDateView: "",
        projectEndDateView: "",
        operatingBranch:
        {
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
            statusName: "New",
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
        isTransporter: false,
        isBasicInfoFetched: false,
        isOpen: false,
        manifestoList: [],
        remarks: ''
    };
    isLoadMenuAvailable: boolean = false;
    isUnloadMenuAvailable: boolean = false;
    projectList: ProjectInfoFetch[] = [];
    vehicleList: VehicleInfoFetch[] = [];
    tripList: TripPlanFetch[] = [];
    isRedirecteView: boolean = false;

    driverList: DriverInfoFetch[] = [];
    dateList: string[] = [];
    disposalInfo: DisposalInfoFetch = {
        transportDistance: 0,
        projectId: '',
        projectTitle: '',
        disposalInfoId: '',
        disposalViewId: '',
        collectionId: '',
        fromDate: '',
        fromDateView: '',
        startBackendDate: '',
        toDate: '',
        toDateView: '',
        endBackendDate: '',
        quantity: 0,
        planQuantity: 0,
        remainingQuantity: 0,
        wasteTypeId: '',
        wasteTypeName: '',
        wasteItemId: '',
        wasteItemName: '',
        pickLocation: '',
        pickZipCode: '',
        dropLocation: '',
        dropZipCode: '',
        isParent: false,
        unit: '',
        price: 0,
        disposeWisePickList: [],
        scheduleConfirmStatus: "0",
        wasteShape: '',
        wastePackage: ''
    };
    column: VehicleInfoViewMatrix[] = [];
    disposeWisePickList: DisposeWisePickInfo[] = [];
    row: BackEndToFrontendConvertFetch[] = [];
    dateWiseDisposePickList: any[] = [];
    isVehicleTripSchedule = true;
    constructor(private languageService: LanguageService, private createScheduleOperationService: CreateScheduleOperationService, private cookieService: CookieService, private utilService: UtilService, private initiateProjectOperationService: InitiateProjectOperationService, private userMangementOperatinService: UserMangementOperatinService, private companySettingsOperationService: CompanySettingsOperationService, private router: Router, private socketioService: SocketioService) { }
    companyId: string = "";
    companyName: string = ""
    isScheduleConfirmed = false;
    viewContent = false;
    componentCode!: string;

    isSystemAdmin: boolean = false;

    projectProcessDef: any[] = [];
    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.CREATE_SCHEDULE_MENU, AppConstant.UI_LABEL_TEXT);

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.CREATE_SCHEDULE_MENU;
        this.companyId = this.utilService.getCompanyIdCookie();
        this.getCompany();


    }
    uiLabels: any = {
        companyName: "Company Name ",
        projectScheduleDashboard: "Project Schedule Dashboard",
        wasteSchedule: "Waste Schedule",
        vehicleTripSchedule: "Vehicle Trip Schedule",
        projectTripSchedule: "Project Trip Schedule"
    }
    redirectToLoadMenu = () => {

        this.router.navigateByUrl('/visitor/reloadPage');

        this.socketioService.setNotoficationViewForCompanyAdmin(true);
        this.socketioService.setNotificationMenu(AppConstant.LOAD_MENU_ID);

        setTimeout(() => this.router.navigate(['/company-admin/project', { outlets: { dumperAdminOutlet: ['load-web'] } }]), 1000);


    }
    redirectToUnloadMenu = () => {

        this.router.navigateByUrl('/visitor/reloadPage');

        this.socketioService.setNotoficationViewForCompanyAdmin(true);
        this.socketioService.setNotificationMenu(AppConstant.UNLOAD_MENU_ID);
        setTimeout(() => this.router.navigate(['/company-admin/project', { outlets: { dumperAdminOutlet: ['unload-web'] } }]), 1000);

    }
    getCompany() {
        this.userMangementOperatinService.getCompanyInfo(this.companyId).subscribe((company) => {

            if (company) {
                this.companyName = company.companyName;

            }
            this.getProjectProcessDef();

        });
    }

    getProjectProcessDef() {

        this.initiateProjectOperationService.getProjectProcessDef().subscribe(data => {
            if (data) {
                this.projectProcessDef = data;

            }
            this.getProjectList(this.companyId, AppConstant.INITIAL_PAGE_NO, AppConstant.INITIAL_SEARCH_TEXT);

        })
    }

    public getProjectList = (companyId: string, pageNo: number, searchText: string) => {

        // this.createScheduleOperationService.getProjectList(this.companyId).subscribe((data) => {

        //     if (data && data.companyProjectList && data.companyProjectList.length > 0) {
        //         this.projectList = data.companyProjectList;

        //         this.prepareProjectForView(this.projectList);

        //         this.project = this.projectList[0];

        //         this.project.wasteDisposalInfo = this.createScheduleOperationService.prepareDisposalViewId(this.project.wasteDisposalInfo);
        //         this.disposalInfo = this.project.wasteDisposalInfo[0];

        //         this.prepareInitialProjectView()
        //     }

        //     this.getVehicleList();
        // });



        this.createScheduleOperationService.getProjectList(companyId, pageNo, searchText).subscribe((data) => {
            if (data) {
                this.projectList = data.companyProjectList;
            }

            if (data && data.companyProjectList && data.companyProjectList.length > 0) {


                this.prepareProjectForView(this.projectList);

                this.project = this.projectList[0];

                this.project.wasteDisposalInfo = this.createScheduleOperationService.prepareDisposalViewId(this.project.wasteDisposalInfo);
                this.disposalInfo = this.project.wasteDisposalInfo[0];

                // this.prepareInitialProjectView()
            }

            this.getVehicleList();
        });
    }


    prepareInitialProjectView() {

        var isRedirectedFromInitiateProject = this.createScheduleOperationService.getIsRedirectedFromInitiateProjectMenu();

        if (isRedirectedFromInitiateProject) {
            this.isRedirecteView = true;

            this.project = this.createScheduleOperationService.getSelectedProjectIdFromInitiateProjectMenu();

            this.switchTab(1, this.project, () => {
                if (this.project.wasteDisposalInfo && this.project.wasteDisposalInfo.length > 0) {
                    this.switchTabToVehicleTripSchedule(0, this.project.wasteDisposalInfo[0]);
                } else {
                    this.viewContent = true;
                }
            });

            // this.createScheduleOperationService.setIsRedirectedFromInitiateProjectMenu(false);

        } else {
            this.isRedirecteView = false;

            this.switchTab(0, this.project, () => {
                if (this.project.wasteDisposalInfo && this.project.wasteDisposalInfo.length > 0) {
                    this.switchTabToVehicleTripSchedule(0, this.project.wasteDisposalInfo[0]);
                } else {
                    this.viewContent = true;
                }
            });
        }

    }

    prepareProjectForView(projectList: ProjectInfoFetch[]) {
        projectList.forEach(element => {
            element.status.statusName = this.initiateProjectOperationService.getStatusTitle(element.status.statusId, this.projectProcessDef);
            var companyIds: string[] = this.initiateProjectOperationService.getProjectPartnerCompanyIds(element);
            element.projectViewerIds = this.utilService.getProjectViewerIds(companyIds, element.companyId);

        });
    }

    getVehicleList() {
        this.createScheduleOperationService.getVehicleList(this.companyId).subscribe((data) => {

            if (data) {
                this.vehicleList = data;

            }
            this.getDriverList();
        });
    }

    getDriverList() {

        this.createScheduleOperationService.getDriverList(this.companyId).subscribe((data) => {

            if (data) {
                this.driverList = data;

            }

            // if (this.project) {

            this.prepareInitialProjectView();

            // } else {
            //     this.viewContent = true;
            // }

            this.menuList = this.languageService.getSecondaryMenuList(AppConstant.MENU_ID.DUMPER_ADMIN_MENU_ID);
            this.isLoadMenuAvailable = this.checkLoadMenuAvilableOrNot();
            this.isUnloadMenuAvailable = this.checkUnloadMenuAvilableOrNot();


        });
    }
    // getUserInfo() {
    //    
    //     var userInfoQuery: UserInfoQuery = {} as UserInfoQuery;
    //     var userIdentificationId = this.utilService.getUserIdCookie();
    //     var companyId = this.utilService.getCompanyIdCookie();

    //     if (userIdentificationId && companyId) {
    //         userInfoQuery.userIdentificationId = userIdentificationId;
    //         userInfoQuery.companyId = companyId;

    //         this.companySettingsOperationService.getUserInfoByUserIdentificationAndCompanyId(userInfoQuery).subscribe(data => {

    //             if (data) {
    //                 this.isLoadMenuAvailable = this.checkLoadMenuAvilableOrNot();
    //                 this.isUnloadMenuAvailable = this.checkUnloadMenuAvilableOrNot();
    //             }
    //             this.viewContent = true;
    //         })
    //     }
    // }
    checkLoadMenuAvilableOrNot(): boolean {

        var flag: boolean = false;
        for (var i = 0; i < this.menuList.length; i++) {
            if (this.menuList[i].menuId == AppConstant.LOAD_MENU_ID) {
                flag = true;
                break;
            }
        }


        return flag;
    }
    checkUnloadMenuAvilableOrNot(): boolean {
        var flag: boolean = false;
        for (var i = 0; i < this.menuList.length; i++) {
            if (this.menuList[i].menuId == AppConstant.UNLOAD_MENU_ID) {
                flag = true;
                break;
            }
        }

        return flag;
    }
    prepareDateWiseTrip(vehicleInfoViewMatrix: VehicleInfoViewMatrix): TripPlanFetch[] {
        var tripPlanList: TripPlanFetch[] = [];
        this.dateList.forEach(date => {
            var trip: TripPlanFetch = {
                date: "",
                companyId: "",
                tripList: [],
                totalOpenMinute: 0,
                openHour: 0,
                openMinute: 0,
            }
            trip.date = date;
            trip.companyId = this.companyId;
            this.tripList.forEach(oldTrip => {
                if (oldTrip.date == trip.date) {
                    oldTrip.tripList.forEach(element => {
                        element.driverName = this.createScheduleOperationService.getDriverName(element.driverId, this.driverList);
                        if (element.vehicleId == vehicleInfoViewMatrix.vehicleInfo.vehicleId) {
                            trip.tripList.push(element);
                        }
                    });
                }

            });
            tripPlanList.push(trip);
        });
        return tripPlanList;
    }
    prepareDateWiseOpenHourOfevryVehicle(column: VehicleInfoViewMatrix[], row: BackEndToFrontendConvertFetch[]): VehicleInfoViewMatrix[] {

        column.forEach(dateWiseVehicle => {
            row.forEach(item => {
                dateWiseVehicle.tripPlan.forEach(element => {
                    if (item.backendDate == element.date) {
                        element.totalOpenMinute = 900;
                        var totalTripTime: number = 0;
                        element.tripList.forEach(trip => {
                            var startTime: number = 0;
                            var endTime: number = 0;
                            var digit: number = 0;
                            for (var i = 0; i < trip.startTime.length; i++) {
                                if (i == 0) {
                                    digit += Number(trip.startTime[i]);
                                }
                                else if (i == 1) {
                                    digit = 10 * digit + Number(trip.startTime[i]);
                                    startTime = digit * 60;
                                    digit = 0;
                                }
                                else if (i == 2) {
                                    digit += Number(trip.startTime[i]);
                                }
                                else if (i == 3) {
                                    digit = 10 * digit + Number(trip.startTime[i]);
                                    startTime += digit;
                                }

                            }
                            var digit: number = 0;
                            for (var i = 0; i < trip.endTime.length; i++) {
                                if (i == 0) {
                                    digit += Number(trip.endTime[i]);
                                }
                                else if (i == 1) {
                                    digit = 10 * digit + Number(trip.endTime[i]);
                                    endTime = digit * 60;
                                    digit = 0;
                                }
                                else if (i == 2) {
                                    digit += Number(trip.endTime[i]);
                                }
                                else if (i == 3) {
                                    digit = 10 * digit + Number(trip.endTime[i]);
                                    endTime += digit;
                                }

                            }
                            totalTripTime += (endTime - startTime);

                        });
                        // element.totalOpenMinute = element.totalOpenMinute - totalTripTime;
                        // element.openHour = element.totalOpenMinute / 60;
                        // element.openMinute = element.totalOpenMinute % 60;
                        element.totalOpenMinute = element.totalOpenMinute - totalTripTime;
                        element.openMinute = element.totalOpenMinute % 60;
                        if (element.openMinute > 0) {
                            element.totalOpenMinute = element.totalOpenMinute - element.openMinute;
                        }
                        element.openHour = element.totalOpenMinute / 60;
                    }

                });

            });


        });
        return column;
    }
    prepareColumnDataForVehicleTripMatrix(): VehicleInfoViewMatrix[] {
        var vehicleInfoViewMatrixList: VehicleInfoViewMatrix[] = [];
        this.vehicleList.forEach(vehicle => {
            if (vehicle && vehicle.active) {
                var vehicleInfoViewMatrix: VehicleInfoViewMatrix = {
                    vehicleInfo: {
                        companyId: "",
                        vehicleId: "",
                        frontendDate: "",
                        backendDate: "",
                        manufacturerName: "",
                        vehicleType: "",
                        modelName: "",
                        vehicleRegNo: "",
                        vehicleCapacity: 0,
                        vehicleLoadQuantity: 0,
                        vehicleFreeSpace: 0,
                        vehicleWeight: "",
                        gasolineType: [],
                        inspectionDate: "",
                        vehicleOwnerShip: [],
                        openHour: "",
                        remarks: "",
                        previousDriverId: "",
                        previousDriverName: "",
                        active: true
                    },
                    tripPlan: []
                }
                vehicleInfoViewMatrix.vehicleInfo = vehicle;
                vehicleInfoViewMatrix.tripPlan = this.prepareDateWiseTrip(vehicleInfoViewMatrix);

                vehicleInfoViewMatrixList.push(vehicleInfoViewMatrix);
            }

        });

        return vehicleInfoViewMatrixList;
    }
    prepareRowDataForVehicleTripMatrix(dateList: string[]): DateArrayView[] {
        var dateArrayViewList: DateArrayView[] = []
        dateList.forEach(date => {
            var dateArrayView: DateArrayView =
            {
                date: ""
            }
            dateArrayView.date = date;
            dateArrayViewList.push(dateArrayView);
        });
        return dateArrayViewList;
    }
    getTripList(dateList: string[]) {

        var parameter: ParameterForTripPlanFetch = {
            companyId: "",
            dateList: []
        }
        var dateArrayList: BackEndToFrontendConvertFetch[] = this.prepareDataTogetFrontendDate(this.dateList);
        parameter.dateList = dateList;
        parameter.companyId = this.companyId;

        this.createScheduleOperationService.getDatewiseTripList(parameter).subscribe((data) => {

            if (data) {
                this.tripList = data;
            }

            this.getFrontendData(dateArrayList);
        });

    }
    prepareDataTogetFrontendDate(dateList: string[]): BackEndToFrontendConvertFetch[] {
        var dateArrayList: BackEndToFrontendConvertFetch[] = [];
        dateList.forEach(element => {
            var dateArray: BackEndToFrontendConvertFetch = {
                backendDate: "",
                frontendDate: "",
                frontendDateView: ""
            }
            dateArray.backendDate = element;
            dateArray.frontendDate = element;
            dateArrayList.push(dateArray);

        });
        return dateArrayList;
    }
    getFrontendData(dateArrayList: BackEndToFrontendConvertFetch[]) {

        this.createScheduleOperationService.getDateForFrontend(dateArrayList).subscribe((data) => {
            if (data) {
                this.row = data;
                this.column = this.prepareColumnDataForVehicleTripMatrix();
                this.column = this.prepareDateWiseOpenHourOfevryVehicle(this.column, this.row);
                this.row = this.prepareRowDateView(this.row);
                this.prepareTimeView();
                this.column = this.sortTripList(this.column);
            }
        })
    }
    prepareRowDateView(row: BackEndToFrontendConvertFetch[]): BackEndToFrontendConvertFetch[] {
        row.forEach(element => {
            element.frontendDateView = this.createScheduleOperationService.prepareDateView(element.frontendDate);
        });
        return row;
    }
    prepareTimeView() {
        this.column.forEach(parent => {
            parent.tripPlan.forEach(child1 => {
                child1.tripList.forEach(child2 => {
                    child2.startTimeView = this.createScheduleOperationService.prepareTimeFormate(child2.startTime);
                    child2.endTimeView = this.createScheduleOperationService.prepareTimeFormate(child2.endTime);
                });
            });
        });
    }
    getDateArrayList(disposal: DisposalInfoFetch) {
        let start = this.utilService.getDateFromBackendDate(disposal.startBackendDate);
        let end = this.utilService.getDateFromBackendDate(disposal.endBackendDate);
        this.dateList = this.utilService.getDatesBetween(start, end);
        debugger
        this.getTripList(this.dateList);

        // this.row = this.prepareRowDataForVehicleTripMatrix(this.dateList);
        // this.column = this.prepareColumnDataForVehicleTripMatrix();
        // this.column = this.prepareDateWiseOpenHourOfevryVehicle(this.column, this.row);
    }
    selectedIndex = 0;
    informChange(index: any) {
        this.selectedIndex = index;
    }

    public switchTab = (index: number, projectInfo: ProjectInfoFetch, callBack?: any) => {
        if (index != 0) {
            this.isProjectListView = false;
            this.isWastePickScheduleView = true;
            this.isVehicleTripScheduleView = false;
        }
        if (this.isRedirecteView) {
            this.selectedIndex = index - 1;

        } else {
            this.selectedIndex = index;

        }

        this.project = projectInfo;
        // this.dateWiseDisposePickList = [];
        this.createScheduleOperationService.getDisposalWisePickInfoList(this.project, () => {

            this.project = this.createScheduleOperationService.prepareDisposalWisePickView(this.project, this.driverList, this.vehicleList);
            this.dateWiseDisposePickList = this.createScheduleOperationService.groupDisposepickByDate(this.project.wasteDisposalInfo);
            this.project.wasteDisposalInfo = this.createScheduleOperationService.prepareDisposalViewId(this.project.wasteDisposalInfo);
            this.isScheduleConfirmed = this.createScheduleOperationService.isAllDisposeConfirmed(this.project.wasteDisposalInfo);
            if (callBack) {
                callBack();
            }
        })

        if (projectInfo.wasteDisposalInfo.length == 0) {
            this.dateWiseDisposePickList = [];
        }


    }
    sortTripList(column: VehicleInfoViewMatrix[]): VehicleInfoViewMatrix[] {
        column.forEach(element => {
            element.tripPlan.forEach(trip => {

                trip.tripList.sort((a, b) => <any>new Date(a.startTime) - <any>new Date(b.startTime));


            });
        });
        return column;
    }
    public switchTabToVehicleTripSchedule = (index: number, disposal: DisposalInfoFetch) => {
        // const jsonDate = new Date().toISOString().slice(-24).replace(/\D/g, '').slice(0, 14);
        this.getDateArrayList(disposal);
        this.disposalInfo = disposal;

        this.getDisposeWisePickList(this.disposalInfo.disposalInfoId, () => {
            if (this.isRedirecteView) {
                this.selectedIndex = index - 1;
            } else {
                this.selectedIndex = index;
            }
            if (index != 0) {
                this.isVehicleTripSchedule = false;
                this.isProjectListView = false;
                this.isWastePickScheduleView = false;
                this.isVehicleTripScheduleView = true;
            }

            this.viewContent = true;
        });

    }

    calculateDisposalLoadQuantity(disposeWisePickList: DisposeWisePickInfo[]) {
        var sumofPickQuantity: number = 0;
        disposeWisePickList.forEach(element => {
            sumofPickQuantity += element.quantity;
        });
        this.disposalInfo.planQuantity = sumofPickQuantity;
        this.planQuantity = this.disposalInfo.planQuantity;
        this.disposalInfo.remainingQuantity = this.disposalInfo.quantity - this.disposalInfo.planQuantity;
    }
    // prepareDisposeWisePickDateView(disposeWisePickLis:Di)
    getDisposeWisePickList(disposeId: string, callBack: any) {

        this.createScheduleOperationService.getDisposalWisePickList(disposeId).subscribe((data) => {
            if (data) {
                this.disposeWisePickList = data;
                this.disposeWisePickList
                this.calculateDisposalLoadQuantity(this.disposeWisePickList);
            }
            callBack();
        })
    }


    getVehicleLicenseNo(vehicleId: string): string {
        var index = -1;
        index = this.vehicleList.findIndex(item => item.vehicleId == vehicleId);

        if (index >= 0) {
            return this.vehicleList[index].vehicleRegNo;
        } else
            return "";
    }

    prepareDisposeWisePickInfo(pickInfo: PickInfo, tripInfo: TripInfo) {
        var disposeWisePick: DisposeWisePickInfo = {
            pickId: "",
            disposalId: "",
            quantity: 0,
            tripInfo: {
                tripInfoId: "",
                pickUpDate: "",
                startTime: "",
                endTime: "",
                driverId: "",
                driverName: "",
                vehicleId: "",
                vehicleName: "",
                vehicleLicenseNo: "",
            }

        }
        disposeWisePick.disposalId = pickInfo.disposalId;
        disposeWisePick.pickId = pickInfo.pickId;
        disposeWisePick.quantity = pickInfo.quantity;
        disposeWisePick.tripInfo.driverId = tripInfo.driverId;
        disposeWisePick.tripInfo.tripInfoId = tripInfo.tripInfoId;
        disposeWisePick.tripInfo.pickUpDate = this.createScheduleOperationService.prepareDateViewFromBackendDate(tripInfo.pickUpDate);
        disposeWisePick.tripInfo.endTime = tripInfo.endTime;
        disposeWisePick.tripInfo.startTime = tripInfo.startTime;
        disposeWisePick.tripInfo.vehicleId = tripInfo.vehicleId;
        disposeWisePick.tripInfo.driverName = this.createScheduleOperationService.getDriverNameService(disposeWisePick.tripInfo.driverId, this.driverList);
        disposeWisePick.tripInfo.vehicleName = this.createScheduleOperationService.getVehicleNameService(disposeWisePick.tripInfo.vehicleId, this.vehicleList);
        disposeWisePick.tripInfo.vehicleLicenseNo = this.createScheduleOperationService.getVehicleLicenceService(disposeWisePick.tripInfo.vehicleId, this.vehicleList);

        return disposeWisePick;
    }

    public UpdateDisposeWisePickList = (tripInfo: TripInfo, pickInfo: PickInfo[], disposeId: string, isRemoved: boolean, removedPicks?: string[]) => {


        if (isRemoved) {
            if (removedPicks) {
                var index = -1;
                index = this.project.wasteDisposalInfo.findIndex(item => item.disposalInfoId == disposeId);
                if (index >= 0) {
                    removedPicks.forEach(eachRemovedPickId => {
                        var pickIndex = this.project.wasteDisposalInfo[index].disposeWisePickList.findIndex(item => item.pickId == eachRemovedPickId);

                        if (pickIndex >= 0) {
                            this.project.wasteDisposalInfo[index].disposeWisePickList.splice(pickIndex, 1);
                        }

                    });
                }
            }

            var index = this.project.wasteDisposalInfo.findIndex(item => item.disposalInfoId == disposeId);
            this.updateTripInfoOfOtherPicksBasedOnNewTripInfo(this.project.wasteDisposalInfo[index].disposeWisePickList, tripInfo);

            if (pickInfo && pickInfo.length > 0) {

                if (index >= 0) {
                    pickInfo.forEach(eachPick => {
                        if (eachPick) {

                            var disposeWisePick: DisposeWisePickInfo = this.prepareDisposeWisePickInfo(eachPick, tripInfo);

                            var pickIndex = (eachPick.isNew) ? -1 : this.project.wasteDisposalInfo[index].disposeWisePickList.findIndex(item => item.pickId == eachPick.pickId);

                            (index >= 0) ? (this.project.wasteDisposalInfo[index].disposeWisePickList[pickIndex] = disposeWisePick) : this.project.wasteDisposalInfo[index].disposeWisePickList.push(disposeWisePick);
                        }
                    })
                }

            }

        }
        // else {
        //     var disposeWisePick: DisposeWisePickInfo = {
        //         pickId: "",
        //         disposalId: "",
        //         quantity: 0,
        //         tripInfo: {
        //             tripInfoId: "",
        //             pickUpDate: "",
        //             startTime: "",
        //             endTime: "",
        //             driverId: "",
        //             driverName: "",
        //             vehicleId: "",
        //             vehicleName: "",
        //             vehicleLicenseNo: "",
        //         }

        //     }
        //     disposeWisePick.disposalId = pickInfo.disposalId;
        //     disposeWisePick.pickId = pickInfo.pickId;
        //     disposeWisePick.quantity = pickInfo.quantity;
        //     disposeWisePick.tripInfo.driverId = tripInfo.driverId;
        //     disposeWisePick.tripInfo.tripInfoId = tripInfo.tripInfoId;
        //     disposeWisePick.tripInfo.pickUpDate = this.createScheduleOperationService.prepareDateViewFromBackendDate(tripInfo.pickUpDate);
        //     disposeWisePick.tripInfo.endTime = tripInfo.endTime;
        //     disposeWisePick.tripInfo.startTime = tripInfo.startTime;
        //     disposeWisePick.tripInfo.vehicleId = tripInfo.vehicleId;
        //     disposeWisePick.tripInfo.driverName = this.createScheduleOperationService.getDriverNameService(disposeWisePick.tripInfo.driverId, this.driverList);
        //     disposeWisePick.tripInfo.vehicleName = this.createScheduleOperationService.getVehicleNameService(disposeWisePick.tripInfo.vehicleId, this.vehicleList);
        //     disposeWisePick.tripInfo.vehicleLicenseNo = this.createScheduleOperationService.getVehicleLicenceService(disposeWisePick.tripInfo.vehicleId, this.vehicleList);

        //     var index = -1;
        //     index = this.project.wasteDisposalInfo.findIndex(item => item.disposalInfoId == pickInfo.disposalId);
        //     if (index > -1) {

        //         this.project.wasteDisposalInfo[index].disposeWisePickList.push(disposeWisePick);

        //         this.updateTripInfoOfOtherPicksBasedOnNewTripInfo(this.project.wasteDisposalInfo[index].disposeWisePickList, tripInfo);
        //     }


        // }

        this.dateWiseDisposePickList = this.createScheduleOperationService.groupDisposepickByDate(this.project.wasteDisposalInfo);
    }

    updateTripInfoOfOtherPicksBasedOnNewTripInfo(disposeWisePickList: DisposeWisePickInfo[], newTripInfo: TripInfo) {
        if (disposeWisePickList) {
            disposeWisePickList.forEach(eachPick => {
                if (eachPick.tripInfo.tripInfoId == newTripInfo.tripInfoId) {
                    eachPick.tripInfo.startTime = newTripInfo.startTime;
                    eachPick.tripInfo.endTime = newTripInfo.endTime;
                }
            })
        }
    }


    public confirmDisposeSchedule = (disposalInfoId: string) => {

        this.createScheduleOperationService.confirmDisposeSchedule(disposalInfoId).subscribe(response => {
            if (response) {

                this.disposalInfo.scheduleConfirmStatus = AppConstant.DISPOSE_WISE_SCHEDULE_CONFIRM_DONE;
                this.isScheduleConfirmed = this.createScheduleOperationService.isAllDisposeConfirmed(this.project.wasteDisposalInfo);

                (this.isScheduleConfirmed) ? this.confirmProjectSchedule(this.project) : '';
            }
        });


        // this.updateDateWiseDisposePickList(disposalInfoId);
    }

    confirmProjectSchedule(project: ProjectInfoFetch) {

        var projectStatusUpdate: ProjectStatusUpdate = {
            projectInfoId: project.projectInfoId,
            status: AppConstant.PROJECT_SCHEDULE_CONFIRM_DONE
        }

        this.createScheduleOperationService.updateProjectStatus(projectStatusUpdate).subscribe((data) => {

            if (data == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {

                // this.saveNotification(projectStatusUpdate.projectInfoId);
                // this.utilService.showSnackbar(this.uiLabels.scheduleConfirmToast, 3000);

                this.project.projectScheduleStatus = data;
            }

        });
    }
    public UpdateplanQuantity = (planQuantity: number) => {
        this.planQuantity = planQuantity;
    }
    public projectListView = () => {
        this.isProjectListView = true;
        this.isWastePickScheduleView = false;
        this.isVehicleTripScheduleView = false;
    }
    public pickSchedule = () => {
        this.isProjectListView = false;
        this.isWastePickScheduleView = true;
        this.isVehicleTripScheduleView = false;
    }

}
