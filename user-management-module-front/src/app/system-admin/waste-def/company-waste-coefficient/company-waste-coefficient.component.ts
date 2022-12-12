import { Component, OnInit, Input } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyWasteCoefficient, DxrWasteItemDef } from 'src/app/models/backend-fetch/waste-def';
import { WasteDefService } from 'src/app/services/operation-services/waste-def.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-company-waste-coefficient',
    templateUrl: './company-waste-coefficient.component.html',
    styleUrls: ['./company-waste-coefficient.component.css']
})
export class CompanyWasteCoefficientComponent implements OnInit {

    @Input()
    wasteItemInfo!: DxrWasteItemDef;

    @Input()
    companyWasteCoefficient!: CompanyWasteCoefficient[];

    constructor(private wasteDefService: WasteDefService, private languageService: LanguageService, private utilService: UtilService, private breakpointObserver: BreakpointObserver, private dialog: MatDialog) { }

    uiLabels: any = {
        pageHeader: "Company Waste Coefficient",
        companyName: "Company",
        contactNo: "Contact No",
        address: "Address",
        wasteCoefficient: "Waste Coefficient",
        updateButton: "Update",
    }

    viewContent = false;
    isSystemAdmin = this.utilService.languageEditMode();
    componentCode = AppConstant.COMP.COMPANY_WASTE_COEFFICIENT_TAB;

    ngOnInit(): void {
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );


    updateCompanyCoefficient(companyWasteCoefficient: CompanyWasteCoefficient) {
        if (companyWasteCoefficient) {
            this.wasteDefService.saveCompanyWasteCoefficient(companyWasteCoefficient).subscribe(response => {
                if (response) {
                    this.utilService.showSnackbar(this.uiLabels.coefficientUpdateToast, 3000);
                }
            })
        }
    }
}
