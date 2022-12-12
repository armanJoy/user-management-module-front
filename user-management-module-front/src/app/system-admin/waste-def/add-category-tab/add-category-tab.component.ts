import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';
import { AppConstant } from 'src/app/config/app-constant';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { CategoryDef, DxrWasteItemDef, WasteTypeDef } from 'src/app/models/backend-fetch/waste-def';
import { WasteDefService } from 'src/app/services/operation-services/waste-def.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AddCategoryPopupComponent } from '../add-category-popup/add-category-popup.component';

@Component({
    selector: 'app-add-category-tab',
    templateUrl: './add-category-tab.component.html',
    styleUrls: ['./add-category-tab.component.css']
})
export class AddCategoryTabComponent implements OnInit {

    @Input()
    wasteCategoryList!: CategoryDef[];

    @Input()
    wasteTypeMainList!: WasteTypeDef[];

    @Input()
    wasteItemMainList!: DxrWasteItemDef[];

    @Input()
    showWasteType!: (index: number, selectedCategory: CategoryDef) => void;

    constructor(private wasteDefService: WasteDefService, private dialog: MatDialog, private languageService: LanguageService, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;
    uiLabels: any = {
        wasteCategoryLabel: 'Category',
        addButton: 'Add Category',
        editBtn: 'Edit',
        wasteCategoryDetailsButton: 'Type'
    }

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.CATEGORY_TAB;
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.CATEGORY_TAB, AppConstant.UI_LABEL_TEXT);

    }
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }
    public openCategoryAddDialog = (selecedCategory?: CategoryDef): void => {

        const addWasteCategoryDialog = this.dialog.open(AddCategoryPopupComponent, {
            width: '700px',
            data: (selecedCategory) ? selecedCategory : '',
        })

        addWasteCategoryDialog.afterClosed().subscribe((data: CategoryDef) => {
            if (data) {
                this.saveWasteCategory(data);
            }
        })
    }

    saveWasteCategory(newWasteCategory: CategoryDef) {
        if (newWasteCategory) {
            if (!newWasteCategory.categoryId || newWasteCategory.categoryId == '') {
                var id = this.utilService.generateUniqueId();
                newWasteCategory.categoryId = id;
                // this.faqAdminOpService.generateId([newFaqType.faqType, 'FaqType']);
            }
            this.wasteDefService.saveWasteCategory(newWasteCategory).subscribe(savedData => {
                if (savedData) {

                    this.updateCategoryList(savedData);

                }
            });
        }

    }

    updateCategoryList(newWasteCategory: CategoryDef) {

        let itemIndex = this.wasteCategoryList.findIndex(item => item.categoryId == newWasteCategory.categoryId);
        if (itemIndex >= 0) {
            this.wasteCategoryList[itemIndex] = newWasteCategory;
        } else {
            this.wasteCategoryList.unshift(newWasteCategory);
        }

    }

    showWasteTypesOfSelectedCategory(selectedCategory: CategoryDef) {
        // this.selectedFaqType = selectedFaqType;
        this.showWasteType(1, selectedCategory);
    }

    removeItem(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.WASTE_CATEGORY_REMOVE_OPERATION
        }

        const removeDialog = this.dialog.open(DeleteConfirmationComponent, {
            width: '40%',
            // height: '30%',
            // data: vehicleForwardLink,
            disableClose: true
        });

        removeDialog.afterClosed().subscribe(response => {
            if (response) {
                this.wasteDefService.removeWasteCategory(removeTriggerData).subscribe(response => {
                    if (response) {
                        this.utilService.showRemovedToast();
                        this.removeWasteCategoryFromViewList(itemId);
                    }
                });
            }
        });
    }

    removeWasteCategoryFromViewList(itemId: string) {
        var index = this.wasteCategoryList.findIndex(item => item.categoryId == itemId);

        if (index >= 0) {
            this.wasteCategoryList.splice(index, 1);
        }
    }
}
