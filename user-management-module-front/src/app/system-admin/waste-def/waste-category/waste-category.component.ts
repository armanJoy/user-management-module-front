import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';
import { AppConstant } from 'src/app/config/app-constant';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { CategoryDef, WasteTypeDef, DxrWasteItemDef } from 'src/app/models/backend-fetch/waste-def';
import { WasteDefService } from 'src/app/services/operation-services/waste-def.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { WasteCategoryFormComponent } from '../waste-category-form/waste-category-form.component';

@Component({
    selector: 'app-waste-category',
    templateUrl: './waste-category.component.html',
    styleUrls: ['./waste-category.component.css']
})
export class WasteCategoryComponent implements OnInit {

    @Input()
    wasteTypeList!: WasteTypeDef[];

    @Input()
    selectedCategory!: CategoryDef;

    @Input()
    wasteCategoryMainList!: CategoryDef[];

    @Input()
    wasteTypeMainList!: WasteTypeDef[];

    @Input()
    wasteItemMainList!: DxrWasteItemDef[];

    @Input()
    showWasteItem!: (index: number, selecedWasteCategory: WasteTypeDef) => void;

    @Input()
    updateTypeMainList!: (newWasteType: WasteTypeDef) => void;

    constructor(private breakpointObserver: BreakpointObserver, private wasteDefService: WasteDefService, private dialog: MatDialog, private languageService: LanguageService, private utilService: UtilService) { }

    uiLabels: any = {
        wasteCategory: 'Category1',
        wasteCategoryLabel: 'Type',
        addButton: 'Add Type',
        editBtn: 'Edit',
        wasteCategoryDetailsButton: 'Items',
        removeButton: 'Remove'
    }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.WASTE_CATEGORY_TAB;
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.WASTE_CATEGORY_TAB, AppConstant.UI_LABEL_TEXT);
    }


    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );
    public openTypeAddDialog = (selecedWasteType?: WasteTypeDef): void => {

        const addWasteCategoryDialog = this.dialog.open(WasteCategoryFormComponent, {
            width: '700px',
            data: {
                selectedCategory: this.selectedCategory,
                selectedWasteType: (selecedWasteType) ? selecedWasteType : '',
            }
        })

        addWasteCategoryDialog.afterClosed().subscribe((data: WasteTypeDef) => {
            if (data) {
                this.saveWasteType(data);
            }
        })
    }

    saveWasteType(newWasteType: WasteTypeDef) {
        if (newWasteType) {
            if (!newWasteType.wasteTypeId || newWasteType.wasteTypeId == '') {
                var id = this.utilService.generateUniqueId();
                newWasteType.categoryId = this.selectedCategory.categoryId;
                newWasteType.wasteTypeId = id;
                // this.faqAdminOpService.generateId([newFaqType.faqType, 'FaqType']);
            }
            this.wasteDefService.saveWasteType(newWasteType).subscribe(savedData => {
                if (savedData) {

                    this.updateTypeList(savedData);
                    // this.updateTypeMainList(savedData);

                }
            });
        }

    }

    updateTypeList(newWasteType: WasteTypeDef) {

        let itemIndex = this.wasteTypeList.findIndex(item => item.wasteTypeId == newWasteType.wasteTypeId);
        if (itemIndex >= 0) {
            this.wasteTypeList[itemIndex] = newWasteType;
        } else {
            this.wasteTypeList.unshift(newWasteType);
        }

        let itemIndex1 = this.wasteTypeMainList.findIndex(item => item.wasteTypeId == newWasteType.wasteTypeId);
        if (itemIndex1 >= 0) {
            this.wasteTypeMainList[itemIndex1] = newWasteType;
        } else {
            this.wasteTypeMainList.unshift(newWasteType);
        }

    }

    showWasteItemsOfSelectedType(selectedWasteType: WasteTypeDef) {
        // this.selectedFaqType = selectedFaqType;
        this.showWasteItem(2, selectedWasteType);
    }

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    removeItem(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.WASTE_TYPE_REMOVE_OPERATION
        }

        const removeDialog = this.dialog.open(DeleteConfirmationComponent, {
            width: '40%',
            // height: '30%',
            // data: vehicleForwardLink,
            disableClose: true
        });

        removeDialog.afterClosed().subscribe(response => {
            if (response) {
                this.wasteDefService.removeWasteType(removeTriggerData).subscribe(response => {
                    if (response) {
                        this.utilService.showRemovedToast();
                        this.removeWasteTypeFromViewList(itemId);
                    }
                });
            }
        });
    }

    removeWasteTypeFromViewList(itemId: string) {
        var index = this.wasteTypeList.findIndex(item => item.wasteTypeId == itemId);

        if (index >= 0) {
            this.wasteTypeList.splice(index, 1);
        }
    }
}
