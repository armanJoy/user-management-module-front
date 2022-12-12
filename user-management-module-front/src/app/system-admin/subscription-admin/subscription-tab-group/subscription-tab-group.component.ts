import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-subscription-tab-group',
    templateUrl: './subscription-tab-group.component.html',
    styleUrls: ['./subscription-tab-group.component.css']
})
export class SubscriptionTabGroupComponent implements OnInit {

    constructor(private utilService: UtilService) { }

    uiLabels: any = {
        subscriptionsTabTitle: 'Subscriptions',
        companyAdminTabTitle: 'Company Admins',
    }

    ngOnInit(): void {


    }

}
