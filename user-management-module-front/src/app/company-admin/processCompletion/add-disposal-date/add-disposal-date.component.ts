import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { MenifestoInfo, ProcessCompletion } from 'src/app/models/backend-fetch/menifesto';
import { MenifestoService } from 'src/app/services/operation-services/menifesto.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-add-disposal-date',
    templateUrl: './add-disposal-date.component.html',
    styleUrls: ['./add-disposal-date.component.css']
})
export class AddDisposalDateComponent implements OnInit {

    @Input()
    selectedManifestoList: MenifestoInfo[] = [];

    @Input()
    addDatetab = true;

    @Input()
    public manifestoListView!: () => void;

    constructor(private menifestoService: MenifestoService, private utilService: UtilService, private languageService: LanguageService) { }

    componentCode: string = '';
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ADD_DISPOSAL_DATE;

        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
    }

    processComletion: ProcessCompletion = {
        finalDisposeComplateDate: '',
        disposeComplateDate: ''
    }
    resetDate() {
        this.processComletion = {
            finalDisposeComplateDate: '',
            disposeComplateDate: ''
        }
    }

    saveProcessDate() {

        if (this.processComletion) {

            if (this.selectedManifestoList) {
                var processCompletedManifesto: MenifestoInfo[] = [];
                this.selectedManifestoList.forEach(manifesto => {

                    if (manifesto.isCheck) {
                        manifesto.manualManifesto.processorInfo.disposeComplateDate = this.processComletion.disposeComplateDate;
                        manifesto.manualManifesto.processorInfo.finalDisposeComplateDate = this.processComletion.finalDisposeComplateDate;
                        manifesto.manualEdit = true;
                        if (manifesto.manualManifesto.date && manifesto.manualManifesto.transportInfo.transportComplateDate && manifesto.manualManifesto.transportInfo.transportComplateDateB2) {

                            manifesto.menifestoStatus = AppConstant.MENIFESTO_STATUS_LOADED;

                            if (manifesto.manualManifesto.processorInfo.processingComplateDate && manifesto.manualManifesto.processorInfo.processingComplateDateC2) {
                                manifesto.menifestoStatus = AppConstant.MENIFESTO_STATUS_UNLOADED;

                                if (manifesto.manualManifesto.processorInfo.disposeComplateDate && manifesto.manualManifesto.processorInfo.finalDisposeComplateDate) {
                                    manifesto.menifestoStatus = AppConstant.MENIFESTO_PROCESSING_COMPLETE_STATUS;
                                    processCompletedManifesto.push(JSON.parse(JSON.stringify(manifesto)));
                                }
                            }
                        }
                    }
                });

                if (processCompletedManifesto && processCompletedManifesto.length > 0) {
                    this.menifestoService.savePorcessComaplateDate(processCompletedManifesto).subscribe((data) => {
                        if (data == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {

                            this.resetDate();
                            this.utilService.showSnackbar(this.uiLabels.processCompletionToast, 3000);
                        }
                    })
                } else {
                    this.utilService.showSnackbar(this.uiLabels.noManifestoSelected, 3000);
                }
            }
        }

    }
    onClickMenifestoListBtn() {
        this.manifestoListView();
    }

    uiLabels: any = {
        primaryDisposalComplateDate: "Primary Disposal Complate Date",
        finalDisposalComplateDate: "Final Disposal Complate Date",
        saveBtn: "Save"
    }

}
