import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AgreementPartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { CompanyInfoUpdate } from 'src/app/models/backend-update/company-settings-update';
import { AppConstant } from 'src/app/config/app-constant';
import { MenifestoInfo } from 'src/app/models/backend-fetch/menifesto';

@Component({
    selector: 'app-cash-manifest-tab',
    templateUrl: './cash-manifest-tab.component.html',
    styleUrls: ['./cash-manifest-tab.component.css']
})

export class CashManifestTabComponent implements OnInit {

    @Input()
    cashManifestoList!: MenifestoInfo[];

    @Input()
    public generateCashInvoice!: (selectedManifestoIds: string[]) => void;



    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, private businessAgreementService: BusinessAgreementService) { }


    selectedCompanyIdList: string[] = [];
    uiLabels: any = {
        headerLabel: "Manifesto List",
        generateInvoice: "Generate Invoice"
    };
    viewContent = false;
    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit() {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.CASH_MANIFESTO_TAB;
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedManifesto = new Set<MenifestoInfo>()
    onSelectionChanage = (item: MenifestoInfo, event: any, isChecked: boolean) => {
        debugger
        this.utilService.stopEventPropagation(event);
        if (isChecked) {
            this.selectedManifesto.add(item);
        } else {
            this.selectedManifesto.delete(item);
        }

    }

    generateCashInvoiceForSelectedManifesto() {
        this.generateCashInvoice([...this.selectedManifesto].map((item: MenifestoInfo) => item.menifestoInfoId));
    }
}
