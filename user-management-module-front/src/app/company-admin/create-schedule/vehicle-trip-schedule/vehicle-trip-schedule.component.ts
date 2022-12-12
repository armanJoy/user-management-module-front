import { Component, OnInit, Input } from '@angular/core';
import { VehicleInfoFetch, VehicleInfoViewMatrix, DateArrayView, DriverInfoFetch, BackEndToFrontendConvertFetch, PickInfo, TripInfo, DateInput, DriverBandView } from 'src/app/models/backend-fetch/create-schedule';
import { DisposalInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
@Component({
    selector: 'app-vehicle-trip-schedule',
    templateUrl: './vehicle-trip-schedule.component.html',
    styleUrls: ['./vehicle-trip-schedule.component.css']
})
export class VehicleTripScheduleComponent implements OnInit {

    @Input()
    isRedirecteView!: boolean;

    @Input()
    planQuantity: number = 0;

    @Input()
    column: VehicleInfoViewMatrix[] = [];

    @Input()
    row: BackEndToFrontendConvertFetch[] = [];

    @Input()
    disposalInfo: DisposalInfoFetch = {
        transportDistance: 0,
        projectId: '',
        projectTitle: '',
        disposalInfoId: '',
        disposalViewId: null,
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
        scheduleConfirmStatus: '',
        wasteShape: '',
        wastePackage: ''
    };

    driverDate: DateInput = {
        date: ""
    }

    @Input()
    public UpdateplanQuantity!: (planQuantity: number) => void;

    @Input()
    driverList: DriverInfoFetch[] = [];

    @Input()
    public updateDisposeWisePickList!: (tripInfo: TripInfo, pickInfo: PickInfo[], disposeId: string, isRemoved: boolean, removedPicks?: string[]) => void;

    @Input()
    public confirmDisposeSchedule!: (disposalInfoId: string) => void;

    @Input()
    dateWiseDisposePickList!: any[];

    @Input()
    isScheduleConfirmed!: boolean;

    @Input()
    public pickSchedule!: () => void;

    @Input()
    public projectListView!: () => void;

    @Input()
    disposeList!: DisposalInfoFetch[];

    isViewPopup: boolean = false;
    viewContent = false;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    projectScheduleConfirmDone = AppConstant.PROJECT_SCHEDULE_CONFIRM_DONE;
    projectScheduleConfirmNotDone = AppConstant.PROJECT_SCHEDULE_CONFIRM_NOT_DONE;

    disposeWiseScheduleConfirmDone = AppConstant.DISPOSE_WISE_SCHEDULE_CONFIRM_DONE;
    disposeWiseScheduleConfirmNotDone = AppConstant.DISPOSE_WISE_SCHEDULE_CONFIRM_NOT_DONE;

    driverBandViewList: DriverBandView[] = [];
    isShow: boolean = false;

    constructor(private utilService: UtilService, private languageService: LanguageService, private createScheduleOperationService: CreateScheduleOperationService) { }

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.VEHICLE_TRIP_SCHEDULE_TAB, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.VEHICLE_TRIP_SCHEDULE_TAB;
        if (this.column) {
            this.viewContent = true;
        }
    }
    uiLabels: any = {
        wasteItem: "Waste Item",
        duration: "Duration",
        quantity: "Quantity",
        pickLocation: "Pick Location",
        dropLocation: "Drop Location",
        vehicleSchedule: "Vehicle Schedule",
        workingHour: "Working Hour",
        wastePickInformation: "Waste Pick Information"

    }


    updateDateWiseDisposePickList(disposalInfoId: string) {
        this.dateWiseDisposePickList.forEach(eachDispose => {
            if (eachDispose.disposeInfo.disposalInfoId == disposalInfoId) {
                eachDispose.disposeInfo.scheduleConfirmStatus = AppConstant.DISPOSE_WISE_SCHEDULE_CONFIRM_DONE;
            }
        })
    }
    onClickShowBtn(driverDate: DateInput) {
        driverDate.date = this.driverDate.date + "000000";
        this.driverBandViewList = [];
        this.driverBandViewList = this.prepareDriverScheduleData(driverDate);
        this.isShow = true;
    }
    prepareDriverScheduleData(data: DateInput): DriverBandView[] {
        var driverBandViewList: DriverBandView[] = [];
        this.driverList.forEach(driver => {
            var driverBandView: DriverBandView = {
                driverId: "",
                driverName: "",
                tripList: []
            }
            driverBandView.driverId = driver.userInfoId;
            driverBandView.driverName = driver.userName;
            this.column.forEach(column => {
                column.tripPlan.forEach(trip => {
                    if (trip.date == data.date) {
                        trip.tripList.forEach(tripInfo => {
                            if (tripInfo.driverId == driverBandView.driverId) {
                                driverBandView.tripList.push(tripInfo);
                            }
                        });
                    }
                });
            });
            driverBandViewList.push(driverBandView);
        });

        return driverBandViewList;
    }
    public planQuantityUpdate = (planQuantity: number) => {
        this.UpdateplanQuantity(planQuantity);
    }
    onClickProjectListBtn() {
        this.projectListView();
    }
    onClickProjectInformationBtn() {
        this.pickSchedule();
    }

}
