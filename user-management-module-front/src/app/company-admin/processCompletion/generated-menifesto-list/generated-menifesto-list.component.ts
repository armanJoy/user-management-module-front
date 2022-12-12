import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { MenifestoInfo, SearchDate } from 'src/app/models/backend-fetch/menifesto';
import { MenifestoService } from 'src/app/services/operation-services/menifesto.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { ManualmenifestoTabComponent } from '../../menifesto/manualmenifesto-tab/manualmenifesto-tab.component';
import { ConfirmCompletionRevertComponent } from '../confirm-completion-revert/confirm-completion-revert.component';

@Component({
    selector: 'app-generated-menifesto-list',
    templateUrl: './generated-menifesto-list.component.html',
    styleUrls: ['./generated-menifesto-list.component.css']
})
export class GeneratedMenifestoListComponent implements OnInit {

    @Input()
    fromProcessCompletion: boolean = false;

    @Input()
    manifestoInfoList: MenifestoInfo[] = [];

    @Input()
    addDatetab = false;

    @Input()
    public selectTab!: (index: number, manifestoInfoList: MenifestoInfo[]) => void;

    @Input()
    selectedManifesto: MenifestoInfo[] = [];

    constructor(private menifestoService: MenifestoService, private breakpointObserver: BreakpointObserver, private utilService: UtilService, private languageService: LanguageService, public dialog: MatDialog) { }

    viewComponent = false;
    componentCode: string = '';
    isSystemAdmin: boolean = false;

    startDate: string = this.utilService.getStartDate();
    endDate: string = this.utilService.getEndDate();

    companyId: string = this.utilService.getCompanyIdCookie();
    filter: string = AppConstant.PROCESS_COMPLETE_PROGRESS_FILTER;
    complatedFilter: string = AppConstant.COMPLATED_FILTER;
    OperationFilter: string = AppConstant.PROCESS_COMPLETE_PROGRESS_FILTER;

    pageSize: number = AppConstant.DXR_LIST_VIEW_PAGE_SIZE;
    dataEndsLabel: string = AppConstant.Data_Ends_Label;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.GENERATED_MANIFESTO_LIST;

        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);


        this.searchByText();

        this.viewComponent = true;
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    searchDate: SearchDate = {
        companyId: "",
        startDate: "",
        endDate: ""
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

        var filterString: string = (this.filter == AppConstant.PROCESS_COMPLETE_PROGRESS_FILTER) ? this.OperationFilter : this.complatedFilter;
        if (this.searchDate) {
            this.searchDate.companyId = this.companyId;
            this.getManifesto(this.searchDate, pageNo, searchText, filterString);
        }

    }

    getManifesto(searchDate: SearchDate, pageNo: number, searchText: string, status: string) {
        searchDate.companyId = this.companyId;
        this.menifestoService.getMenifestoInitialInfo(searchDate, pageNo, searchText, status).subscribe((manifestoList) => {
            if (manifestoList) {
                this.manifestoInfoList = manifestoList;
            }
        })
    }

    addDate(selectedManifesto: MenifestoInfo[]) {
        var itemChecked = false;
        selectedManifesto.forEach((item) => {
            if (item.isCheck) {
                itemChecked = true;
            }
        });

        if (itemChecked) {
            this.selectTab(1, selectedManifesto);

        } else {
            this.utilService.showSnackbar(this.uiLabels.selectManifestoToRevertToast, 3000);
        }
    }

    detailsVeiw(Manifesto: MenifestoInfo) {
        const sampleDialog = this.dialog.open(ManualmenifestoTabComponent, {
            width: '75%',
            height: '55%',
            data: Manifesto,
            // disableClose: true
        });
    }
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    confirmRevertOfProcessCompletion() {
        var selectedManifestoList: MenifestoInfo[] = [];

        this.manifestoInfoList.forEach(eachManifest => {
            if (eachManifest.isCheck) {
                selectedManifestoList.push(JSON.parse(JSON.stringify(eachManifest)));
            }
        });

        if (selectedManifestoList && selectedManifestoList.length > 0) {
            const confirmCompletionRevertComponentPopup = this.dialog.open(ConfirmCompletionRevertComponent, {
                height: '75%',
                width: '55%',
                data: selectedManifestoList
            });

            confirmCompletionRevertComponentPopup.afterClosed().subscribe(response => {

                if (response) {
                    this.saveRevertedManifesto(JSON.parse(JSON.stringify(selectedManifestoList)));
                }
            });

        } else {
            this.utilService.showSnackbar(this.uiLabels.selectManifestoToRevertToast, 3000);
        }
    }

    saveRevertedManifesto(selectedManifestoList: MenifestoInfo[]) {
        if (selectedManifestoList) {

            selectedManifestoList.forEach(manifesto => {

                manifesto.manualManifesto.processorInfo.disposeComplateDate = '';
                manifesto.manualManifesto.processorInfo.finalDisposeComplateDate = '';
                manifesto.menifestoStatus = AppConstant.MENIFESTO_STATUS_UNLOADED;
                manifesto.manualEdit = true;
                // if (manifesto.manualManifesto.date && manifesto.manualManifesto.transportInfo.transportComplateDate && manifesto.manualManifesto.transportInfo.transportComplateDateB2) {

                //     manifesto.menifestoStatus = AppConstant.MENIFESTO_STATUS_LOADED;

                //     if (manifesto.manualManifesto.processorInfo.processingComplateDate && manifesto.manualManifesto.processorInfo.processingComplateDateC2) {
                //         manifesto.menifestoStatus = AppConstant.MENIFESTO_STATUS_UNLOADED;

                //         if (manifesto.manualManifesto.processorInfo.disposeComplateDate && manifesto.manualManifesto.processorInfo.finalDisposeComplateDate) {
                //             manifesto.menifestoStatus = AppConstant.MENIFESTO_PROCESSING_COMPLETE_STATUS;
                //         }
                //     }
                // }
            });

            this.menifestoService.savePorcessComaplateDate(selectedManifestoList).subscribe((data) => {
                if (data == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {
                    this.utilService.showSnackbar(this.uiLabels.revertCompleteToast, 3000);
                    this.searchByText();
                }
            });
        }
    }

    uiLabels: any = {
        listHeader: "Manifesto List",
        addDate: "Add Date",
        receiveDate: "Receive Date",
        projectName: "Projec Name",
        wasteItems: "Waste Items",
        dumperCompanyName: "Dumper Company Name",
        processorCompanyName: "Processor Company Name",
        transportCompanyName: "Transport Company Name",
        inOperation: "In Operation",
        completed: "Completed",
        filter: "Filter",
        details: "Details"

    }

}
