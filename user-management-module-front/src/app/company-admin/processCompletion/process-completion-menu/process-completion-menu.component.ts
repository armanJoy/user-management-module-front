import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { MenifestoInfo, SearchDate } from 'src/app/models/backend-fetch/menifesto';
import { MenifestoService } from 'src/app/services/operation-services/menifesto.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-process-completion-menu',
    templateUrl: './process-completion-menu.component.html',
    styleUrls: ['./process-completion-menu.component.css']
})
export class ProcessCompletionMenuComponent implements OnInit {

    constructor(private menifestoService: MenifestoService, private utilService: UtilService, private languageService: LanguageService) { }
    viewComponent = false;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    companyId: string = this.utilService.getCompanyIdCookie();

    startDate: string = this.utilService.getStartDate();
    endDate: string = this.utilService.getEndDate();

    manifestoInfoList: MenifestoInfo[] = [];
    selectedManifestoList: MenifestoInfo[] = [];
    checkedManifesto: MenifestoInfo[] = [];
    manifestoListTabView: boolean = true;
    addDateTabView: boolean = false;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.PROCESS_COMPLETION_MENU;
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.getGeneratedManifestoList(this.searchDate, AppConstant.INITIAL_PAGE_NO, AppConstant.INITIAL_SEARCH_TEXT, AppConstant.PROCESS_COMPLETE_PROGRESS_FILTER);

    }

    searchDate: SearchDate = {
        companyId: "",
        startDate: "",
        endDate: "",

    }

    getGeneratedManifestoList(searchDate: SearchDate, pageNo: number, searchText: string, status: string) {
        searchDate.companyId = this.utilService.getCompanyIdCookie();
        this.menifestoService.getMenifestoInitialInfo(searchDate, pageNo, searchText, status).subscribe((menifesto) => {

            if (menifesto) {
                this.manifestoInfoList = menifesto;
            }
            this.viewComponent = true;

        })
    }

    prepareSelectedManifestoList(manifestoList: MenifestoInfo[], callBack: any) {
        var selectedManifestoList: MenifestoInfo[] = [];
        if (manifestoList) {

            var count = 0;
            manifestoList.forEach(manifesto => {

                this.menifestoService.getMenifestoDetailInfo(manifesto.menifestoInfoId).subscribe(response => {
                    if (response) {
                        response.isCheck = true;
                        selectedManifestoList.push(response);
                        count++;
                    }

                    if (count == manifestoList.length) {
                        callBack(selectedManifestoList);
                    }
                })
            })
        }

    }

    public selectTab = (index: number, manifestoInfoList: MenifestoInfo[]): void => {

        this.prepareSelectedManifestoList(manifestoInfoList, ((menifestoDetailList: MenifestoInfo[]) => {
            this.selectedManifestoList = menifestoDetailList;
            this.selectedIndex = index;
            this.addDateTabView = true;
            this.manifestoListTabView = false;
        }));
    }
    public manifestoListView = (): void => {
        this.addDateTabView = false;
        this.manifestoListTabView = true;
    }
    selectedIndex = 0;
    indexChange(index: any) {
        this.selectedIndex = index;
        if (index == 0) {
            this.checkedManifesto = [];
            this.searchByText();
        }
    }

    searchByText() {
        var pageNo: number = JSON.parse(JSON.stringify(this.utilService.getPageNo()));
        var searchText: string = JSON.parse(JSON.stringify(this.utilService.getSearchText()));

        if (!searchText) {
            searchText = '';
        }

        if (!pageNo) {
            pageNo = 0;
        }
        if (this.searchDate) {
            this.searchDate.companyId = this.utilService.getCompanyIdCookie();
            this.getGeneratedManifestoList(this.searchDate, pageNo, searchText, AppConstant.PROCESS_COMPLETE_PROGRESS_FILTER);
        }


    }

    uiLabels: any = {
        manifestoListTab: "Manifesto List",
        addDisposalDateTab: "Add Date",

    }

}
