import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { WasteRequestInfo } from 'src/app/models/backend-fetch/company-settings-fetch';
import { WasteRequestService } from 'src/app/services/operation-services/waste-request/waste-request.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-waste-request-tabs',
    templateUrl: './waste-request-tabs.component.html',
    styleUrls: ['./waste-request-tabs.component.css']
})
export class WasteRequestTabsComponent implements OnInit {

    viewComponent = false;
    constructor(public wasteRequestService: WasteRequestService, private languageService: LanguageService, private utilService: UtilService) { }

    wasteRequestList: WasteRequestInfo[] = [];
    selectedWaste: WasteRequestInfo = {} as WasteRequestInfo;
    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.wasteRequestService.getWasteRequestInfoList(AppConstant.INITIAL_PAGE_NO, AppConstant.INITIAL_SEARCH_TEXT, AppConstant.NEW_FILTER).subscribe((waste) => {
            if (waste) {
                this.wasteRequestList = this.wasteRequestService.prepareWasteRequestView(waste);
            }
            this.viewComponent = true;

        })
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.WASTE_REQUEST_TABS;


    }

    public selectTab = (index: number, wasteRequest: WasteRequestInfo): void => {
        this.selectedIndex = index;
        this.selectedWaste = wasteRequest;

    }

    selectedIndex = 0;
    indexChange(index: any) {
        this.selectedIndex = index

    }


    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.WASTE_REQUEST_TABS, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "wasteRequestListTab": "Waste Request List",
    //     "requestResponseTab": "Request Response",
    //     "createWasteTab": "Create Waste"
    // }

}
