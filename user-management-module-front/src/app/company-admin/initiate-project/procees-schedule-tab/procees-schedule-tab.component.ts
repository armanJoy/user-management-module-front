import { Component, OnInit, Input } from '@angular/core';
import { AgreementInfoFetch, WasteCollectionInfoFetch, DisposalInfoFetch, ProjectWasteItem, wasteProcessInfoFetch, AgreementPopupSaveDetails } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-procees-schedule-tab',
    templateUrl: './procees-schedule-tab.component.html',
    styleUrls: ['./procees-schedule-tab.component.css']
})
export class ProceesScheduleTabComponent implements OnInit {

    @Input()
    processList!: wasteProcessInfoFetch[];

    @Input()
    disposalList!: DisposalInfoFetch[];

    @Input()
    agreement!: AgreementInfoFetch[];

    @Input()
    wastePickList!: WasteCollectionInfoFetch[];

    @Input()
    public selectTab!: (index: number, saveData: AgreementPopupSaveDetails, flag: boolean) => void;

    @Input()
    projectWasteItemList!: ProjectWasteItem[];

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.PROCEES_SCHEDULE_TAB_COMPONENT, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.PROCEES_SCHEDULE_TAB_COMPONENT;
    }

    uiLabels: any = {
        backBtn: "Back",
        saveBtn: "Save",
        wasteItem: "Waste Item",
        quantity: "Quantity",
        price: "Price",
        totalPrice: "Total Price",
        date: "Date",
        from: "From",
        to: "To"
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    prepareAgreementPopupSaveDetails() {
        this.agreementPopupSaveDetails.selectAgreement = this.agreement;
        this.agreementPopupSaveDetails.selectDiposalList = this.disposalList;
        this.agreementPopupSaveDetails.selectProceessList = this.processList;
        this.agreementPopupSaveDetails.selectedWasteItemList = this.projectWasteItemList;
    }

    prepareTotalprice(unitPrice: number, index: number) {
        this.processList[index].totalPrice = this.processList[index].quantity * unitPrice;
    }

    onClick(flag: boolean) {
        this.prepareAgreementPopupSaveDetails();
        this.selectTab(2, this.agreementPopupSaveDetails, flag);
    }

    agreementPopupSaveDetails: AgreementPopupSaveDetails = {
        selectAgreement: [{
            companyId: "",
            agreementId: "",
            agreementTitle: "",
            agreementValidDate: "",
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
                companyName: "",
                personIncharge: "",
                personInchargeEmail: "",
                assignRoles: ""
            },
            wastePickList: [],
            processList: [],
            invoiceReceiverComId: '',
            isTransportPriceApply: true,
            isProcessingPriceApply: true,
            agreementInvoiceWasteList: []
        }],
        selectDiposalList: [],
        selectProceessList: [],
        selectedWasteItemList: []

    };
}
