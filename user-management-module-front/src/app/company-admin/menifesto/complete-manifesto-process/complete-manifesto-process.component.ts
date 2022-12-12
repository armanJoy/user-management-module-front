import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { MenifestoInfo } from 'src/app/models/backend-fetch/menifesto';
import { LoadUnloadService } from 'src/app/services/operation-services/load-unload.service';
import { MenifestoService } from 'src/app/services/operation-services/menifesto.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';


@Component({
    selector: 'app-complete-manifesto-process',
    templateUrl: './complete-manifesto-process.component.html',
    styleUrls: ['./complete-manifesto-process.component.css']
})
export class CompleteManifestoProcessComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, private loadUnloadService: LoadUnloadService, private menifestoService: MenifestoService, public dialogRef: MatDialogRef<CompleteManifestoProcessComponent>) { }

    uiLabels: any = {
        headerLabel: 'Complete Manifesto Process',
        dateLabel: 'Process Completion Date',
        updateBtn: 'Complete Process',
        processCompletionToast: 'Completed Manifesto Process'

    };

    isSystemAdmin = this.utilService.languageEditMode();
    componentCode = AppConstant.COMP.COMPLETE_MANIFESTO_PROCESS_POPUP;

    viewComponet = false;

    completeDate: any = {
        date: ''
    }

    ngOnInit(): void {

        this.prepareInitialView();
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

    }

    prepareInitialView() {
        this.loadUnloadService.getCurrentDate().subscribe(response => {
            if (response) {
                this.completeDate.date = response.date;

            }

            this.viewComponet = true;
        });
    }

    completeProcess() {

        if (this.data) {
            this.saveProcessDate(this.data.manifestoData);
        }
    }

    saveProcessDate(manifesto: MenifestoInfo) {


        manifesto.manualManifesto.processorInfo.disposeComplateDate = this.completeDate.date;
        manifesto.manualManifesto.processorInfo.finalDisposeComplateDate = this.completeDate.date;
        manifesto.manualEdit = true;

        manifesto.manualManifesto.date = (manifesto.manualManifesto.date) ? manifesto.manualManifesto.date : this.completeDate.date;

        manifesto.manualManifesto.transportInfo.transportComplateDate = (manifesto.manualManifesto.transportInfo.transportComplateDate) ? manifesto.manualManifesto.transportInfo.transportComplateDate : this.completeDate.date;

        manifesto.manualManifesto.transportInfo.transportComplateDateB2 = (manifesto.manualManifesto.transportInfo.transportComplateDateB2) ? manifesto.manualManifesto.transportInfo.transportComplateDateB2 : this.completeDate.date;

        manifesto.manualManifesto.processorInfo.processingComplateDate = (manifesto.manualManifesto.processorInfo.processingComplateDate) ? manifesto.manualManifesto.processorInfo.processingComplateDate : this.completeDate.date;

        manifesto.manualManifesto.processorInfo.processingComplateDateC2 = (manifesto.manualManifesto.processorInfo.processingComplateDateC2) ? manifesto.manualManifesto.processorInfo.processingComplateDateC2 : this.completeDate.date;

        if (manifesto.manualManifesto.date && manifesto.manualManifesto.transportInfo.transportComplateDate && manifesto.manualManifesto.transportInfo.transportComplateDateB2) {

            manifesto.menifestoStatus = AppConstant.MENIFESTO_STATUS_LOADED;

            if (manifesto.manualManifesto.processorInfo.processingComplateDate && manifesto.manualManifesto.processorInfo.processingComplateDateC2) {
                manifesto.menifestoStatus = AppConstant.MENIFESTO_STATUS_UNLOADED;

                if (manifesto.manualManifesto.processorInfo.disposeComplateDate && manifesto.manualManifesto.processorInfo.finalDisposeComplateDate) {
                    manifesto.menifestoStatus = AppConstant.MENIFESTO_PROCESSING_COMPLETE_STATUS;
                }
            }
        }

        var selectedManifestoList: MenifestoInfo[] = [];
        selectedManifestoList.push(manifesto);
        this.menifestoService.savePorcessComaplateDate(selectedManifestoList).subscribe((data) => {
            if (data == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {
                this.isCompleted = true;
                this.utilService.showSnackbar(this.uiLabels.processCompletionToast, 3000);
                this.onClose(manifesto);
            }

        })
    }

    isCompleted: boolean = false;

    onClose(manifesto: MenifestoInfo) {

        this.dialogRef.close(manifesto);
    }

}
