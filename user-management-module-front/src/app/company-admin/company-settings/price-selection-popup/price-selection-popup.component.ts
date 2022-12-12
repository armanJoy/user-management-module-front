import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { CompWasteInfoFetch, WasteItemDef } from 'src/app/models/backend-fetch/company-settings-fetch';
import { PriceInfoUpdate } from 'src/app/models/backend-update/company-settings-update';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-price-selection-popup',
    templateUrl: './price-selection-popup.component.html',
    styleUrls: ['./price-selection-popup.component.css']
})
export class PriceSelectionPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;
    isTransporter!: boolean;
    companyWaste!: WasteItemDef
    isProcessorCompany!: boolean;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.PRICE_SELECTION_POPUP;

        if (this.data) {
            this.data = Object.assign({}, this.data);
            this.companyWaste = this.data.wasteInfo;
            this.isTransporter = this.data.transporter;
            this.isProcessorCompany = this.data.processor
        }

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    )

    // setPrice() {
    //     if (this.companyWaste) {
    //         this.companyWaste.wasteId = this.companyWaste.wasteId;
    //         this.dialogRef.close(this.companyWaste);
    //     }
    // }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.PRICE_SELECTION_POPUP, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "basePriceSelect": "Set Price",
    //     "addButton": "Save",
    //     "wasteCategory": "Waste Type",
    //     "wasteItem": "Waste Item",
    //     "unitDef": "Waste Unit",
    //     "transportPrice": "Transport Price",
    //     "processingPrice": "Processing Price",
    //     "close": "Close",
    //     "remarks": "Remarks",
    // }

}
