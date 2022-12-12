import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyCategoryFetch, MenuCategory } from 'src/app/models/backend-fetch/dxr-system';
import { DxrRole, MenuDef, UserMenuAccessView } from 'src/app/models/backend-fetch/role-def-fetch';
import { RoleDefAdminService } from 'src/app/services/operation-services/role-def-admin.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-role-def-admin',
    templateUrl: './role-def-admin.component.html',
    styleUrls: ['./role-def-admin.component.css']
})
export class RoleDefAdminComponent implements OnInit {

    constructor(private roleDefAdminService: RoleDefAdminService, private languageService: LanguageService, private utilService: UtilService) { }

    menuCategory: MenuCategory[] = [
        {
            menuCategoryId: 'menucat001',
            menuCategoryName: 'Company Management',
        },
        {
            menuCategoryId: 'menucat002',
            menuCategoryName: 'Company Operations',
        }
    ]

    viewContent = false;


    fullMenuList: UserMenuAccessView[] = []
    dxrRoles: DxrRole[] = []
    menuRepository: MenuDef[] = [];

    // uiLabels: any = {
    //     dumperTab: 'Dumper',
    //     transporterTab: 'Transporter',
    //     processorTab: 'Proccessor',
    // }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.ROLE_DEF_ADMIN, AppConstant.UI_LABEL_TEXT);
    selectedMenuList: UserMenuAccessView[] = [];
    selectedCategoryRoles: DxrRole[] = [];
    selectedCompanyCategory = this.menuCategory[0].menuCategoryName;
    selectedCompanyCategoryId = this.menuCategory[0].menuCategoryId;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ROLE_DEF_ADMIN;

        this.getDxrMenu();

    }

    getDxrMenu() {

        this.roleDefAdminService.getMenuRoleDef().subscribe(data => {
            if (data) {
                this.fullMenuList = data;
            }

            this.getDxrRoles();
        })
    }

    getDxrRoles() {
        this.roleDefAdminService.getDxrRoles().subscribe(data => {
            if (data) {
                this.dxrRoles = data;
            }
            this.getMenuRepository();
            this.selectedMenuList = this.prepareSelectedMenuList(this.selectedCompanyCategoryId);
            this.selectedCategoryRoles = this.prepareSelectedCategoryRoles(this.selectedCompanyCategoryId);
        })
    }

    getMenuRepository() {
        this.roleDefAdminService.getMenuRepository().subscribe(data => {
            if (data) {
                this.menuRepository = data;
            }
            this.viewContent = true;
        })
    }

    tabChange($event: any) {

        this.selectedCompanyCategory = this.menuCategory[$event.index].menuCategoryName;
        var selectedCompanyCategoryId = this.menuCategory[$event.index].menuCategoryId;
        this.selectedMenuList = this.prepareSelectedMenuList(selectedCompanyCategoryId);
        this.selectedCategoryRoles = this.prepareSelectedCategoryRoles(selectedCompanyCategoryId);
    }

    prepareSelectedMenuList(companyCatId: String): UserMenuAccessView[] {
        var selectedMenuList: UserMenuAccessView[] = [];
        // menuStr = '';
        this.fullMenuList.forEach(element => {
            if (element.companyCategoryId == companyCatId) {
                selectedMenuList.push(element);
            }
        })

        return selectedMenuList;
    }

    prepareSelectedCategoryRoles(companyCatId: String): DxrRole[] {
        var selectedCategoryRoles: DxrRole[] = [];
        // selectedCategoryRoles = this.dxrRoles;
        if (companyCatId == AppConstant.MENU_CATEGORY_COMPANY_MANAGEMENT) {
            selectedCategoryRoles.push(this.dxrRoles[0]);
        } else {
            selectedCategoryRoles = this.dxrRoles;
        }

        // if (this.dxrRoles) {
        //     this.dxrRoles.forEach(element => {
        //         if (element && element.companyCategoryId == companyCatId) {
        //             selectedCategoryRoles.push(element);
        //         }
        //     });
        // }

        return selectedCategoryRoles;
    }

}
