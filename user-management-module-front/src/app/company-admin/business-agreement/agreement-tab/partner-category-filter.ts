import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'partnerCategoryFilter',
    pure: false
})
export class PartnerCategoryFilter implements PipeTransform {
    transform(items: string[], eachCategory: string): any {
        if (!items || !eachCategory) {
            return items;
        }

        var filteredItems: string[] = items.filter(item => item == eachCategory);

        if (!filteredItems) {
            filteredItems = [];
            filteredItems.push(eachCategory);
        }

        return filteredItems;
    }
}