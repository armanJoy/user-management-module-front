import { Component, OnInit, Input } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyTotalCo2QuantityView, MonthWiseTotalWasteItemQuantityFetch, ProjectWiseWasteItemQuantityFetch } from 'src/app/models/backend-fetch/carbon-emmition';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-processing-operation-tab',
    templateUrl: './processing-operation-tab.component.html',
    styleUrls: ['./processing-operation-tab.component.css']
})
export class ProcessingOperationTabComponent implements OnInit {
    @Input()
    projectWiseCO2Emission!: ProjectWiseWasteItemQuantityFetch;
    @Input()
    isProjectWiseCO2Emission: boolean = false;
    @Input()
    selectedMonth: string = "";
    @Input()
    selectedYear: string = "";
    @Input()
    startDate: string = "";
    @Input()
    endDate: string = "";
    @Input()
    processingMonthWiseTotalWasteItemQuantity!: MonthWiseTotalWasteItemQuantityFetch;
    @Input()
    companyTotalCo2Quantity: CompanyTotalCo2QuantityView = {
        totalCo2Quantity: 0,
        dumperCo2Quantity: 0,
        processorCo2Quantity: 0,
        transPorterCo2Quantity: 0,
    }
    componentCode: string = AppConstant.COMP.Processing_Operation_Tab_Component;
    isSystemAdmin: boolean = false;

    constructor(private languageService: LanguageService, private utilService: UtilService) { }

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        // this.utilService.printLangDef(this.uiLabels, this.componentCode)
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.Processing_Operation_Tab_Component, AppConstant.UI_LABEL_TEXT);
    }
    uiLabels: any = {
        month: "Month",
        year: "Year",
        totalCO2Value: "Total CO2 Value",
        value: "Value",
        wasteItem: "Waste Item",
        quantity: "Quantity",
        co2EmissionValue: "CO2 Emission Value",
        quantityPerunit: "Quantity/Unit",
        unit: "Unit"
    }

}
