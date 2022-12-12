import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AppConstant } from 'src/app/config/app-constant';

@Component({
    selector: 'app-project-basic-info',
    templateUrl: './project-basic-info.component.html',
    styleUrls: ['./project-basic-info.component.css']
})
export class ProjectBasicInfoComponent implements OnInit {

    @Input()
    public project: ProjectInfoFetch = {} as ProjectInfoFetch;

    @Input()
    public projectViewPopupOpen!: (project: ProjectInfoFetch) => void;

    @Input()
    public tabChangeForCopyProject!: (project: ProjectInfoFetch) => void;

    @Input()
    public tabChangeForEditProject!: (project: ProjectInfoFetch, selectedProcess?: any) => void;

    @Input()
    public viewSchedulePopupOpen!: (project: ProjectInfoFetch) => void;

    @Input()
    public redirectToCreateSchedule!: (project: ProjectInfoFetch) => void;

    @Input()
    public redirectToProcessCompletion!: () => void;

    constructor(private breakpointObserver: BreakpointObserver, public utilService: UtilService, private matDialog: MatDialog, private languageService: LanguageService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;
    uiLabels: any = {};

    companyId: string = this.utilService.getCompanyIdCookie();
    dumperCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.DUMPER_CATEGORY_VALUE_ID);
    transporterCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.TRANSPOTER_CATEGORY_VALUE_ID);
    processorCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.PROCESSOR_CATEGORY_VALUE_ID);

    ngOnInit(): void {

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.PROJECT_LIST_DASH_BOARD_TAB_COMPONENT, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.PROJECT_LIST_DASH_BOARD_TAB_COMPONENT;
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    openProjectViewPopup(project: ProjectInfoFetch, event: any) {
        this.utilService.stopEventPropagation(event);

        this.projectViewPopupOpen(project);
    }
}
