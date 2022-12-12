import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { SubscriptionUpdateInfo } from 'src/app/models/backend-update/subscription-update';
import { SubscriptionOperationService } from 'src/app/services/operation-services/subscription-operation.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { SubscriptionVisitorService } from 'src/app/services/visitor-services/subscription-visitor.service';

@Component({
    selector: 'app-bulk-subscription',
    templateUrl: './bulk-subscription.component.html',
    styleUrls: ['./bulk-subscription.component.css']
})

export class BulkSubscriptionComponent implements OnInit {

    constructor(private subscriptionVisitorService: SubscriptionVisitorService, private breakpointObserver: BreakpointObserver, private languageService: LanguageService, public subscriptionOperationService: SubscriptionOperationService, private utilService: UtilService) { }

    componentCode: string = "";
    isSystemAdmin: boolean = false;
    uiLabels: any = {
        header: "Upload CSV",
        companyName: "Company Name",
        address: "Address",
        contact: "Contact No",
        companyCategory: "Company Category",
        subscriberName: "Subscriber Name",
        subscriberMail: "Subscriber Email",
        addSubscriptionButton: "Add Subscription",
        uploadFile: "Upload CSV File",
        closeBtn: "Close",
        saveCompleteLabel: "Subscription Completed",
        "Company Name": "companyName",
        "Zip Code": "zipCode",
        "Address": "address",
        "Contact No": "contactNo",
        "Company Category": "companyCategory",
        "Subscriber Name": "subscriberName",
        "Subscriber Mail": "subscriberMail",
        "Waste Processing Licence No": "wasteProcessingLicenceNo"
    }

    allowedExt = ["csv"];
    text: any;

    ngOnInit() {
        debugger
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.BULK_SUBSCRIPTION;
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        var companyId = this.utilService.getCompanyIdCookie();
    }

    csvToJson: SubscriptionUpdateInfo[] = [];
    upLoadFile(e: any) {
        debugger
        const reader = new FileReader();
        const fileName = e.target.files[0].name;
        const nameParts = fileName.split(".");
        const fileExtension = nameParts[nameParts.length - 1];

        if (this.isInArray(this.allowedExt, fileExtension)) {
            reader.readAsText(e.target.files[0]);
            reader.onload = () => {
                let text = reader.result;
                this.text = text;
                // console.log(text);
                this.csvToJson = this.csvJSON(this.text);

                this.selectedCompompany = new Set<SubscriptionUpdateInfo>(this.csvToJson);
            };
        } else {
            console.log('file not supported');
        }
    }


    isInArray(array: string[], word: string) {
        return array.indexOf(word.toLowerCase()) > -1;
    }

    csvJSON(csvText: string) {
        debugger
        csvText = csvText.replace("\r", "");
        csvText = csvText.replace("\t", "");
        var lines = csvText.split("\n");
        var result = [];
        var headers = lines[0].split(",");
        for (var i = 1; i < lines.length; i++) {
            var obj: any = {};
            var currentline = lines[i].split(",");

            if (currentline && currentline.length == headers.length) {
                for (var j = 0; j < headers.length; j++) {
                    obj[this.uiLabels[headers[j]]] = currentline[j];
                }
                obj.id = this.utilService.generateUniqueId();
                obj.isSelected = true;
                obj.isHuman = true;
                obj.isAgree = true;
                obj.requesterMail = this.utilService.getUserIdCookie();
                obj.companyCategory = obj.companyCategory.toString().split("|");
                // obj.isSaved = (i % 2 == 0) ? true : false;
                // obj.response = AppConstant.SUBSCRIPTION_ACCEPT_STATUS;
                result.push(obj);
            }
        }

        return result;
    }

    selectedCompompany = new Set<SubscriptionUpdateInfo>();
    selectCompany(item: SubscriptionUpdateInfo, checkBox: any, event: any) {

        if (item.isSelected) {
            this.selectedCompompany.add(item);
        } else {
            this.selectedCompompany.delete(item);
        }
    }

    subscriptionSaveInProgress = false;
    subscriptionSaveComplete = false;
    saveSubscription() {
        debugger
        var callBackCounter = 0;
        this.subscriptionSaveComplete = false;
        this.subscriptionSaveInProgress = true;
        this.selectedCompompany.forEach(each => {
            this.subscriptionVisitorService.saveSubscription(each).subscribe((data) => {
                if (data && data.id) {
                    each.isSaved = true;
                } else {
                    each.isExistingCompany = true;
                }

                callBackCounter++;

                if (callBackCounter == this.selectedCompompany.size) {
                    this.subscriptionSaveInProgress = false;
                    this.subscriptionSaveComplete = true;
                    this.clearSelectedItemList();
                }
            });
        })

    }

    clearSelectedItemList() {
        this.selectedCompompany.clear();
    }

}
