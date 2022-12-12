import { Component, OnInit, Input } from '@angular/core';
import { DateInput, DriverBandView, DriverInfoFetch, ParameterForTripPlanFetch, TripInfo, TripPlanFetch } from 'src/app/models/backend-fetch/create-schedule';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DriverBandViewPopupComponent } from '../driver-band-view-popup/driver-band-view-popup.component';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
@Component({
    selector: 'app-driver-schedule',
    templateUrl: './driver-schedule.component.html',
    styleUrls: ['./driver-schedule.component.css']
})
export class DriverScheduleComponent implements OnInit {
    @Input()
    driverBandViewList: DriverBandView[] = [];
    componentCode!: string;
    isSystemAdmin: boolean = false;
    @Input()
    isViewPopup!: boolean;
    @Input()
    driverList: DriverInfoFetch[] = [];
    driverDate: DateInput = {
        date: ""
    }
    dateWiseTrips: TripPlanFetch[] = [];
    parameter: ParameterForTripPlanFetch = {
        companyId: "",
        dateList: []
    }

    constructor(private utilService: UtilService, private matDialog: MatDialog, private languageService: LanguageService, private createScheduleOperationService: CreateScheduleOperationService) { }

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.DRIVER_SCHEDULE_COMPONENT, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.DRIVER_SCHEDULE_COMPONENT;
        this.hrs = this.calculateTimeSlots(this.startTime);

        this.dateSpecReqData = this.getTimeScheduleViewData(this.driverBandViewList, this.startTime);
    }
    uiLabels: any = {
        driver: "Driver"
    }
    hrs: any;
    dateSpecReqData: any;
    onClickShowBtn(driverDate: DateInput) {
        if (driverDate.date.length == 8) {
            driverDate.date = driverDate.date + "000000";
        }
        this.parameter.companyId = this.utilService.getCompanyIdCookie();
        this.parameter.dateList = [];
        this.parameter.dateList.push(driverDate.date);

        // this.driverBandViewList = [];
        this.getTripList(driverDate);

    }
    getTripList(driverDate: DateInput) {

        this.createScheduleOperationService.getDatewiseTripList(this.parameter).subscribe((data) => {

            // if (data) {
            this.dateWiseTrips = data;
            this.driverBandViewList = this.prepareDriverScheduleData(driverDate);
            this.hrs = this.calculateTimeSlots(this.startTime);

            this.dateSpecReqData = this.getTimeScheduleViewData(this.driverBandViewList, this.startTime);
            // }


        });
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
            // this.column.forEach(column => {
            //     column.tripPlan.forEach(trip => {
            //         if (trip.date == data.date) {
            //             trip.tripList.forEach(tripInfo => {
            //                 if (tripInfo.driverId == driverBandView.driverId) {
            //                     driverBandView.tripList.push(tripInfo);
            //                 }
            //             });
            //         }
            //     });
            // });
            this.dateWiseTrips.forEach(trip => {

                var langIndex = this.utilService.getSelectedLanguageIndex();
                if (langIndex == AppConstant.LANG_INDEX_JPN) {
                    var monthDate = data.date.substring(2);
                    if (trip.date.includes(monthDate)) {
                        trip.tripList.forEach(tripInfo => {
                            if (tripInfo.driverId == driverBandView.driverId) {
                                driverBandView.tripList.push(tripInfo);
                            }

                        });
                    }

                } else if (trip.date == data.date) {
                    trip.tripList.forEach(tripInfo => {
                        if (tripInfo.driverId == driverBandView.driverId) {
                            driverBandView.tripList.push(tripInfo);
                        }

                    });
                }

            });
            driverBandViewList.push(driverBandView);
        });
        return driverBandViewList;
    }
    prepareDriverViewPopupData(tripInfoId: string, driverId: string): TripInfo {

        var tripForIndividualDriverForTimeSlot: TripInfo = {} as TripInfo
        this.driverBandViewList.forEach(driverBandView => {
            if (driverBandView.driverId == driverId) {
                driverBandView.tripList.forEach(trip => {
                    if (trip.tripInfoId == tripInfoId) {
                        tripForIndividualDriverForTimeSlot = trip;
                    }
                });
            }
        });
        return tripForIndividualDriverForTimeSlot;
    }
    onClickDriverBand(slot: any, driverName: string, driverId: string) {
        var tripForIndividualDriverForTimeSlot: TripInfo = this.prepareDriverViewPopupData(slot.tripId, driverId);
        const dialogRef = this.matDialog.open(DriverBandViewPopupComponent, {
            width: "65%",
            data: {
                driverTrip: tripForIndividualDriverForTimeSlot,
                driverName: driverName
            },
            // Object.assign({}, this.addTripPopupData),
            // disableClose: true
        });


    }






    selectColor = (slot: { isSelected: number; }) => {
        var styleObj = {
            "background-color": ""
        };
        if (slot.isSelected == 1) {
            styleObj = { "background-color": "#006400" };
        } else {
            // styleObj.width = 45 + "px";
        }
        return styleObj;
    };

    startTime = 700;

    // driverBandViewList = [
    //     {
    //         "driverName": "Driver X",
    //         "tripList": [
    //             {
    //                 "tripInfoId": 1,
    //                 "startTime": "7:00",
    //                 "endTime": "9:30"
    //             },
    //             {
    //                 "tripInfoId": 2,
    //                 "startTime": "18:00",
    //                 "endTime": "22:00"
    //             }
    //         ]
    //     },
    //     {
    //         "driverName": "Driver Y",
    //         "tripList": [
    //             {
    //                 "tripInfoId": 1,
    //                 "startTime": "10:00",
    //                 "endTime": "10:30"
    //             },
    //             {
    //                 "tripInfoId": 2,
    //                 "startTime": "15:00",
    //                 "endTime": "17:00"
    //             }
    //         ]
    //     }
    // ];



    viewData = [
        {
            "driverName": "",
            "tripList": [
                {
                    "slot": 0,
                    "isSelected": 0,
                    "tripId": ""
                }
            ]
        }
    ]

    calculateTimeSlots(startTime: any) {
        var arr: any[] = [];
        var t = startTime;
        arr.push(t);
        for (var i = 0; i < 30; i++) {
            t = t + 30;
            if (t % 100 == 60) {
                t = t + 40;
            }
            if (t < 2400) {
                arr.push(t);
            } else {
                t = t % 2400;
                arr.push(t);
            }
        }

        arr.forEach((time, ind) => {
            var hr = Math.floor(parseInt(time) / 100) + "";
            var min = time % 100 + "";
            hr = (hr.length < 2) ? "0" + hr : hr;
            min = (min.length < 2) ? min + "0" : min
            arr[ind] = hr + ":" + min;
        });
        return arr;
    }

    getTimeScheduleViewData(initData: DriverBandView[], startTime: any) {

        function prepareSlotList(startTime: any) {
            var t = startTime;
            var tripList = [];
            for (var i = 0; i <= 30; i++) {
                var info = {
                    "slot": 0,
                    "isSelected": 0,
                    "tripId": ""
                };
                if (t % 100 == 60) {
                    t = t + 40;
                }
                info.slot = t;
                info.isSelected = 0;

                tripList.push(info);

                t = t + 30;
            }
            return tripList;
        }

        function getTimeToNumber(strTime: string) {
            var numTime = strTime.replace(':', '');
            return parseInt(numTime);
        }

        function prepareSlotes(initSlots: TripInfo[], startTime: any) {
            var slotList = prepareSlotList(startTime);

            slotList.forEach(function (viewSlot) {
                if (viewSlot) {
                    initSlots.forEach(function (slotItem) {
                        if (slotItem) {
                            var startTime = getTimeToNumber(slotItem.startTime);
                            var endTime = getTimeToNumber(slotItem.endTime);
                            viewSlot.tripId = slotItem.tripInfoId;
                            if (startTime <= viewSlot.slot && viewSlot.slot < endTime) {
                                viewSlot.isSelected = 1;

                            }
                        }
                    });
                }
            });

            return slotList;
        }

        function prepareViewData(initData: any[], startTime: any) {
            var viewData: { driverName: string; tripList: never[]; }[] = [];

            initData.forEach(function (driverBandViewList) {
                var info: any = {
                    "driverName": "",
                    "driverId": "",
                    "tripList": []
                };
                info.driverName = driverBandViewList.driverName;
                info.driverId = driverBandViewList.driverId;
                info.tripList = prepareSlotes(driverBandViewList.tripList, startTime);

                viewData.push(info);
            });
            return viewData;
        }

        function initPreparation(initData: any, startTime: any) {
            var viewData: { driverName: string; tripList: never[]; }[] = [];
            if (initData) {
                viewData = prepareViewData(initData, startTime);
            }
            return viewData;
        }

        return initPreparation(initData, startTime);
    }



}
