import { AccessDef } from "./role-def-fetch";

export interface ContextUserBasicInfo {
    userInfoId: string;
    userName: string;
}

export interface LanguageDef {
    backendDate: string;
    languageJson: string;
    langInfoCache: string;
    frontendDate: string;
    languageCompetencyId: string;
}


export interface CompanyCategoryFetch {
    companyCategoryId: String,
    companyCategoryName: String,
}

export interface UserCompanyAccess {
    companyId: string;
    companyName: string;
    userInfoId: string;
    userName: string;
    userMenuDef: UserMenuDef[];
    preference: boolean;
    approvalStatus: string;
}

export interface CompanyContext {
    companyId: string;
    companyName: string;
    approvalStatus: string;
}

export interface MenuCategory {
    menuCategoryId: String,
    menuCategoryName: String,
}

export interface StaticPageFetch {
    staticPageId: string;
    staticContent: string;
    backendDate: string;
    frontendDate: string;
    dxrInfoCache: string;
}

export interface CacheUrlData {
    url: string,
    data: any
}

export interface UserMenuDef {
    menuId: string;
    menuTitleEng: string;
    menuTitleJpn: string;
    menuUrl: string;
    parentSegment: string;
    menuParent: string;
    menuTypeId: string;
    companyCategoryId: string;
    accessInfo: AccessDef;
    child: UserMenuDef[],
    outletName: string;
    menuTitle: string;
}

export interface RemoveTriggerData {
    itemeId: string;
    triggerUserId: string;
    triggerCompanyId: string;
    removeOperationType: string;
}

export interface DataForwardLink {
    itemId: string;
    itemTitle: string;
    itemDataType: string;
}

export interface DataForwardLinkReturn {
    totalForwardLink: number;
    dataForwardLinks: DataForwardLink[];
    forwardLinkDataTypeLabelKey: string;
}

export interface RemovedData {
    removedDataId: string;
    removeTime: string;
    dataId: string;
    dataTitle: string;
    operationType: string;
    userInfoId: string;
    userName: string;
    userCompanyId: string;
    userCompanyName: string;
    restoreStatus: string;
    restoreTime: string;
    restoreUserInfoId: string;
}

export interface DataLink {
    linkedId: string;
    linkedModel: string;
}

export interface RestoreInfo {
    removedInfoId: string;
    triggerUserId: string;
}