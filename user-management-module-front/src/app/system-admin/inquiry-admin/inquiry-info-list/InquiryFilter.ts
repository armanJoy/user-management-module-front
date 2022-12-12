import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'inquiryFilter',
    pure: false
})
export class InquiryFilter implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => {
            if (item.response.length > 0) {
                if (filter == "Answered") {
                    return true;
                }

            } if (item.response.length <= 0) {
                if (filter == "Unanswered") {
                    return true;
                }
            }
            return false;
        });

    }
}