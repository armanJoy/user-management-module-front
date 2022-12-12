import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { ActiveAccess, DxrRole, MenuAccessInfo, MenuDef, MenuItem, MenuRoleAccessUpdate, RoleMenusUpdate, RoleWiseMenuAcccessInfoUpdate, UserMenuAccessView } from 'src/app/models/backend-fetch/role-def-fetch';
import { UriService } from '../visitor-services/uri.service';

@Injectable({
    providedIn: 'root'
})
export class RoleDefAdminService {

    constructor(private uriService: UriService) { }

    getDxrRoles(): Observable<DxrRole[]> {
        var url = '/role-def/dxr-role';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }

    getMenuRoleDef(): Observable<UserMenuAccessView[]> {
        // var url = '/role-def/menu-role-def';
        var url = '/role-def/menu-tree';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }

    // saveMenuRoleDef(menuRoleDef: any): Observable<any> {
    //     var url = '/role-def/update-menu-role-def';
    //     return this.uriService.callBackend(url, AppConstant.HTTP_POST, menuRoleDef);
    // }

    getMenuRepository(): Observable<MenuDef[]> {
        var url = '/role-def/menu-repository';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }


    saveRolesWiseMenuIdList(rolesWiseMenuIdList: RoleMenusUpdate[]): Observable<any> {
        var url = '/role-def/update-roles-menu-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, rolesWiseMenuIdList);
    }

    saveRoleWiseMenuAccessInfoList(roleWiseMenuAccessInfoList: RoleWiseMenuAcccessInfoUpdate[]): Observable<any> {
        var url = '/role-def/update-role-menu-access-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, roleWiseMenuAccessInfoList);
    }

    saveMenuRoleAccess(menuRoleAccess: MenuRoleAccessUpdate): Observable<any> {
        var url = '/role-def/update-menu-role-access';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, menuRoleAccess);
    }

}
