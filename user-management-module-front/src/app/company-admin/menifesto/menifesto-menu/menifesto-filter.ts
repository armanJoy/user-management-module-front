import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'manifestoFilter',
    pure: false
})
export class ManifestoFilter implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => {
            if (item.manualManifesto.dateView.length > 0 && item.manualManifesto.processorInfo.processingComplateDateView.length > 0 && item.manualManifesto.processorInfo.disposeComplateDateView.length > 0 && item.manualManifesto.processorInfo.finalDisposeComplateDateView.length > 0) {
                if (filter == "Completed") {
                    return true;
                }

            } if (item.manualManifesto.dateView.length <= 0 || item.manualManifesto.processorInfo.processingComplateDateView.length <= 0 || item.manualManifesto.processorInfo.disposeComplateDateView.length <= 0 || item.manualManifesto.processorInfo.finalDisposeComplateDateView.length <= 0) {
                if (filter == "Progress") {
                    return true;
                }
            }
            return false;
        });

    }
}