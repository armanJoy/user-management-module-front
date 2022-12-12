import { Pipe, PipeTransform } from '@angular/core';
import { ProjectInfoFetch, wasteProcessInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';

@Pipe({
    name: 'processFilter',
    pure: false
})
export class ProcessFilter implements PipeTransform {
    transform(items: wasteProcessInfoFetch[], wasteId: string): any {
        if (!items || !wasteId) {
            return items;
        }
        return items.filter(item => item.wasteItemId == wasteId);
    }
}