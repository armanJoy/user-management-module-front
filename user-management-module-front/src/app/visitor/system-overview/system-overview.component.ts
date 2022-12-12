import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaticPageFetch } from 'src/app/models/backend-fetch/dxr-system';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { SystemOverviewService } from 'src/app/services/visitor-services/system-overview.service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { HowToUseItComponent } from './how-to-use-it/how-to-use-it.component';
import { IntroductionFlowComponent } from './introduction-flow/introduction-flow.component';
import { CompanyUsingItComponent } from './company-using-it/company-using-it.component';
import { CostingComponent } from './costing/costing.component';
import { CaseStudyComponent } from './case-study/case-study.component';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AppComponent } from 'src/app/app.component';
@Component({
    selector: 'app-system-overview',
    templateUrl: './system-overview.component.html',
    styleUrls: ['./system-overview.component.css']
})
export class SystemOverviewComponent implements OnInit, AfterViewInit {
    @ViewChild(CaseStudyComponent) childCaseStudy: any;
    @ViewChild(HowToUseItComponent) childHowToUseIt: any;
    @ViewChild(IntroductionFlowComponent) childIntroductionFlow: any;
    @ViewChild(CompanyUsingItComponent) childCompanyUsingIt: any;
    @ViewChild(CostingComponent) childCosting: any;


    constructor(private breakpointObserver: BreakpointObserver, private activatedroute: ActivatedRoute, private languageService: LanguageService, private systemOverviewService: SystemOverviewService, private utilService: UtilService, private appComponent: AppComponent) { }
    menuId: any;

    staticPage: StaticPageFetch = {
        staticPageId: '',
        staticContent: '',
        backendDate: '',
        frontendDate: '',
        dxrInfoCache: ''
    }
    caseStudyStaticPage: StaticPageFetch = {
        staticPageId: '',
        staticContent: '',
        backendDate: '',
        frontendDate: '',
        dxrInfoCache: ''
    }

    staticPages: StaticPageFetch[] = [];

    loadHtml = false;
    uiLabels: any;
    selectedIndex: any = 0;
    ngAfterViewInit() {
        // this.child.loadStaticContent();
    }
    componentCode!: string;
    isSystemAdmin: boolean = false;
    ngOnInit(): void {

        this.appComponent.getApplicationLabels().subscribe(data => {

            this.initViewComponent();

        });
    }

    initViewComponent() {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SYSTEM_OVERVIEW;


        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.SYSTEM_OVERVIEW, AppConstant.UI_LABEL_TEXT);

        this.systemOverviewService.getStaticPages().subscribe(data => {
            if (data && data.length > 0) {
                data.forEach(element => {
                    this.staticPages.push((element) ? element : this.staticPage);

                });

            }

            this.getStaticContent({ index: 0 });
        });

        this.activatedroute.paramMap.subscribe(params => {
            this.selectedIndex = params.get('menuId') ? params.get('menuId') : 0;
            this.getStaticContent({ index: this.selectedIndex });
        });
    }



    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    tabOrderMapToAppConstant = [
        AppConstant.Tabs[1].tabIndex, AppConstant.Tabs[2].tabIndex, AppConstant.Tabs[4].tabIndex, AppConstant.Tabs[0].tabIndex
    ]



    getStaticContent($event: any) {

        var index = this.tabOrderMapToAppConstant[$event.index];
        var eventIndex = $event.index;

        this.systemOverviewService.getStaticPage(AppConstant.Tabs[index].staticPageId, ((data: StaticPageFetch) => {
            this.loadHtml = true;

            setTimeout(() => {

                if (data) {
                    if (eventIndex == 0) {
                        // this.howToUseItStaticPage = data;
                        this.childHowToUseIt.loadStaticContent(data);
                        var howToUseItLabels: any = this.languageService.getUiLabels(AppConstant.COMP.HOW_TO_USE_IT, AppConstant.UI_LABEL_TEXT);
                        this.childHowToUseIt.setUiLabels(howToUseItLabels);
                    }
                    else if (eventIndex == 1) {
                        // this.introductionFlowStaticPage = data;
                        this.childIntroductionFlow.loadStaticContent(data);
                        var appIntroductionLabels: any = this.languageService.getUiLabels(AppConstant.COMP.INTORODUCTION_FLOW_TAB, AppConstant.UI_LABEL_TEXT);
                        this.childIntroductionFlow.setUiLabels(appIntroductionLabels);

                    } else if (eventIndex == 2) {
                        // this.costingStaticPage = data;
                        this.childCosting.loadStaticContent(data);
                        var appCostingLabels: any = this.languageService.getUiLabels(AppConstant.COMP.COSTING_TAB, AppConstant.UI_LABEL_TEXT);
                        this.childCosting.setUiLabels(appCostingLabels);
                    }
                    else if (eventIndex == 3) {
                        this.caseStudyStaticPage = data;
                        this.childCaseStudy.loadStaticContent(data);
                        var caseStudyLabels: any = this.languageService.getUiLabels(AppConstant.COMP.CASE_STUDY_TAB, AppConstant.UI_LABEL_TEXT);
                        this.childCaseStudy.setUiLabels(caseStudyLabels);

                    }
                    // else if (eventIndex == 4) {
                    //     // this.companyUsingItStaticPage = data;
                    //     this.childCompanyUsingIt.loadStaticContent(data);
                    // }
                }
            }, 200)
        }));
    }







}
