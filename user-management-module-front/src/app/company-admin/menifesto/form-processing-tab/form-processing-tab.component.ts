import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { AppConstant } from 'src/app/config/app-constant';
import { FormProcessingListTable, ManifestFilter, MenifestoInfo } from 'src/app/models/backend-fetch/menifesto';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-form-processing-tab',
    templateUrl: './form-processing-tab.component.html',
    styleUrls: ['./form-processing-tab.component.css']
})
export class FormProcessingTabComponent implements OnInit {

    @Input()
    public changeTab!: (index: number, manifestoInfoList: MenifestoInfo[]) => void;

    @Input()
    public switchToMenifestoList!: () => void;

    @Input()
    selectedManifestoList: MenifestoInfo[] = [];

    @Input()
    listOfTable: FormProcessingListTable[] = [];

    viewComponent = false;
    componentCode: string = '';
    isSystemAdmin: boolean = false;
    tableHeaders: string[] = [];

    constructor(private breakpointObserver: BreakpointObserver, private utilService: UtilService, private languageService: LanguageService) { }

    uiLabels: any = {
        listHeader: "List of Selected Manifesto",
        ledgerUpdate: "Ledger Udate",
        collectionDate: "Collection Date",
        issuerName: "Issuer Name",
        dateOfIssue: "Date of Issue",
        grandNumber: "Grand Number",
        emisionSiteName: "Emission Site Name",
        emisionSiteLocation: "Emission Site Location",
        wasteName: "Waste Type",
        recieveAmount: "Receive Amount (t)",
        containAsbestos: "Contain Asbestos",
        mercuryproducts: "Mercury products",
        containMercuryDustetc: "Contain Mercury Dust etc",
        transportationEnddate: "Transportation End date",
        transportationmethod: "Transportation Method",
        destinationName: "Destination Name",
        destinationLocation: "Destination Location",
        carryingAmount: "Carrying Amount (t)",
        remarks: "Remarks"
    }

    displayedColumns: string[] = [];

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.FORM_PROCESSING_TAB;
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.tableHeaders = ['collectionDate', 'issuerName', 'dateOfIssue', 'grandNumber', 'emisionSiteName', 'emisionSiteLocation', 'wasteName', 'recieveAmount', 'containAsbestos', 'mercuryproducts', 'containMercuryDustetc', 'transportationEnddate', 'transportationmethod', 'destinationName', 'destinationLocation', 'carryingAmount', 'remarks', 'action'];

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.displayedColumns = [this.uiLabels.collectionDate, this.uiLabels.issuerName, this.uiLabels.dateOfIssue, this.uiLabels.grandNumber, this.uiLabels.emisionSiteName, this.uiLabels.emisionSiteLocation, this.uiLabels.wasteName, this.uiLabels.recieveAmount, this.uiLabels.containAsbestos, this.uiLabels.mercuryproducts, this.uiLabels.containMercuryDustetc, this.uiLabels.transportationEnddate, this.uiLabels.transportationmethod, this.uiLabels.destinationName, this.uiLabels.destinationLocation, this.uiLabels.carryingAmount, this.uiLabels.remarks, this.uiLabels.action];

        this.viewComponent = true;
    }

    downLoadCSV() {
        ;
        var csvData = this.ConvertToCSV(this.listOfTable, this.displayedColumns);
        let filename = 'data';
        console.log(csvData)
        let blob = new Blob(['\ufeff' + csvData], {
            type: 'text/csv;charset=utf-8;'
        });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        // let isSafariBrowser = navigator.userAgent.indexOf(
        //     'Safari') != -1 & amp; & amp;
        navigator.userAgent.indexOf('Chrome') == -1;

        //if Safari open in new window to save file with random filename.
        // if (isSafariBrowser) {
        //     dwldLink.setAttribute("target", "_blank");
        // }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }

    ConvertToCSV(objArray: FormProcessingListTable[], headerList: string[]) {
        let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = '';
        for (let index in headerList) {
            row += ((row.length > 0) ? ',' : '') + headerList[index];
        }

        headerList.keys

        row = row.slice(0, -1);
        str += row + '\r\n';
        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let j = 0; j < this.tableHeaders.length; j++) {
                let headRowValue = array[i][this.tableHeaders[j]];
                line += ((j > 0) ? ',' : '') + headRowValue;
            }
            str += line + ' \r\n ';
        }
        return str;
    }

    // dataSource = this.listOfTable;

    onRemove(index: number, table: any) {
        debugger
        this.listOfTable.splice(index, 1);
        // this.listOfTable = this.listOfTable;
        table.renderRows();
    }

    prepareListForTable(manifestoList: MenifestoInfo[]): FormProcessingListTable[] {

        var listTable: FormProcessingListTable[] = [];
        if (manifestoList) {
            var tableItem: FormProcessingListTable = {
                collectionDate: '',
                issuerName: '',
                dateOfIssue: '',
                grandNumber: '',
                emisionSiteName: '',
                emisionSiteLocation: '',
                wasteName: '',
                recieveAmount: 0,
                containAsbestos: '',
                mercuryproducts: '',
                containMercuryDustetc: '',
                transportationEnddate: '',
                transportationmethod: '',
                destinationName: '',
                destinationLocation: '',
                carryingAmount: 0,
                remarks: ''
            }
            manifestoList.forEach(eachManifesto => {
                tableItem.collectionDate = eachManifesto.manualManifesto.date;
                tableItem.issuerName = eachManifesto.manualManifesto.dumperInfo.businessName;
                tableItem.dateOfIssue = eachManifesto.manualManifesto.date;
                tableItem.grandNumber = eachManifesto.manualManifesto.manifestoNo;
                tableItem.emisionSiteName = eachManifesto.manualManifesto.dumperInfo.workPlace;
                tableItem.emisionSiteLocation = eachManifesto.manualManifesto.dumperInfo.workAddress;
                tableItem.wasteName = eachManifesto.manualManifesto.manifestoDisposeWasteInfo[0].wasteName;
                tableItem.recieveAmount = eachManifesto.manualManifesto.manifestoDisposeWasteInfo[0].quantity;
                tableItem.containAsbestos = "";
                tableItem.mercuryproducts = "";
                tableItem.containMercuryDustetc = "";
                tableItem.transportationEnddate = eachManifesto.manualManifesto.processorInfo.processingComplateDateC2;
                tableItem.transportationmethod = eachManifesto.manualManifesto.transportInfo.transportMethod;
                tableItem.destinationName = "";
                tableItem.destinationLocation = eachManifesto.manualManifesto.processorInfo.address;
                tableItem.carryingAmount = eachManifesto.manualManifesto.manifestoProcessWasteInfo[0].establishedQuantity;
                tableItem.remarks = eachManifesto.manualManifesto.additionalInfo;
            })

        }

        return listTable;
    }

    onClickMenifestoListBtn() {
        this.switchToMenifestoList();
    }
}
