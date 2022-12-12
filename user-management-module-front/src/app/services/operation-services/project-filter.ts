import { Pipe, PipeTransform } from '@angular/core';
import { ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';

@Pipe({
    name: 'projectFilter',
    pure: false
})
export class ProjectFilter implements PipeTransform {
    transform(items: ProjectInfoFetch[], filter: any[]): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => filter.findIndex(filterItem => (filterItem.statusId == item.status.statusId && filterItem.isSelected)) >= 0);
    }
}