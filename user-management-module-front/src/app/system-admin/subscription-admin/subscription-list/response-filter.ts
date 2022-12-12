import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'responseFilter',
    pure: false
})
export class ResponseFilter implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => filter.includes(item.status.statusId));
    }
}