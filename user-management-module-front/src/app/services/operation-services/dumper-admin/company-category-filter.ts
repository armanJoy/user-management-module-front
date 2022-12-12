import { Pipe, PipeTransform } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementInfo, PartnerInfo } from 'src/app/models/backend-fetch/business-agreement';

@Pipe({
    name: 'companyCategoryFilter',
    pure: false
})
export class CompanyCategoryFilter implements PipeTransform {
    transform(items: PartnerInfo[], filter: any[]): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out

        return items.filter(
            item => item.companyBusinessCategory.findIndex(category => filter.findIndex(filterItem => (filterItem.isSelected && (filterItem[AppConstant.COMPANY_CATEGORY_TITLE_ENG] == category || filterItem[AppConstant.COMPANY_CATEGORY_TITLE_JPN] == category))) >= 0) >= 0
        );

    }
}