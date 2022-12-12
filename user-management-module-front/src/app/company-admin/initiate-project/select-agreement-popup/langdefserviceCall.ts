ADD_PICK_POPUP_COMPONENT: 'AddPickPopupComponent',
    ADD_TRIP_POPUP: 'AddTripPopupComponent',
        CREATE_SCHEDULE_MENU: 'CreateScheduleMenuComponent',

            DRIVER_BAND_VIEW_POPUP: 'DriverBandViewPopupComponent',


                DRIVER_SCHEDULE_COMPONENT: 'DriverScheduleComponent',

                    PROJECT_INFO_TAB: 'ProjectInfoTabComponent',

                        PROJECT_TRIP_SCHEDULE_TAB: 'ProjectTripScheduleComponent',

                            SCHEDULE_DASHBOARD_TAB: 'ScheduleDashboardTabComponent',

                                TRIP_DETAILS_POPUP: 'TripDetailsPopupComponent',

                                    VEHICLE_TRIP_MATRIX: 'VehicleTripMatrixComponent',

                                        VEHICLE_TRIP_SCHEDULE_TAB: 'VehicleTripScheduleComponent'




private languageService: LanguageService,



    componentCode!: string;

isSystemAdmin: boolean = false;

private utilService: UtilService,


    this.isSystemAdmin = this.utilService.languageEditMode();
this.componentCode = AppConstant.COMP.CREATE_NEW_PROJECT_TAB_COMPONENT;

<span * ngIf="isSystemAdmin" >
    <app-lang - def - button[componentCode]="componentCode" >
        </app-lang-def-button>
        < /span>