import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'wasteFilter',
    pure: false
})
export class WasteFilter implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => {
            if (item.reply.length > 0) {
                if (filter == "Replied") {
                    return true;
                }

            } if (item.reply.length <= 0) {
                if (filter == "New") {
                    return true;
                }
            }
            return false;
        });

    }
}