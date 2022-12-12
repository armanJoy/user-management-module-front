import { Pipe, PipeTransform } from '@angular/core';
import { AgreementInfo } from 'src/app/models/backend-fetch/business-agreement';
import { TripInfo } from 'src/app/models/backend-fetch/create-schedule';

@Pipe({
    name: 'tripFilterBasedOnDisposalPick',
    pure: false
})
export class TripFilterBasedOnDisposalPick implements PipeTransform {
    transform(items: TripInfo[], disposeId: string): any {
        if (!items || !disposeId) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => (JSON.stringify(item.pickList)).includes(disposeId));
    }
}