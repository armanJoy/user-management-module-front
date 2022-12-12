import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementInvoiceWasteInfo, AgreementWasteProcessInfo } from 'src/app/models/backend-fetch/business-agreement';
import { ProjectInfoFetch, AgreementPopupView, AgreementInfoFetch, WasteCollectionInfoFetch, WasteCollectionInfoView, AgreementPopupSaveDetails, DisposalInfoFetch, ProjectWasteItem, wasteProcessInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-waste-pick-tab',
    templateUrl: './waste-pick-tab.component.html',
    styleUrls: ['./waste-pick-tab.component.css']
})
export class WastePickTabComponent implements OnInit {

    @Input()
    selectedAgreementInvoiceWasteList!: AgreementInvoiceWasteInfo[];

    @Input()
    agreementProcessList!: AgreementWasteProcessInfo[];

    @Input()
    processList!: wasteProcessInfoFetch[];

    @Input()
    disposalList!: DisposalInfoFetch[];

    @Input()
    finalDisposalList!: DisposalInfoFetch[];

    @Input()
    wastePickList!: WasteCollectionInfoFetch[];

    @Input()
    projectWasteItemList!: ProjectWasteItem[];

    @Input()
    public Save!: (index: number, saveData: AgreementPopupSaveDetails, flag: boolean) => void;

    @Input()
    wasteCollectionList!: WasteCollectionInfoView[];

    @Input()
    projectInfo!: ProjectInfoFetch;

    @Input()
    agreement!: AgreementInfoFetch[];

    @Input()
    public selectTab!: (index: number, colleection: WasteCollectionInfoView[], disposalList: DisposalInfoFetch[], flag: boolean,) => void;

    @Input()
    public saveAgreementForMenifesto!: () => void;

    @Input()
    agreementData!: AgreementPopupView;

    // @Input()
    // public selectTab1!: (index: number) => void;

    constructor(private languageService: LanguageService, private utilService: UtilService, private breakpointObserver: BreakpointObserver) { }

    viewContent = false;
    componentCode!: string;
    isSystemAdmin: boolean = false;
    trasportInvoice: string = AppConstant.TRANSPORTER_INVOICE;
    processInvoice: string = AppConstant.PROCESSOR_INVOICE;

    ngOnInit(): void {
        if (this.wasteCollectionList && this.agreement) {
            this.viewContent = true;
        }

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.WASTE_PICK_TAB_COMPONENT, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.WASTE_PICK_TAB_COMPONENT;
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    uiLabels: any = {
        agreementTitle: "Agreement Title",
        agreementValidDate: "Agreement Valid Date",
        pickLocation: "Pick Location",
        backBtn: "Back",
        nextBtn: "Next",
        saveBtn: "Save",
        dropLocation: "Drop Location",
        wasteItem: "Waste Item",
        disposalId: "Disposal Id",
        addPickBtn: "Add Pick",
        pickQuantity: "Pick Quantity",
        date: "Date",
        to: "To",
        from: "From"
    }

    TabChange() {
        this.selectTab(2, this.wasteCollectionList, this.disposalList, false);
    }

    tabChangeToPrevious() {
        this.selectTab(0, this.wasteCollectionList, this.disposalList, true);
    }

    onClickAddPickButton(oldPick: DisposalInfoFetch, index: number) {
        var newPick: DisposalInfoFetch = Object.assign({}, oldPick)
        newPick.disposalInfoId = this.utilService.generateUniqueId();
        newPick.isParent = false;
        newPick.disposalViewId = "" + this.searchChildDisposal(newPick.collectionId);
        this.disposalList.push(newPick);
        // this.disposalList.splice(index + 1, 0, newPick);
        // this.disposalList[index + 1].isParent = false;
    }

    filterDisposeList(wasteCollectionId: string) {
        return this.disposalList.filter(dispose => dispose.collectionId == wasteCollectionId).sort((a, b) => ((!a.isParent) ? 1 : -1));
    }

    searchChildDisposal(collectionId: string): number {
        var child: number = 1;
        this.disposalList.forEach(disposal => {
            if (disposal.collectionId == collectionId) {
                child++;
            }
        });
        return child;
    }

    onClick(flag: boolean) {
        this.selectTab(1, this.wasteCollectionList, this.finalDisposalList, flag);
        // this.prepareAgreementPopupSaveDetails();
        // this.Save(1, this.agreementPopupSaveDetails, flag);
    }

    prepareAgreementPopupSaveDetails() {
        this.agreementPopupSaveDetails.selectAgreement = this.agreement;
        this.agreementPopupSaveDetails.selectDiposalList = this.finalDisposalList;
        this.agreementPopupSaveDetails.selectProceessList = this.processList;
        this.agreementPopupSaveDetails.selectedWasteItemList = this.projectWasteItemList;
    }

    removePickButton(dispose: DisposalInfoFetch, index: number) {
        var index: number = this.disposalList.findIndex(item => item.disposalInfoId == dispose.disposalInfoId);
        if (index >= 0) {
            this.disposalList.splice(index, 1);
        }

    }

    onWasteAccordionClick(event: any, wastePanel: any) {
        this.utilService.stopEventPropagation(event);
        wastePanel.close();

    }

    onWasteCheck(item: any, wastePanel: any, event: any) {

        if (!item.isCheck) {
            wastePanel.close()
        } else {
            wastePanel.open();
        }
        this.utilService.stopEventPropagation(event);
    }

    agreementPopupSaveDetails: AgreementPopupSaveDetails = {
        selectAgreement: [],
        selectDiposalList: [],
        selectProceessList: [],
        selectedWasteItemList: []
    };

    updateSelectionForManifestoWaste(item: WasteCollectionInfoView, event: any) {
        if (!(((this.agreementData.projectInfo && this.agreementData.projectInfo.projectInfoId != '') || this.agreementData.projectInfo != null) && item.isCheck)) {
            this.utilService.stopEventPropagation(event);
            item.isCheck = true;

            if (!this.agreementData.projectInfo || !this.agreementData.projectInfo.projectInfoId) {
                this.wasteCollectionList.forEach(element => {
                    element.isCheck = (element.wasteItemId == item.wasteItemId) ? true : false;

                });
            }

        }
    }
}
