import { Component, OnInit, Input } from '@angular/core';
import { ProjectInfoFetch, AgreementInfoFetch, WasteCollectionInfoFetch, DisposalInfoFetch, wasteProcessInfoFetch, ProjectWasteItem, AgreementPopupSaveDetails } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
@Component({
    selector: 'app-pick-schedule-tab',
    templateUrl: './pick-schedule-tab.component.html',
    styleUrls: ['./pick-schedule-tab.component.css']
})
export class PickScheduleTabComponent implements OnInit {

    @Input()
    processList!: wasteProcessInfoFetch[];

    @Input()
    disposalList!: DisposalInfoFetch[];

    @Input()
    projectInfo!: ProjectInfoFetch;

    @Input()
    agreement!: AgreementInfoFetch[];

    @Input()
    wastePickList!: WasteCollectionInfoFetch[];

    @Input()
    projectWasteItemList!: ProjectWasteItem[];

    @Input()
    public selectTab!: (index: number, disposalList: DisposalInfoFetch[], flag: boolean) => void;

    @Input()
    public Save!: (index: number, saveData: AgreementPopupSaveDetails, flag: boolean) => void;

    constructor(private breakpointObserver: BreakpointObserver, private utilService: UtilService, private languageService: LanguageService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.PICK_SCHEDULE_TAB_COMPONENT, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.PICK_SCHEDULE_TAB_COMPONENT;
    }

    uiLabels: any = {
        backBtn: "Back",
        nextBtn: "Next",
        wasteItem: "Waste Item",
        disposalId: "Disposal Id",
        addPickBtn: "Add Pick",
        pickLocation: "Pick Location",
        dropLocation: "Drop Location",
        pickQuantity: "Pick Quantity",
        date: "Date",
        to: "To",
        from: "From"
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    onClickAddPickButton(oldPick: DisposalInfoFetch, index: number) {
        var newPick: DisposalInfoFetch = Object.assign({}, oldPick)
        newPick.disposalInfoId = this.utilService.generateUniqueId();
        newPick.isParent = false;
        newPick.disposalViewId = "" + this.searchChildDisposal(newPick.collectionId);
        this.disposalList.splice(index + 1, 0, newPick);
        // this.disposalList[index + 1].isParent = false;
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

    TabChanage(flag: boolean) {
        if (!flag) {
            this.selectTab(3, this.disposalList, flag);
        }
        else {
            this.selectTab(1, this.disposalList, flag);
        }
    }

    onClick(flag: boolean) {
        this.selectTab(1, this.disposalList, flag);
        this.prepareAgreementPopupSaveDetails();
        this.Save(2, this.agreementPopupSaveDetails, flag);
    }

    prepareAgreementPopupSaveDetails() {
        this.agreementPopupSaveDetails.selectAgreement = this.agreement;
        this.agreementPopupSaveDetails.selectDiposalList = this.disposalList;
        this.agreementPopupSaveDetails.selectProceessList = this.processList;
        this.agreementPopupSaveDetails.selectedWasteItemList = this.projectWasteItemList;
    }

    agreementPopupSaveDetails: AgreementPopupSaveDetails = {
        selectAgreement: [],
        selectDiposalList: [],
        selectProceessList: [],
        selectedWasteItemList: []

    };
}
