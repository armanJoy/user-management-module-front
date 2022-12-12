import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { DxrWasteInfoFetch, DxrWasteItemDef, dxrWasteTypeDef } from 'src/app/models/backend-fetch/company-settings-fetch';
import { AgreementTransportWasteSelectionView, AgreementWasteTransportInfo, AgreementWasteTransportInfoSelectionView, DxrWasteTypeDef } from 'src/app/models/backend-fetch/business-agreement';
import { AppConstant } from 'src/app/config/app-constant';
import { UriService } from 'src/app/services/visitor-services/uri.service';

@Component({
    selector: 'app-select-waste-popup',
    templateUrl: './select-waste-popup.component.html',
    styleUrls: ['./select-waste-popup.component.css']
})
export class SelectWastePopupComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, private businessAgreementService: BusinessAgreementService, private uriService: UriService, private matDialogRef: MatDialogRef<SelectWastePopupComponent>, @Inject(MAT_DIALOG_DATA) public selectedWasteList: AgreementWasteTransportInfo[]) { }

    uiLabels: any = {
        headerLabel: "Selected Waste Item",
        wasteListHeader: "Select from Waste List",
        wasteTitle: "Waste Title",
        wasteCategory: "Waste Category",
        wasteType: "Waste Type",
        wasteUnit: "Unit",
        addWasteButton: "Add Selected Waste",
        closeButton: 'Close',
        wasteCollectLocation: "Collection Location : 〒",
        wasteDropLocation: "Drop Location : 〒",
        companyAddress: "Address",
        transportPrice: "Price",
    }
    viewContent = false;

    wasteList: AgreementTransportWasteSelectionView[] = [];
    wasteViewList: any[] = [];


    pickZipCode: string = '';
    pickAddress: any = '';

    dropZipCode: string = '';
    dropAddress: any = '';


    componentCode!: string;
    isSystemAdmin: boolean = false;
    ngOnInit(): void {

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.SELECT_WASTE_POPUP, AppConstant.UI_LABEL_TEXT);
        // this.utilService.printLangDef(this.uiLabels, AppConstant.COMP.SELECT_WASTE_POPUP);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SELECT_WASTE_POPUP;

        // if (this.selectedWasteList) {
        //     this.selectedWasteForTransport = this.selectedWasteList;
        // }

        this.businessAgreementService.getWasteList().subscribe(data => {
            if (data) {
                this.wasteList = this.convertDxrWasteListToAgreementWasteTransportInfo(data);
            }
            this.viewContent = true;
        });

    }

    convertDxrWasteListToAgreementWasteTransportInfo(dxrWasteList: DxrWasteInfoFetch[]): AgreementTransportWasteSelectionView[] {
        var agreementTransportWasteSelectionViewList: AgreementTransportWasteSelectionView[] = [];
        // var selectedWasteListString: string = (this.selectedWasteForTransport) ? JSON.stringify(this.selectedWasteForTransport) : '';
        if (dxrWasteList) {
            dxrWasteList.forEach(eachWasteCategory => {
                if (eachWasteCategory) {
                    var agreementTransportWasteSelectionView: AgreementTransportWasteSelectionView = {
                        categoryId: eachWasteCategory.categoryId,
                        categoryTitle: eachWasteCategory.categoryTitle,
                        dxrWasteTypeDef: []
                    }
                    if (eachWasteCategory.dxrWasteTypeDef) {
                        eachWasteCategory.dxrWasteTypeDef.forEach(eachWasteType => {

                            if (eachWasteType) {
                                var dxrWasteTypeDef: DxrWasteTypeDef = {
                                    wasteTypeId: eachWasteType.wasteTypeId,
                                    wasteTypeTitle: eachWasteType.wasteTypeTitle,
                                    dxrWasteItemDef: [],
                                    categoryId: eachWasteCategory.categoryId
                                }

                                if (eachWasteType.dxrWasteItemDef) {
                                    eachWasteType.dxrWasteItemDef.forEach(eachWaste => {
                                        if (eachWaste) {
                                            var agreementTransportWasteInfo: AgreementWasteTransportInfoSelectionView = {
                                                agreementWasteTransportInfoId: this.utilService.generateUniqueId(),
                                                wasteDefId: eachWaste.wasteId,
                                                wasteCategoryId: eachWasteType.wasteTypeId,
                                                wasteTitle: eachWaste.wasteItem,
                                                wasteCategoryTitle: eachWasteType.wasteTypeTitle,
                                                pickZipCode: '',
                                                pickAddress: '',
                                                pickBrachId: '',
                                                dropZipCode: '',
                                                dropAddress: '',
                                                dropBrachId: '',
                                                price: 0,
                                                unit: eachWaste.unitDef,
                                                isSelected: false
                                            }



                                            dxrWasteTypeDef.dxrWasteItemDef.push(agreementTransportWasteInfo);
                                        }
                                    });
                                }

                                agreementTransportWasteSelectionView.dxrWasteTypeDef.push(dxrWasteTypeDef);
                            }
                        });
                    }

                    agreementTransportWasteSelectionViewList.push(agreementTransportWasteSelectionView);
                }
            });
        }

        return agreementTransportWasteSelectionViewList;
    }

    selectedWasteForTransport: AgreementWasteTransportInfo[] = [];

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    setAddressFromZipCodeData(zipCode: string, addressAttr: string) {

        if (zipCode) {
            var that: any = this;
            this.uriService.getZipCodeInformation(zipCode).subscribe((data) => {
                if (data) {
                    that[addressAttr] = data.address;
                }

            });
        }

    }

    addSelectedWasteTransportInfo() {

        var selectedWasteForTransport: AgreementWasteTransportInfo[] = [];

        if (this.wasteList) {
            this.wasteList.forEach(eachWasteCategory => {
                if (eachWasteCategory) {

                    if (eachWasteCategory.dxrWasteTypeDef) {
                        eachWasteCategory.dxrWasteTypeDef.forEach(eachWasteType => {

                            if (eachWasteType) {


                                if (eachWasteType.dxrWasteItemDef) {
                                    eachWasteType.dxrWasteItemDef.forEach(eachWaste => {
                                        if (eachWaste && eachWaste.isSelected) {
                                            var agreementTransportWasteInfo: AgreementWasteTransportInfo = eachWaste;

                                            agreementTransportWasteInfo.pickZipCode = this.pickZipCode;
                                            agreementTransportWasteInfo.pickAddress = this.pickAddress;

                                            agreementTransportWasteInfo.dropZipCode = this.dropZipCode;
                                            agreementTransportWasteInfo.dropAddress = this.dropAddress;


                                            selectedWasteForTransport.push(agreementTransportWasteInfo);
                                        }
                                    });
                                }

                            }
                        });
                    }

                }
            });
        }

        this.matDialogRef.close(selectedWasteForTransport);
    }
}
