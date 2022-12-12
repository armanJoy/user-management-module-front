import { Pipe, PipeTransform } from '@angular/core';
import { AgreementInfo } from 'src/app/models/backend-fetch/business-agreement';

@Pipe({
    name: 'agreementFilter',
    pure: false
})
export class AgreementFilter implements PipeTransform {
    transform(items: AgreementInfo[], filter: any[]): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => filter.findIndex(filterItem => (filterItem.statusId == item.agreementStatus.statusId && filterItem.isSelected)) >= 0);
    }
}