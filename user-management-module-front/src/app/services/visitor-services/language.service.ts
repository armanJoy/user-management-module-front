import { ArrayType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppConstant } from 'src/app/config/app-constant';
import { UriService } from './uri.service';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyContext, ContextUserBasicInfo, LanguageDef, UserCompanyAccess, UserMenuDef } from 'src/app/models/backend-fetch/dxr-system';

@Injectable({
    providedIn: 'root'
})

export class LanguageService {

    constructor(private cookieService: CookieService, private snakebar: MatSnackBar) {

    }
    UI_LABELS: any = [];

    sortMenuListAccordingToMenuSequence(menuList: any[]): any[] {
        if (menuList) {
            var menuSequence: any[] = AppConstant.MENU_SEQUENCE.sort((a, b) => (a.serial < b.serial) ? 1 : -1);
            var menuIdSequence: string[] = [];
            menuSequence.forEach(eachItem => {
                menuIdSequence.push(eachItem.id);
            })

            menuList.sort((a, b) => (menuIdSequence.indexOf(b.menuId) - menuIdSequence.indexOf(a.menuId)));
        }

        return menuList;
    }

    public getSelectedLanguageIndex() {
        return this.cookieService.get(AppConstant.LANG_INDEX_KEY);
    }

    getLocalstorageLanguage() {
        var localLangDef: any = localStorage.getItem(AppConstant.LANGUAGE_DEF_LOCALSTORAGE_KEY);

        var languageArray = JSON.parse(localLangDef);

        return languageArray;
    }

    setLocalstorageLanguage(languageDef: LanguageDef) {
        localStorage.setItem(AppConstant.LANGUAGE_DEF_LOCALSTORAGE_KEY, JSON.stringify(languageDef));
        return languageDef;

    }

    getLanguageCacheDate() {
        var langageData: LanguageDef = this.getLocalstorageLanguage();

        if (!langageData) {
            langageData = {
                backendDate: '00000000000000',
                languageJson: '',
                langInfoCache: '',
                frontendDate: '',
                languageCompetencyId: ''
            }

            this.setLocalstorageLanguage(langageData);
        }

        return langageData.backendDate;
    }

    setLanguageDefData(languageDef: LanguageDef) {

        try {
            if (languageDef) {
                var languageData = (languageDef.langInfoCache == "0") ? this.setLocalstorageLanguage(languageDef).languageJson : this.getLocalstorageLanguage().languageJson;

                this.UI_LABELS = JSON.parse(languageData);

            } else {
                throw new Error;
            }

        } catch (error) {
            this.snakebar.open('Failed to load language definition. Please chekc provided Language File', '', {
                duration: 3000,
                verticalPosition: 'top'
            })
            this.UI_LABELS = this.DEFAULT_LANGUAGE_DEF;
        }


    }

    public getUiLabels(compCode: string, labelType: string) {


        var langIndex = this.getSelectedLanguageIndex();
        var resultLabels = {};

        if (this.UI_LABELS) {
            var componentInfo = this.getComponentInfo(compCode, labelType);
            if (componentInfo && componentInfo.length > 0) {
                resultLabels = this.getLangSpecificLabels(componentInfo, langIndex);
            }
        }

        return resultLabels;

    }

    getComponentInfo(compCode: string, labelType: string) {
        var componentInfo: any = [];
        if (this.UI_LABELS) {
            this.UI_LABELS.forEach((element: { componentCode: string; labels: any; messages: any; notifications: any; }) => {
                if (element.componentCode == compCode) {
                    if (labelType == 'labels') {
                        componentInfo = element.labels;
                    } else if (labelType == 'messages') {
                        componentInfo = element.messages;
                    } else if (labelType == 'notifications') {
                        componentInfo = element.notifications;
                    }
                    else if (labelType == AppConstant.UI_MENU_LIST) {
                        componentInfo = this.getMenuListOfComponent(compCode);
                    }
                }
            });
        }

        return componentInfo;
    }

    getMenuListOfComponent(compCode: string) {
        var componentInfo: any = [];
        if (this.MENU_LIST) {
            this.MENU_LIST.forEach(element => {
                if (element.componentCode == compCode) {

                    componentInfo = element.menus;

                }
            });
        }

        return componentInfo;
    }

    getLangSpecificLabels(labels: any, langAttr: string) {

        var resultLabels: any = {};
        if (labels) {
            labels.forEach((element: any) => {
                resultLabels[element.key] = element[langAttr];
            });
        }

        return resultLabels;
    }

    getSecondaryMenuList(parentMenuId: string) {

        var secondaryMenuList: any = [];


        if (this.UI_LABELS) {

            var secondaryMenuItems: any[] = this.getSecondaryMenuItems(parentMenuId);

            var langIndex = this.getSelectedLanguageIndex();

            var menuTitle = (langIndex == AppConstant.LANG_INDEX_ENG) ? (AppConstant.ENGLISH_MENU_TITLE) : (AppConstant.JAPANESE_MENU_TITLE);

            if (secondaryMenuItems && secondaryMenuItems.length > 0) {

                secondaryMenuItems.forEach((element: any) => {
                    var menu = element;
                    menu.menuTitle = element[menuTitle];
                    // var menu = {
                    //     menuId: element.menuId,
                    //     menuTitle: element[menuTitle],
                    //     menuUrl: element.menuUrl,
                    //     parentSegment: '',
                    //     child: <any>[]
                    // };

                    // if (element.parentSegment) {
                    //     menu.parentSegment = element.parentSegment;
                    // }
                    if (menu.child) {
                        menu.child.forEach((childElement: any) => {
                            childElement.menuTitle = childElement[menuTitle];
                            // var childMenu = {
                            //     menuId: childElement.menuId,
                            //     menuTitle: childElement[menuTitle],
                            //     menuUrl: childElement.menuUrl,
                            //     parentSegment: '',
                            // };

                            // if (childElement.parentSegment) {
                            //     childMenu.parentSegment = childElement.parentSegment;
                            // }
                            // menu.child.push(childMenu);
                        });
                    }
                    secondaryMenuList.push(menu);
                });

            }
        }

        return secondaryMenuList;

    }

    getSecondaryMenuItems(parentMenuId: string) {
        var secondaryMenulist: UserMenuDef[] = [];
        if (parentMenuId) {
            this.USER_MENU_ITEMS.forEach((menu) => {
                if (parentMenuId == menu.menuId) {
                    secondaryMenulist = menu.child
                }
                else if (menu) {
                    menu.child.forEach((secondaryMenu: UserMenuDef) => {
                        if (secondaryMenu.menuId == parentMenuId) {
                            secondaryMenulist = secondaryMenu.child;
                        }
                    })
                }

                menu.child = this.sortMenuListAccordingToMenuSequence(JSON.parse(JSON.stringify(menu.child)));

            })

        }

        secondaryMenulist = this.sortMenuListAccordingToMenuSequence(JSON.parse(JSON.stringify(secondaryMenulist)));

        return secondaryMenulist;
    }

    setCurrentContextMenuItems(menus: UserCompanyAccess[], previouslySelectedCompanyId?: string) {

        if (menus && menus.length > 0) {
            if (previouslySelectedCompanyId) {
                menus.forEach(element => {
                    if (element.companyId == previouslySelectedCompanyId) {
                        this.USER_MENU_ITEMS = element.userMenuDef;
                    }
                });
            } else {
                const preferedCompanyMenuDef = menus.find(item => item.preference == true);
                this.USER_MENU_ITEMS = (preferedCompanyMenuDef) ? preferedCompanyMenuDef.userMenuDef : menus[0].userMenuDef;
            }

        }
    }

    resetUserMenuItems() {
        this.USER_MENU_ITEMS = [];
    }

    getUserMenuList() {
        return this.USER_MENU_ITEMS;
    }

    getMenuById(menuId: string, menus?: UserMenuDef[]) {

        var menu: UserMenuDef | undefined;

        if (!menus) {
            menus = this.USER_MENU_ITEMS;
        }

        console.log(menus);

        var searchResult: UserMenuDef | undefined = menus.find(item => item.menuId == menuId);

        if (searchResult) {
            menu = searchResult;

        } else {

            for (let i = 0; i < menus.length; i++) {
                const eachMenu = menus[i];

                if (!searchResult && eachMenu.child && eachMenu.child.length > 0) {
                    searchResult = this.getMenuById(menuId, eachMenu.child);
                }

                if (searchResult) {
                    menu = searchResult;
                    break;
                }
            }
        }

        return menu;
    }

    getUserMenuItems() {
        var menuList: any[] = [];
        var langIndex = this.getSelectedLanguageIndex();

        var menuTitle = (langIndex == AppConstant.LANG_INDEX_ENG) ? (AppConstant.ENGLISH_MENU_TITLE) : (AppConstant.JAPANESE_MENU_TITLE);

        if (this.USER_MENU_ITEMS && this.USER_MENU_ITEMS.length > 0) {

            this.USER_MENU_ITEMS.forEach((element: any) => {
                if (!AppConstant.MOBILE_MENU_IDS.includes(element.menuId)) {
                    var menu = element;
                    menu.menuTitle = element[menuTitle];
                    // {
                    //     menuId: element.menuId,
                    //     menuTitle: element[menuTitle],
                    //     menuUrl: element.menuUrl,
                    //     parentSegment: '',
                    //     child: <any>[]
                    // };

                    // if (element.parentSegment) {
                    //     menu.parentSegment = element.parentSegment;
                    // }
                    if (menu.child) {
                        menu.child.forEach((childElement: any) => {
                            childElement.menuTitle = childElement[menuTitle];
                            // var childMenu = {
                            //     menuId: childElement.menuId,
                            //     menuTitle: childElement[menuTitle],
                            //     menuUrl: childElement.menuUrl,
                            //     parentSegment: '',
                            // };

                            // if (childElement.parentSegment) {
                            //     childMenu.parentSegment = childElement.parentSegment;
                            // }
                            // menu.child.push(childMenu);
                        });

                        // menu.child = this.sortMenuListAccordingToMenuSequence(JSON.parse(JSON.stringify(menu.child)));
                    }
                    menuList.push(menu);
                }
            });

            menuList = this.preparePresentationMenuList(menuList)

        } else {
            var commonMenus: [] = this.getCommonMenuItems();
            if (commonMenus && commonMenus.length > 0) {
                commonMenus.forEach(eachMenu => {
                    menuList.push(eachMenu);
                })

            }
        }

        // menuList = this.sortMenuListAccordingToMenuSequence(JSON.parse(JSON.stringify(menuList)));
        // console.log(JSON.stringify(menuList));
        return menuList;
        // console.log()
    }

    preparePresentationMenuList(menuList: UserMenuDef[]): UserMenuDef[] {
        var userMenu: any[] = [];
        var menuListString: string = JSON.stringify(menuList);

        var langIndex = this.getSelectedLanguageIndex();
        var menuTitle = (langIndex == AppConstant.LANG_INDEX_ENG) ? (AppConstant.ENGLISH_MENU_TITLE) : (AppConstant.JAPANESE_MENU_TITLE);

        this.PRESENTATION_MENU_DEF.forEach((eachPresentationMenu: any) => {

            var isMenuAccesible: boolean = this.checkMenuAccesibility(menuList, eachPresentationMenu);

            var menuItem: any = JSON.parse(JSON.stringify(eachPresentationMenu));
            menuItem.child = [];
            menuItem.menuTitle = menuItem[menuTitle];

            var childItems: any[] = []

            if (eachPresentationMenu.child && eachPresentationMenu.child.length > 0) {
                eachPresentationMenu.child.forEach((eachChild: any) => {
                    var isChildMenuAccessible: boolean = this.checkMenuAccesibility(menuList, eachChild);

                    if (isChildMenuAccessible) {
                        isMenuAccesible = true;
                        var childCopy = JSON.parse(JSON.stringify(eachChild));
                        childCopy.menuTitle = childCopy[menuTitle];
                        childItems.push(childCopy);
                    }

                });
            }

            if (isMenuAccesible) {
                userMenu.push(menuItem);
                menuItem.child = childItems;

            }
        });

        return userMenu;

    }

    checkMenuAccesibility(menuListString: UserMenuDef[], eachPresentationMenu: any): boolean {

        var flatMenuLIst: UserMenuDef[] = [];

        menuListString.forEach(eachMenu => {
            if (eachMenu) {
                flatMenuLIst.push(eachMenu);
                flatMenuLIst.push(...eachMenu.child)
            }
        })

        var isMenuAccesible: boolean = false;

        if (eachPresentationMenu && (flatMenuLIst.find(item => item.menuId == eachPresentationMenu.menuId))) {
            isMenuAccesible = true;
        } else if (eachPresentationMenu.child && eachPresentationMenu.child.length > 0) {
            eachPresentationMenu.child.forEach((eachChild: any) => {
                if (eachChild && flatMenuLIst.includes(eachChild.menuId)) {
                    isMenuAccesible = true;
                }
            });
        }

        return isMenuAccesible;
    }

    getCommonMenuItems() {
        var menuList: any = [];
        var langIndex = this.getSelectedLanguageIndex();

        var menuTitle = (langIndex == AppConstant.LANG_INDEX_ENG) ? (AppConstant.ENGLISH_MENU_TITLE) : (AppConstant.JAPANESE_MENU_TITLE);

        if (this.COMMON_MENU_ITEMS && this.COMMON_MENU_ITEMS.length > 0) {


            this.COMMON_MENU_ITEMS.forEach((element: any) => {
                var menu = {
                    menuId: element.menuId,
                    menuTitle: element[menuTitle],
                    menuUrl: element.menuUrl,
                    parentSegment: '',
                    menuTypeId: '',
                    child: <any>[]
                };

                if (element.parentSegment) {
                    menu.parentSegment = element.parentSegment;
                }

                if (element.menuTypeId) {
                    menu.menuTypeId = element.menuTypeId;
                }

                if (element.child) {
                    element.child.forEach((childElement: any) => {
                        var childMenu = {
                            menuId: childElement.menuId,
                            menuTitle: childElement[menuTitle],
                            menuUrl: childElement.menuUrl,
                            parentSegment: '',
                            menuTypeId: ''
                        };

                        if (childElement.parentSegment) {
                            childMenu.parentSegment = childElement.parentSegment;
                        }
                        if (childElement.menuTypeId) {
                            childMenu.menuTypeId = childElement.menuTypeId;
                        }
                        menu.child.push(childMenu);
                    });
                }
                menuList.push(menu);
            });

        }

        return menuList;
    }

    setUserAccessInfo(userAccessInfo: any[]) {
        if (userAccessInfo && userAccessInfo.length > 0) {
            this.USER_ACCESS_INFO = userAccessInfo;
        }
    }

    getUserAccessInfo(): any[] {

        return this.USER_ACCESS_INFO;

    }

    getEnrolledCompanyList(): CompanyContext[] {
        debugger
        var companyContextList: CompanyContext[] = [];
        if (this.USER_ACCESS_INFO) {
            this.USER_ACCESS_INFO.forEach(element => {
                var companyContextInfo: CompanyContext = {
                    companyId: element.companyId,
                    companyName: element.companyName,
                    approvalStatus: element.approvalStatus
                }
                companyContextList.push(companyContextInfo);
            });
        }

        return companyContextList;

    }

    getCurrentUserBasicInfo(companyId: string): ContextUserBasicInfo {
        var userContextInfo: ContextUserBasicInfo = {} as ContextUserBasicInfo;

        if (this.USER_ACCESS_INFO) {
            this.USER_ACCESS_INFO.forEach(element => {
                if (element.companyId == companyId) {
                    userContextInfo = {
                        userInfoId: element.userInfoId,
                        userName: element.userName
                    }
                }

            });
        }
        return userContextInfo;
    }

    getCurrentCompany(companyId: string): CompanyContext {
        var companyContextInfo: CompanyContext = {} as CompanyContext;

        if (this.USER_ACCESS_INFO) {
            this.USER_ACCESS_INFO.forEach(element => {
                if (element.companyId == companyId) {
                    companyContextInfo = {
                        companyId: element.companyId,
                        companyName: element.companyName,
                        approvalStatus: element.approvalStatus
                    }
                }

            });
        }
        return companyContextInfo;
    }

    resetUserAccessInfo() {
        this.USER_ACCESS_INFO = [];

    }

    USER_ACCESS_INFO: UserCompanyAccess[] = [];

    USER_MENU_ITEMS: UserMenuDef[] = [];

    PRESENTATION_MENU_DEF: any = [
        {
            "menuId": "sysAdminSystemOverview",
            "menuTitleEng": "System Overview",
            "menuTitleJpn": "システム概要",
            "menuUrl": "system-overview-admin",
            "parentSegment": "/system-admin",
            "menuParent": "menudefSystemAdmin|",
            "menuTypeId": "menutype0001",
            "outletName": "dxrSysAdminOutlet",
            "child": [],
            "menuTitle": "System Overview",
            "primaryMenuId": "sysAdminSystemOverview",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "",
            "secondaryMenuBreakId": ""
        },
        {
            "menuId": "sysAdminSubscription",
            "menuTitleEng": "Subscription",
            "menuTitleJpn": "利用申込",
            "menuUrl": "subscription-admin",
            "parentSegment": "/system-admin",
            "menuParent": "menudefSystemAdmin|",
            "menuTypeId": "menutype0001",
            "outletName": "dxrSysAdminOutlet",
            "child": [],
            "menuTitle": "Subscription",
            "primaryMenuId": "sysAdminSubscription",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "",
            "secondaryMenuBreakId": ""
        },
        {
            "menuId": "sysAdminFaq",
            "menuTitleEng": "FAQ",
            "menuTitleJpn": "よくある質問",
            "menuUrl": "faq-admin",
            "parentSegment": "/system-admin",
            "menuParent": "menudefSystemAdmin|",
            "menuTypeId": "menutype0001",
            "outletName": "dxrSysAdminOutlet",
            "child": [],
            "menuTitle": "FAQ",
            "primaryMenuId": "sysAdminFaq",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "",
            "secondaryMenuBreakId": ""
        },
        {
            "menuId": "sysAdminInquiry",
            "menuTitleEng": "Inquiry",
            "menuTitleJpn": "問合せ",
            "menuUrl": "inquiry-admin",
            "parentSegment": "/system-admin",
            "menuParent": "menudefSystemAdmin|",
            "menuTypeId": "menutype0001",
            "outletName": "dxrSysAdminOutlet",
            "child": [],
            "menuTitle": "Inquiry",
            "primaryMenuId": "sysAdminInquiry",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "",
            "secondaryMenuBreakId": ""
        },
        {
            "menuId": "sysAdminRoleDef",
            "menuTitleEng": "Role Definition",
            "menuTitleJpn": "役割の定義",
            "menuUrl": "role-def-admin",
            "parentSegment": "/system-admin",
            "menuParent": "menudefSystemAdmin|",
            "menuTypeId": "menutype0001",
            "outletName": "dxrSysAdminOutlet",
            "child": [],
            "menuTitle": "Role Definition",
            "primaryMenuId": "menudefSystemAdmin",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "sysAdminRoleDef",
            "secondaryMenuBreakId": ""
        },
        {
            "menuId": "vehicleSetup",
            "menuTitleEng": "Vehicle Setup",
            "menuTitleJpn": "車両設定",
            "menuUrl": "vehicle-setup",
            "parentSegment": "/system-admin",
            "menuParent": "menudefSystemAdmin|",
            "menuTypeId": "menutype0001",
            "outletName": "dxrSysAdminOutlet",
            "child": [],
            "menuTitle": "Vehicle Setup",
            "primaryMenuId": "menudefSystemAdmin",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "vehicleSetup",
            "secondaryMenuBreakId": ""
        },
        {
            "menuId": "sysAdminWasteDef",
            "menuTitleEng": "Waste Def",
            "menuTitleJpn": "破棄物の名称",
            "menuUrl": "waste-def-admin",
            "parentSegment": "/system-admin",
            "menuParent": "menudefSystemAdmin|",
            "menuTypeId": "menutype0001",
            "outletName": "dxrSysAdminOutlet",
            "child": [],
            "menuTitle": "Waste Def",
            "primaryMenuId": "menudefSystemAdmin",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "sysAdminWasteDef",
            "secondaryMenuBreakId": ""
        },
        {
            "menuId": "sysAdminWasteRequest",
            "menuTitleEng": "Waste Request",
            "menuTitleJpn": "廃棄物のリクエスト",
            "menuUrl": "waste-request-admin",
            "parentSegment": "/system-admin",
            "menuParent": "menudefSystemAdmin|",
            "menuTypeId": "menutype0001",
            "outletName": "dxrSysAdminOutlet",
            "child": [],
            "menuTitle": "Waste Request",
            "primaryMenuId": "menudefSystemAdmin",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "sysAdminWasteRequest",
            "secondaryMenuBreakId": ""
        },
        {
            "menuId": "initiateProject",
            "menuTitleEng": "Project",
            "menuTitleJpn": "案件一覧",
            "menuUrl": "initiate-project",
            "parentSegment": "/company-admin/project",
            "menuParent": "menudef0002|",
            "menuTypeId": "menutype0001",
            "outletName": "dumperAdminOutlet",
            "companyCategoryId": "menucat002",
            "child": [],
            "menuTitle": "Initiate Project",
            "primaryMenuId": "menudef0002",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "initiateProject",
            "secondaryMenuBreakId": ""
        },
        {
            "menuId": "menudefBusinessAgreement",
            "menuTitleEng": "Agreement",
            "menuTitleJpn": "契約一覧",
            "menuUrl": "business-agreement",
            "parentSegment": "/company-admin/project",
            "menuParent": "menudef0002|",
            "menuTypeId": "menutype0001",
            "outletName": "dumperAdminOutlet",
            "companyCategoryId": "menucat002",
            "child": [],
            "menuTitle": "Agreement",
            "primaryMenuId": "menudef0002",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "menudefBusinessAgreement",
            "secondaryMenuBreakId": ""
        },
        {
            "menuId": "projectScheduleMenu",
            "menuTitleEng": "Create Schedule",
            "menuTitleJpn": "スケジュール",
            "menuUrl": "create-schedule",
            "parentSegment": "/company-admin/project",
            "menuParent": "menudef0002|",
            "menuTypeId": "menutype0001",
            "outletName": "dumperAdminOutlet",
            "companyCategoryId": "menucat002",
            "child": [],
            "menuTitle": "Create Schedule",
            "primaryMenuId": "menudef0002",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "projectScheduleMenu",
            "secondaryMenuBreakId": ""
        },
        // {
        //     "menuId": "menudefWasteOperation",
        //     "menuTitleEng": "Waste Operation",
        //     "menuTitleJpn": "廃棄物の検索",
        //     "menuUrl": "company-admin/project",
        //     "parentSegment": "",
        //     "menuParent": "",
        //     "menuTypeId": "menutype0001",
        //     "outletName": "",
        //     "menuTitle": "Waste Operation",
        //     "primaryMenuId": "",
        //     "primaryMenuBrekId": "",
        //     "secondaryMenuId": "",
        //     "secondaryMenuBreakId": "",
        //     "child": [
        //         {
        //             "menuId": "loadMenuWeb",
        //             "menuTitleEng": "Load",
        //             "menuTitleJpn": "積み込み操作",
        //             "menuUrl": "load-web",
        //             "parentSegment": "/company-admin/project",
        //             "menuParent": "menudef0002|",
        //             "menuTypeId": "menutype0001",
        //             "outletName": "dumperAdminOutlet",
        //             "companyCategoryId": "menucat002",
        //             "child": [],
        //             "menuTitle": "Load",
        //             "primaryMenuId": "menudef0002",
        //             "primaryMenuBrekId": "",
        //             "secondaryMenuId": "loadMenuWeb",
        //             "secondaryMenuBreakId": ""
        //         },
        //         {
        //             "menuId": "unloadMenuWeb",
        //             "menuTitleEng": "Unload",
        //             "menuTitleJpn": "荷下ろし操作",
        //             "menuUrl": "unload-web",
        //             "parentSegment": "/company-admin/project",
        //             "menuParent": "menudef0002|",
        //             "menuTypeId": "menutype0001",
        //             "outletName": "dumperAdminOutlet",
        //             "companyCategoryId": "menucat002",
        //             "child": [],
        //             "menuTitle": "Unload",
        //             "primaryMenuId": "menudef0002",
        //             "primaryMenuBrekId": "",
        //             "secondaryMenuId": "unloadMenuWeb",
        //             "secondaryMenuBreakId": ""
        //         }
        //     ]
        // },
        {
            "menuId": "menudefManifesto",
            "menuTitleEng": "Menifesto",
            "menuTitleJpn": "マニフェスト",
            "menuUrl": "company-admin/project",
            "parentSegment": "",
            "menuParent": "",
            "menuTypeId": "menutype0001",
            "outletName": "",
            "menuTitle": "Menifesto",
            "primaryMenuId": "",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "",
            "secondaryMenuBreakId": "",
            "child": [
                {
                    "menuId": "processCompletionMenu",
                    "menuTitleEng": "Process Completion",
                    "menuTitleJpn": "処理完了",
                    "menuUrl": "process-completion",
                    "parentSegment": "/company-admin/project",
                    "menuParent": "menudef0002|",
                    "menuTypeId": "menutype0001",
                    "outletName": "dumperAdminOutlet",
                    "child": [],
                    "menuTitle": "Process Completion",
                    "primaryMenuId": "menudef0002",
                    "primaryMenuBrekId": "",
                    "secondaryMenuId": "processCompletionMenu",
                    "secondaryMenuBreakId": ""
                },
                {
                    "menuId": "menifestoMenu",
                    "menuTitleEng": "Menifesto",
                    "menuTitleJpn": "マニフェスト",
                    "menuUrl": "menifesto",
                    "parentSegment": "/company-admin/project",
                    "menuParent": "menudef0002|",
                    "menuTypeId": "menutype0001",
                    "outletName": "dumperAdminOutlet",
                    "companyCategoryId": "menucat002",
                    "child": [],
                    "menuTitle": "Menifesto",
                    "primaryMenuId": "menudef0002",
                    "primaryMenuBrekId": "",
                    "secondaryMenuId": "menifestoMenu",
                    "secondaryMenuBreakId": ""
                }
            ]
        },
        {
            "menuId": "invoiceMenu",
            "menuTitleEng": "Invoice",
            "menuTitleJpn": "請求書",
            "menuUrl": "invoice",
            "parentSegment": "/company-admin/project",
            "menuParent": "menudef0002|",
            "menuTypeId": "menutype0001",
            "outletName": "dumperAdminOutlet",
            "companyCategoryId": "menucat002",
            "child": [],
            "menuTitle": "Invoice",
            "primaryMenuId": "menudef0002",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "invoiceMenu",
            "secondaryMenuBreakId": ""
        },
        {
            "menuId": "menudef0001",
            "menuTitleEng": "Company Management",
            "menuTitleJpn": "会社管理",
            "menuUrl": "company-admin/settings",
            "parentSegment": "",
            "menuParent": "",
            "menuTypeId": "menutype0001",
            "outletName": "",
            "menuTitle": "Company Management",
            "primaryMenuId": "menudef0001",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "",
            "secondaryMenuBreakId": "",
            "child": [
                {
                    "menuId": "menudef00011",
                    "menuTitleEng": "Company Settings",
                    "menuTitleJpn": "会社情報設定",
                    "menuUrl": "company-settings",
                    "parentSegment": "/company-admin/settings",
                    "menuParent": "menudef0001|",
                    "menuTypeId": "menutype0001",
                    "outletName": "companyAdminOutlet",
                    "child": [],
                    "menuTitle": "Company Settings",
                    "primaryMenuId": "menudef0001",
                    "primaryMenuBrekId": "",
                    "secondaryMenuId": "menudef00011",
                    "secondaryMenuBreakId": ""
                },
                // {
                //     "menuId": "menudef00012",
                //     "menuTitleEng": "User Management",
                //     "menuTitleJpn": "ユーザー管理",
                //     "menuUrl": "user-management",
                //     "parentSegment": "/company-admin/settings",
                //     "menuParent": "menudef0001|",
                //     "menuTypeId": "menutype0001",
                //     "outletName": "companyAdminOutlet",
                //     "child": [],
                //     "menuTitle": "User Management",
                //     "primaryMenuId": "menudef0001",
                //     "primaryMenuBrekId": "",
                //     "secondaryMenuId": "menudef00012",
                //     "secondaryMenuBreakId": ""
                // },
                // {
                //     "menuId": "dataRestoreMenu",
                //     "menuTitleEng": "Data Restore",
                //     "menuTitleJpn": "Data Restore",
                //     "menuUrl": "data-restore",
                //     "parentSegment": "/company-admin/project",
                //     "menuParent": "menudef0002|",
                //     "menuTypeId": "menutype0001",
                //     "outletName": "dumperAdminOutlet",
                //     "companyCategoryId": "menucat002",
                //     "child": [],
                //     "menuTitle": "Data Restore",
                //     "primaryMenuId": "menudef0001",
                //     "primaryMenuBrekId": "",
                //     "secondaryMenuId": "dataRestoreMenu",
                //     "secondaryMenuBreakId": ""
                // }
            ]
        },
        {
            "menuId": "dxrSuperAdmin",
            "menuTitleEng": "System Admin Op",
            "menuTitleJpn": "System Admin Op",
            "menuUrl": "/super-admin",
            "parentSegment": "",
            "menuParent": "",
            "menuTypeId": "menutype0001",
            "menuTitle": "System Admin Op",
            "primaryMenuId": "menudef0001",
            "primaryMenuBrekId": "",
            "secondaryMenuId": "menudef00012",
            "secondaryMenuBreakId": "",
            "child": [
                {
                    "menuId": "languageSetup",
                    "menuTitleEng": "Language Setup",
                    "menuTitleJpn": "Language Setup",
                    "menuUrl": "super-admin/component-list",
                    "parentSegment": "",
                    "menuParent": "dxrSuperAdmin|",
                    "menuTypeId": "menutype0001",
                    "child": [],
                    "menuTitle": "Language Setup",
                    "primaryMenuId": "dxrSuperAdmin",
                    "primaryMenuBrekId": "",
                    "secondaryMenuId": "languageSetup",
                    "secondaryMenuBreakId": ""
                },
                {
                    "menuId": "createDxrAdmin",
                    "menuTitleEng": "Create DXR Admin",
                    "menuTitleJpn": "Create DXR Admin",
                    "menuUrl": "super-admin/create-dxr-admin",
                    "parentSegment": "",
                    "menuParent": "dxrSuperAdmin|",
                    "menuTypeId": "menutype0001",
                    "child": [],
                    "menuTitle": "Create DXR Admin",
                    "primaryMenuId": "dxrSuperAdmin",
                    "primaryMenuBrekId": "",
                    "secondaryMenuId": "createDxrAdmin",
                    "secondaryMenuBreakId": ""
                },
                {
                    "menuId": "setDxrAdminAccess",
                    "menuTitleEng": "Set DXR Admin Access",
                    "menuTitleJpn": "Set DXR Admin Access",
                    "menuUrl": "super-admin/set-dxr-admin-access",
                    "parentSegment": "",
                    "menuParent": "dxrSuperAdmin|",
                    "menuTypeId": "menutype0001",
                    "child": [],
                    "menuTitle": "Set DXR Admin Access",
                    "primaryMenuId": "dxrSuperAdmin",
                    "primaryMenuBrekId": "",
                    "secondaryMenuId": "setDxrAdminAccess",
                    "secondaryMenuBreakId": ""
                },
                {
                    "menuId": "setCompanyAdminAccess",
                    "menuTitleEng": "Set Company Admin Access",
                    "menuTitleJpn": "Set Company Admin Access",
                    "menuUrl": "super-admin/set-company-admin-access",
                    "parentSegment": "",
                    "menuParent": "dxrSuperAdmin|",
                    "menuTypeId": "menutype0001",
                    "child": [],
                    "menuTitle": "Set Company Admin Access",
                    "primaryMenuId": "dxrSuperAdmin",
                    "primaryMenuBrekId": "",
                    "secondaryMenuId": "setCompanyAdminAccess",
                    "secondaryMenuBreakId": ""
                },
                {
                    "menuId": "subscriptionProcessDef",
                    "menuTitleEng": "Set Subscription Process Def",
                    "menuTitleJpn": "Set Subscription Process Def",
                    "menuUrl": "super-admin/set-subscription-process-def",
                    "parentSegment": "",
                    "menuParent": "dxrSuperAdmin|",
                    "menuTypeId": "menutype0001",
                    "child": [],
                    "menuTitle": "Set Subscription Process Def",
                    "primaryMenuId": "dxrSuperAdmin",
                    "primaryMenuBrekId": "",
                    "secondaryMenuId": "subscriptionProcessDef",
                    "secondaryMenuBreakId": ""
                },
                {
                    "menuId": "agreementProcessDef",
                    "menuTitleEng": "Set Agreement Process Def",
                    "menuTitleJpn": "Set Agreement Process Def",
                    "menuUrl": "super-admin/set-agreement-process-def",
                    "parentSegment": "",
                    "menuParent": "dxrSuperAdmin|",
                    "menuTypeId": "menutype0001",
                    "child": [],
                    "menuTitle": "Set Agreement Process Def",
                    "primaryMenuId": "dxrSuperAdmin",
                    "primaryMenuBrekId": "",
                    "secondaryMenuId": "agreementProcessDef",
                    "secondaryMenuBreakId": ""
                },
                {
                    "menuId": "projectProcessDef",
                    "menuTitleEng": "Set Project Process Def",
                    "menuTitleJpn": "Set Project Process Def",
                    "menuUrl": "super-admin/set-project-process-def",
                    "parentSegment": "",
                    "menuParent": "dxrSuperAdmin|",
                    "menuTypeId": "menutype0001",
                    "child": [],
                    "menuTitle": "Set Project Process Def",
                    "primaryMenuId": "dxrSuperAdmin",
                    "primaryMenuBrekId": "",
                    "secondaryMenuId": "projectProcessDef",
                    "secondaryMenuBreakId": ""
                },
                {
                    "menuId": "invoiceProcessDef",
                    "menuTitleEng": "Set Invoice Process Def",
                    "menuTitleJpn": "Set Invoice Process Def",
                    "menuUrl": "super-admin/set-invoice-process-def",
                    "parentSegment": "",
                    "menuParent": "dxrSuperAdmin|",
                    "menuTypeId": "menutype0001",
                    "child": [],
                    "menuTitle": "Set Invoice Process Def",
                    "primaryMenuId": "dxrSuperAdmin",
                    "primaryMenuBrekId": "",
                    "secondaryMenuId": "invoiceProcessDef",
                    "secondaryMenuBreakId": ""
                },
                {
                    "menuId": "notificationProcessDef",
                    "menuTitleEng": "Set notification Process Def",
                    "menuTitleJpn": "Set notification Process Def",
                    "menuUrl": "super-admin/set-notification-process-def",
                    "parentSegment": "",
                    "menuParent": "dxrSuperAdmin|",
                    "menuTypeId": "menutype0001",
                    "child": [],
                    "menuTitle": "Set notification Process Def",
                    "primaryMenuId": "dxrSuperAdmin",
                    "primaryMenuBrekId": "",
                    "secondaryMenuId": "notificationProcessDef",
                    "secondaryMenuBreakId": ""
                }
            ]
        },
        // {
        //     "menuId": "dataRestoreMenu",
        //     "menuTitleEng": "Data Restore",
        //     "menuTitleJpn": "データの復元",
        //     "menuUrl": "data-restore",
        //     "parentSegment": "/company-admin/project",
        //     "menuParent": "menudef0002|",
        //     "menuTypeId": "menutype0001",
        //     "outletName": "dumperAdminOutlet",
        //     "child": [],
        //     "menuTitle": "Data Restore",
        //     "primaryMenuId": "menudef0002",
        //     "primaryMenuBrekId": "",
        //     "secondaryMenuId": "dataRestoreMenu",
        //     "secondaryMenuBreakId": ""
        // }
    ];

    COMMON_MENU_ITEMS = [
        {
            menuId: 'systemOverview',
            menuTitleEng: 'System Overview',
            menuTitleJpn: 'システム概要',
            menuUrl: '/visitor/system-overview/0',
        },
        {
            menuId: 'subscription',
            menuTitleEng: 'Subscription',
            menuTitleJpn: '利用申込',
            menuUrl: '/visitor/subscription'
        },
        {
            menuId: 'faq',
            menuTitleEng: 'FAQ',
            menuTitleJpn: 'よくある質問',
            menuUrl: '/visitor/faq'
        },
        {
            menuId: 'inquiry',
            menuTitleEng: 'Inquiry',
            menuTitleJpn: '問合せ',
            menuUrl: '/visitor/inquiry'
        }
    ];

    DEFAULT_LANGUAGE_DEF = [
        {
            "componentCode": "appRoot",
            "componentName": "Primary Menu",
            "labels": [
                {
                    "key": "primaryMenuHead",
                    "eng": "DX-R",
                    "jpn": "DX-R"
                },
                {
                    "key": "login",
                    "eng": "Login",
                    "jpn": "ログイン"
                },
                {
                    "key": "logout",
                    "eng": "Log Out",
                    "jpn": "ログアウト"
                },
                {
                    "key": "companyUsingItTabHead",
                    "eng": "Company using it",
                    "jpn": "運営会社"
                },
                {
                    "key": "termsofUseTabHead",
                    "eng": "Terms of use",
                    "jpn": "利用規約"
                },
                {
                    "key": "privacyPolicyTabHead",
                    "eng": "Privacy Policy",
                    "jpn": "プライバシーポリシー"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "system-admin",
            "componentName": "System Admin Menu",
            "labels": [
                {
                    "key": "secondaryMenuHead",
                    "eng": "System Admin",
                    "jpn": "システム管理者"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-visitor",
            "componentName": "FAQ Visitor",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "FAQ",
                    "jpn": "よくある質問"
                },
                {
                    "key": "faqTypeMenu",
                    "eng": "FAQ Type",
                    "jpn": "分類(カテゴリ)"
                },
                {
                    "key": "adminButton",
                    "eng": "Admin",
                    "jpn": "管理者"
                },
                {
                    "key": "wasteTypeLabel",
                    "eng": "Type",
                    "jpn": "よ質問リスト"
                },
                {
                    "key": "faqCatTabHeader",
                    "eng": "Category",
                    "jpn": "分類(カテゴリ)"
                },
                {
                    "key": "faqQnATabHeader",
                    "eng": "Questions & Answers",
                    "jpn": "質問と回答"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-category",
            "componentName": "FAQ Catagory",
            "labels": [
                {
                    "key": "faqTypeListHeader",
                    "eng": "FAQ Categories",
                    "jpn": "分類(カテゴリ)"
                },
                {
                    "key": "faqCatDetailsButton",
                    "eng": "Detail",
                    "jpn": "詳細"
                },
                {
                    "key": "editBtn",
                    "eng": "Edit Questions",
                    "jpn": "質問を編集する"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-question-answer",
            "componentName": "FAQ Question And Answer",
            "labels": [
                {
                    "key": "editBtn",
                    "eng": "Edit Questions",
                    "jpn": "質問を編集する"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-admin",
            "componentName": "FAQ Admin",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "FAQ",
                    "jpn": "よくある質問"
                },
                {
                    "key": "faqTypeMenu",
                    "eng": "FAQ Type",
                    "jpn": "分類(カテゴリ)"
                },
                {
                    "key": "adminButton",
                    "eng": "Admin",
                    "jpn": "管理者"
                },
                {
                    "key": "wasteTypeLabel",
                    "eng": "Type",
                    "jpn": "よくある質問"
                },
                {
                    "key": "faqCatTabHeader",
                    "eng": "Category ",
                    "jpn": "分類(カテゴリ)"
                },
                {
                    "key": "faqQnATabHeader",
                    "eng": "Questions & Answers",
                    "jpn": "質問と回答"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-category-admin",
            "componentName": "FAQ Catagory Admin",
            "labels": [
                {
                    "key": "listHeader",
                    "eng": "FAQ Categories",
                    "jpn": "分類(カテゴリ)"
                },
                {
                    "key": "addButton",
                    "eng": "Add Category",
                    "jpn": "カテゴリを追加する"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "add-faq-category-form",
            "componentName": "FAQ Form",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "Add Category",
                    "jpn": "カテゴリを追加する"
                },
                {
                    "key": "questionLabel",
                    "eng": "Title",
                    "jpn": "Title"
                },
                {
                    "key": "answerLabel",
                    "eng": "Description",
                    "jpn": "説明"
                },
                {
                    "key": "addBtn",
                    "eng": "Add",
                    "jpn": "追加する"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "更新"
                },
                {
                    "key": "cancelBtn",
                    "eng": "Cancel",
                    "jpn": "キャンセル"
                }
            ],
            "messages": [
                {
                    "key": "faqTypeValidation",
                    "eng": "Please enter the FAQ type",
                    "jpn": "Please enter the FAQ type"
                },
                {
                    "key": "faqDescriptionValidation",
                    "eng": "Please enter the FAQ description",
                    "jpn": "Please enter the FAQ description"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "subscriptionForm",
            "componentName": "Subscription Form",
            "labels": [
                {
                    "key": "title",
                    "eng": "Subscription Form",
                    "jpn": "利用申込"
                },
                {
                    "key": "companyName",
                    "eng": "Comp. Name",
                    "jpn": "会社名（屋号）*"
                },
                {
                    "key": "address",
                    "eng": "Address",
                    "jpn": "住所*"
                },
                {
                    "key": "conatctNo",
                    "eng": "Contact No",
                    "jpn": "連絡先電話番号"
                },
                {
                    "key": "subscriptionEmail",
                    "eng": "Subscription Email",
                    "jpn": "利用申込メールアドレス* "
                },
                {
                    "key": "companyCategory",
                    "eng": "Select Buss.Type",
                    "jpn": "事業内容*"
                },
                {
                    "key": "humanVerification",
                    "eng": "Human Verification",
                    "jpn": "人体検証"
                },
                {
                    "key": "termsCondition",
                    "eng": "I confirm and agree to the terms of use and privacy policy",
                    "jpn": "利用規約・プライバシーポリシーを確認して同意します。"
                },
                {
                    "key": "subscribe",
                    "eng": "Apply",
                    "jpn": "申込"
                },
                {
                    "key": "dumper",
                    "eng": "Dumper",
                    "jpn": "排出事業者"
                },
                {
                    "key": "processor",
                    "eng": "Processor",
                    "jpn": "処理事業者"
                },
                {
                    "key": "transporter",
                    "eng": "Transporter",
                    "jpn": "運搬事業者"
                },
                {
                    "key": "subscriberName",
                    "eng": "Subscriber Name",
                    "jpn": "申込者名*"
                },
                {
                    "key": "subscriberMail",
                    "eng": "Subscriber Mail",
                    "jpn": "メールアドレス*"
                },
                {
                    "key": "zipCode",
                    "eng": "〒 Zip Code",
                    "jpn": "〒"
                },
                {
                    "key": "selctMultiple",
                    "eng": "* You can select multiple ",
                    "jpn": "※御社の事業を1つ以上☑してください"
                },
                {
                    "key": "asAdmin",
                    "eng": "※The applicant will be considered as admin",
                    "jpn": "※申込者名・メールアドレスで「管理操作者」を登録いたします。"
                },
                {
                    "key": "submit",
                    "eng": "Apply",
                    "jpn": "申込"
                }
            ],
            "messages": [
                {
                    "key": "companyNameValidator",
                    "eng": "You need to fill up the company name",
                    "jpn": "会社名が必要です。"
                },
                {
                    "key": "subscriberNameValidator",
                    "eng": "You need to provide a subsc. Name",
                    "jpn": "申込者名*サブスクライバー名を指定する必要があります。"
                },
                {
                    "key": "addressValidator",
                    "eng": "Please enter and specify the address",
                    "jpn": "「住所を入力指定下さい」"
                },
                {
                    "key": "contactNoValidator",
                    "eng": "Please Enter Your 10 Digit Contact Number",
                    "jpn": "10桁の電話番号を提供する必要があります。"
                },
                {
                    "key": "subscriptionEmailValidator",
                    "eng": "Please enter and specify your e-mail address",
                    "jpn": "「メールアドレスを入力指定下さい」"
                },
                {
                    "key": "subscriberMailValidator",
                    "eng": "Please enter and specify your e-mail address",
                    "jpn": "「メールアドレスを入力指定下さい」"
                },
                {
                    "key": "catagoryValidator",
                    "eng": "You need to select business type at least one type",
                    "jpn": "少なくとも1つのタイプの業種を選択する必要があります。"
                },
                {
                    "key": "isAgreeValidator",
                    "eng": "Please agree to the terms of use and privacy policy",
                    "jpn": "「利用規約・プライバシーポリシーに同意して下さい」"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "subscription-success-popup",
            "componentName": "Subscription Successfull Pop up",
            "labels": [],
            "messages": [
                {
                    "key": "successfullMsg",
                    "eng": "Thank you for your application.",
                    "jpn": "利用申込ありがとうございます。"
                },
                {
                    "key": "message1",
                    "eng": "Thank You For applying DXR as an -",
                    "jpn": "DXRを適用していただきありがとうございます -"
                },
                {
                    "key": "message2",
                    "eng": "The person in charge will contact you with detailed information at a later date.",
                    "jpn": "後日、担当者から詳しいご案内のご連絡致します"
                },
                {
                    "key": "okbutton",
                    "eng": "Ok",
                    "jpn": "OK"
                },
                {
                    "key": "cancel",
                    "eng": "Cancel",
                    "jpn": "キャンセル"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-question-answer-admin",
            "componentName": "FAQ Qustion Answer",
            "labels": [
                {
                    "key": "addButton",
                    "eng": "Add Questions",
                    "jpn": "質問を追加する"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "admin-subscription-list",
            "componentName": "Subscription List",
            "labels": [
                {
                    "key": "subuscriptionList",
                    "eng": "Subscription List",
                    "jpn": "利用事業者一覧"
                },
                {
                    "key": "filterBy",
                    "eng": "Filter by",
                    "jpn": "フィルター"
                },
                {
                    "key": "companyName",
                    "eng": "Company Name",
                    "jpn": "会社名（屋号）"
                },
                {
                    "key": "new",
                    "eng": "Filter New Application",
                    "jpn": "利用申込「新」"
                },
                {
                    "key": "accept",
                    "eng": "Filter Existing user list",
                    "jpn": "利用中のみ"
                },
                {
                    "key": "reject",
                    "eng": "Reject",
                    "jpn": "拒否"
                },
                {
                    "key": "detail",
                    "eng": "Detail",
                    "jpn": "詳細"
                },
                {
                    "key": "type",
                    "eng": "Company Type",
                    "jpn": "会社の種類"
                },
                {
                    "key": "date",
                    "eng": "Date",
                    "jpn": "日付"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "admin-submission-info",
            "componentName": "Subscription Submission Info",
            "labels": [
                {
                    "key": "title",
                    "eng": "Subscription Form",
                    "jpn": "利用申込"
                },
                {
                    "key": "companyName",
                    "eng": "Company Name",
                    "jpn": "会社名（屋号）*"
                },
                {
                    "key": "address",
                    "eng": "Address",
                    "jpn": "住所*"
                },
                {
                    "key": "conatctNo",
                    "eng": "Contact No",
                    "jpn": "連絡先電話番号"
                },
                {
                    "key": "subscriptionEmail",
                    "eng": "Subscription Email",
                    "jpn": "利用申込メールアドレス"
                },
                {
                    "key": "companyCategory",
                    "eng": "Company Catagory",
                    "jpn": "事業内容*"
                },
                {
                    "key": "subscriberName",
                    "eng": "Subscriber Name",
                    "jpn": "申込者名*"
                },
                {
                    "key": "subscriberMail",
                    "eng": "Subscriber Mail",
                    "jpn": "メールアドレス*"
                }
            ],
            "messages": [
                {}
            ],
            "notifications": []
        },
        {
            "componentCode": "admin-subscription-list-popup",
            "componentName": "Subscription List Popup",
            "labels": [
                {
                    "key": "save",
                    "eng": "Save",
                    "jpn": "保存"
                },
                {
                    "key": "Details",
                    "eng": "Details",
                    "jpn": "詳細"
                },
                {
                    "key": "Confirmation",
                    "eng": "Confirmation",
                    "jpn": "確認"
                },
                {
                    "key": "cancel",
                    "eng": "Cancel",
                    "jpn": "キャンセル"
                }
            ],
            "messages": [
                {}
            ],
            "notifications": []
        },
        {
            "componentCode": "admin-subscription-confirmation",
            "componentName": "Admin Subscription Confirmation",
            "labels": [
                {
                    "key": "status",
                    "eng": "Status",
                    "jpn": "状態"
                },
                {
                    "key": "accept",
                    "eng": "Approve",
                    "jpn": "承認"
                },
                {
                    "key": "reject",
                    "eng": "Reject",
                    "jpn": "拒否"
                },
                {
                    "key": "title",
                    "eng": "Subscriber Appplication Confirmation",
                    "jpn": "利用事業者申込判断"
                }
            ],
            "messages": [
                {}
            ],
            "notifications": []
        },
        {
            "componentCode": "faq-add-question-answer",
            "componentName": "Add Question ",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "Add Questions ",
                    "jpn": "質問を追加"
                },
                {
                    "key": "questionLabel",
                    "eng": "Question",
                    "jpn": "質問"
                },
                {
                    "key": "answerLabel",
                    "eng": "Answer",
                    "jpn": "答え"
                },
                {
                    "key": "addBtn",
                    "eng": "Add",
                    "jpn": "追加"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "更新"
                },
                {
                    "key": "cancelBtn",
                    "eng": "Cancel",
                    "jpn": "キャンセル"
                }
            ],
            "messages": [
                {
                    "key": "faqQuestionValidator",
                    "eng": "Please enter the FAQ question",
                    "jpn": "Please enter the FAQ question"
                },
                {
                    "key": "faqAnswerValidator",
                    "eng": "Please enter the FAQ answer",
                    "jpn": "Please enter the FAQ answer"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "superAdmin",
            "componentName": "Super Admin",
            "labels": [
                {
                    "key": "secondaryMenuHead",
                    "eng": "Super Admin",
                    "jpn": "システム管理者"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "userLogin",
            "componentName": "User Login",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "User Login",
                    "jpn": "ユーザーログイン"
                },
                {
                    "key": "userId",
                    "eng": "User Id",
                    "jpn": "ユーザーID"
                },
                {
                    "key": "password",
                    "eng": "Password",
                    "jpn": "パスワード"
                },
                {
                    "key": "loginBtn",
                    "eng": "Login",
                    "jpn": "ログイン"
                },
                {
                    "key": "forgetPassBtn",
                    "eng": "Forget Password",
                    "jpn": "パスワードを変更する"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "inquiry-form",
            "componentName": "Inquiry Form",
            "labels": [
                {
                    "key": "inquiryFormTitle",
                    "eng": "Inquiry",
                    "jpn": "お問い合わせ"
                },
                {
                    "key": "companyName",
                    "eng": "Com name ",
                    "jpn": "会社名（屋号）"
                },
                {
                    "key": "personName",
                    "eng": "Name",
                    "jpn": "お　名　前"
                },
                {
                    "key": "contactNo",
                    "eng": "Contact No",
                    "jpn": "電話番号(任意)"
                },
                {
                    "key": "emailAddress",
                    "eng": "Mail*",
                    "jpn": "メールアドレス*"
                },
                {
                    "key": "inquiryTitle",
                    "eng": "Subject*",
                    "jpn": "件　　　名*"
                },
                {
                    "key": "inquiryDetail",
                    "eng": "Detail*",
                    "jpn": "内　　　容*"
                },
                {
                    "key": "humanVarification",
                    "eng": "Human Varification",
                    "jpn": "人間の多様化"
                },
                {
                    "key": "agreedTerms",
                    "eng": "Privacy Please read and agree to the privacy policy before sending.",
                    "jpn": "プライバシーポリシーをお読み頂き同意の上送信して下さい。"
                },
                {
                    "key": "submit",
                    "eng": "Send",
                    "jpn": "送信"
                }
            ],
            "messages": [
                {
                    "key": "contactNoValidator",
                    "eng": "If Contact no file input text text is not allowed",
                    "jpn": "連絡先番号にテックスは許可されていません。"
                },
                {
                    "key": "emailAddressValidator",
                    "eng": "Need to fill up the Correct mail formate",
                    "jpn": "「メールアドレスを入力指定下さい」。"
                },
                {
                    "key": "inquiryTitleValidator",
                    "eng": "You cannot keep the subject empty",
                    "jpn": "件名を空に保つことはできません。"
                },
                {
                    "key": "inquiryDetailValidator",
                    "eng": "You cannot keep the details empty",
                    "jpn": "内容を空にしておくことはできません。"
                },
                {
                    "key": "isAgreedValidator",
                    "eng": "Please agree to the terms of use and privacy policy",
                    "jpn": "「利用規約・プライバシーポリシーに同意して下さい」"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "inquiry-tabs",
            "componentName": "Inquiry Tabs",
            "labels": [
                {
                    "key": "inquiryListTabTitle",
                    "eng": "Inquiry List",
                    "jpn": "問合せ一覧"
                },
                {
                    "key": "inquiryresonseTabTitle",
                    "eng": "Inquiry Response",
                    "jpn": "問合せ状況"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "inquiry-info-list",
            "componentName": "Inquiry List",
            "labels": [
                {
                    "key": "inquiryListTitle",
                    "eng": "Inquiry List",
                    "jpn": "問合せ一覧"
                },
                {
                    "key": "filterBy",
                    "eng": "Status ",
                    "jpn": "状態"
                },
                {
                    "key": "new",
                    "eng": "Unanswered",
                    "jpn": "未回答"
                },
                {
                    "key": "answer",
                    "eng": "Answered",
                    "jpn": "回答ずみ"
                },
                {
                    "key": "submitionDateTime",
                    "eng": "Date & Time",
                    "jpn": "日付"
                },
                {
                    "key": "inquiryTitle",
                    "eng": "Subject",
                    "jpn": "件名"
                },
                {
                    "key": "inquiryDetail",
                    "eng": "Detail",
                    "jpn": "内容"
                },
                {
                    "key": "response",
                    "eng": "Response",
                    "jpn": "応答"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "app-response",
            "componentName": "Inqury Response",
            "labels": [
                {
                    "key": "inquiryInfoTitle",
                    "eng": "Inquirer",
                    "jpn": "問合せ者"
                },
                {
                    "key": "companyName",
                    "eng": "Company Name",
                    "jpn": "会社名（屋号）"
                },
                {
                    "key": "personName",
                    "eng": "Name",
                    "jpn": "お　名　前"
                },
                {
                    "key": "contactNo",
                    "eng": "Contact No",
                    "jpn": "電話番号(任意)"
                },
                {
                    "key": "emailAddress",
                    "eng": "Mail",
                    "jpn": "メールアドレス"
                },
                {
                    "key": "inquiryTitle",
                    "eng": "Subject",
                    "jpn": "件　　　名"
                },
                {
                    "key": "inquiryDetail",
                    "eng": "Detail",
                    "jpn": "内　　　容"
                },
                {
                    "key": "reply",
                    "eng": "Reply",
                    "jpn": "メッセージを送信する"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "inquiry-reply",
            "componentName": "Inquiry Reply",
            "labels": [
                {
                    "key": "replypopupTitle",
                    "eng": "ADD Inquiry Reply",
                    "jpn": "メッセージを送信する"
                },
                {
                    "key": "send",
                    "eng": "Send",
                    "jpn": "送信"
                },
                {
                    "key": "close",
                    "eng": "Close",
                    "jpn": "閉じる"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "admin-system-overview",
            "componentName": "Admin System Overview ",
            "labels": [
                {
                    "key": "costingTabHead",
                    "eng": "Costing",
                    "jpn": "費用の説明"
                },
                {
                    "key": "caseStudyTabHead",
                    "eng": "Case Study",
                    "jpn": "導入事例"
                },
                {
                    "key": "introductionFlowTabHead",
                    "eng": "Introduction Flow ",
                    "jpn": "導入の流れ"
                },
                {
                    "key": "howToUseItTabHead",
                    "eng": "How to use it",
                    "jpn": "使用方法"
                },
                {
                    "key": "companyUsingItTabHead",
                    "eng": "Company Using it",
                    "jpn": "運営会社"
                },
                {
                    "key": "privacyPolicyTabHead",
                    "eng": "Privacy Policy ",
                    "jpn": "プライバシーポリシー"
                },
                {
                    "key": "termsOfUseTabHead",
                    "eng": "Terms of Use",
                    "jpn": "利用規約"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "howToUseItTab",
            "componentName": "How to use it Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "How to use it",
                    "jpn": "使用方法"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "更新"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "caseStudyTab",
            "componentName": "Case Study Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Case study",
                    "jpn": "導入事例"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "更新"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "termsOfUseTab",
            "componentName": "Terms of Use Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Terms of Use",
                    "jpn": "利用規約"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "更新"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "clientListTab",
            "componentName": "Client List Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Company Using IT",
                    "jpn": "運営会社"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "更新"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "changePassword",
            "componentName": "Change Password",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "Change Password",
                    "jpn": "パスワードを変更"
                },
                {
                    "key": "userId",
                    "eng": "User Id",
                    "jpn": "ユーザーID"
                },
                {
                    "key": "sendAccessCodeBtn",
                    "eng": "Send Access Code",
                    "jpn": "パスワードを変更する"
                },
                {
                    "key": "accessCode",
                    "eng": "User ID & Password",
                    "jpn": "ユーザーIDとパスワード"
                },
                {
                    "key": "newPassword",
                    "eng": "New Password",
                    "jpn": "新パスワード"
                },
                {
                    "key": "confirmPassword",
                    "eng": "Confirm Password",
                    "jpn": "新しいパスワード(再)"
                },
                {
                    "key": "changePassword",
                    "eng": "Change Password",
                    "jpn": "パスワード変更"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "submition-popup",
            "componentName": "Inquiry Submission Popup",
            "labels": [
                {
                    "key": "submissionmessage",
                    "eng": "Your inquiry submitted successfully",
                    "jpn": "お問い合わせは正常に送信されました"
                },
                {
                    "key": "submissionmessagetitle",
                    "eng": "Successful messege title",
                    "jpn": "お問い合わせ内容の確認"
                },
                {
                    "key": "okBtn",
                    "eng": "Ok",
                    "jpn": "Ok"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "terms-condition-popup",
            "componentName": "Terms and Condition Popup",
            "labels": [
                {
                    "key": "iagree",
                    "eng": "I Agree",
                    "jpn": "一致する"
                },
                {
                    "key": "termsConditionTitle",
                    "eng": "Terms and Condition",
                    "jpn": "利用規約 プライバシーポリシー"
                },
                {
                    "key": "termsConditionContent",
                    "eng": " Cookie: small amount of data generated by a website and saved by your web browser. It is used to identify your browser, provide analytics, remember information about you such as your language preference or login information.",
                    "jpn": "いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。"
                },
                {
                    "key": "cancel",
                    "eng": "Cancel",
                    "jpn": "キャンセ"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "validation-report-popup",
            "componentName": "Validation Report Popup",
            "labels": [
                {
                    "key": "validationReportTitle",
                    "eng": "Please Provide Correct Information",
                    "jpn": "正しい情報を提供してください。"
                },
                {
                    "key": "validationMessage",
                    "eng": "Message",
                    "jpn": "メッセージ"
                },
                {
                    "key": "ok",
                    "eng": "OK",
                    "jpn": "OK"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "introductionFlowTab",
            "componentName": "Introduction Flow Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Introduction Flow ",
                    "jpn": "導入の流れ"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "更新"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "companyUsingItTab",
            "componentName": "Company Using It Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Company Using it",
                    "jpn": "運営会社"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "更新"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "costingTab",
            "componentName": "Costing Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Costing",
                    "jpn": "費用の説明"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "更新"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "termsofUsed",
            "componentName": "Terms of Used Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Terms of use",
                    "jpn": "利用規約"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "更新"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "privacyPolicy",
            "componentName": "Privacy Policy Tab",
            "labels": [
                {
                    "key": "headerLabel",
                    "eng": "Privacy Policy",
                    "jpn": "プライバシーポリシー"
                },
                {
                    "key": "modifyBtn",
                    "eng": "Modify",
                    "jpn": "更新"
                }
            ],
            "messages": [
                {
                    "key": "welcome message",
                    "eng": "Welcome",
                    "jpn": "ようこそ"
                }
            ],
            "notifications": []
        },
        {
            "componentCode": "create-dxr-admin",
            "componentName": "Create DXR Admin",
            "labels": [
                {
                    "key": "formTitle",
                    "eng": "Create DXR Admin",
                    "jpn": "DXR管理者追加"
                },
                {
                    "key": "fullName",
                    "eng": "Full Name",
                    "jpn": "氏 名"
                },
                {
                    "key": "address",
                    "eng": "Address",
                    "jpn": "住所"
                },
                {
                    "key": "deptTitle",
                    "eng": "Department Title",
                    "jpn": "部署／役職"
                },
                {
                    "key": "email",
                    "eng": "Email",
                    "jpn": "メールアドレス"
                },
                {
                    "key": "mobile",
                    "eng": "mobile",
                    "jpn": "電話番号"
                },
                {
                    "key": "createBtn",
                    "eng": "Create",
                    "jpn": "追加する"
                },
                {
                    "key": "resenCodeBtn",
                    "eng": "Resend Code",
                    "jpn": "コード再送する"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "set-dxr-admin",
            "componentName": "Set Dxr Admin",
            "labels": [
                {
                    "key": "formTitle",
                    "eng": "Set DXR Admin Access",
                    "jpn": "DXRシステム管理者ダッシュボード"
                },
                {
                    "key": "fullName",
                    "eng": "Access",
                    "jpn": "Access"
                },
                {
                    "key": "createBtn",
                    "eng": "Set DXR Admin Access",
                    "jpn": "追加する"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "role-definition-admin",
            "componentName": "Role Definition",
            "labels": [
                {
                    "key": "dumperTab",
                    "eng": "Dumper",
                    "jpn": "排出事業者"
                },
                {
                    "key": "transporterTab",
                    "eng": "Transporter",
                    "jpn": "運搬事業者"
                },
                {
                    "key": "processorTab",
                    "eng": "Proccessor",
                    "jpn": "処理事業者"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "role-def-list",
            "componentName": "Role Def Menu List",
            "labels": [
                {
                    "key": "menuLabel",
                    "eng": "Menu",
                    "jpn": "メニュー"
                },
                {
                    "key": "menuGroupLabel",
                    "eng": "Menu Group",
                    "jpn": "Menu Group"
                },
                {
                    "key": "roleLabel",
                    "eng": "Role",
                    "jpn": "Role"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "更新"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "role-assign-popup",
            "componentName": "Role Def Assign Popup",
            "labels": [
                {
                    "key": "pageHeader",
                    "eng": "Role Access",
                    "jpn": "Role Access"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "更新"
                },
                {
                    "key": "cancelBtn",
                    "eng": "Cancel",
                    "jpn": "キャンセル"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "componentList",
            "route": "",
            "labels": [
                {
                    "key": "componentList",
                    "eng": "Component List",
                    "jpn": "Component List"
                },
                {
                    "key": "saveBtn",
                    "eng": "Save",
                    "jpn": "Save"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "Update"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "languageSetupPopup",
            "route": "",
            "labels": [
                {
                    "key": "componentCode",
                    "eng": "Component Code",
                    "jpn": "component Code"
                },
                {
                    "key": "componentName",
                    "eng": "Component Name",
                    "jpn": "Component Name"
                },
                {
                    "key": "uiLabel",
                    "eng": "Labels",
                    "jpn": "Labels"
                },
                {
                    "key": "messages",
                    "eng": "Messages",
                    "jpn": "Messages"
                },
                {
                    "key": "notification",
                    "eng": "Notification",
                    "jpn": "Notification"
                },
                {
                    "key": "invalidMessageContent",
                    "eng": "Incorrect JSON Format",
                    "jpn": "Incorrect JSON Format"
                },
                {
                    "key": "cancelBtn",
                    "eng": "Cancel",
                    "jpn": "Cancel"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "Update"
                }
            ],
            "messages": [],
            "notifications": []
        }
    ];

    MENU_LIST = [
        {
            "componentCode": "appRoot",
            "menus": [
                {
                    menuId: 'systemOverview',
                    menuTitleEng: 'System Overview',
                    menuTitleJpn: 'システム概要',
                    menuUrl: '/visitor/system-overview/0',
                },
                {
                    menuId: 'subscription',
                    menuTitleEng: 'Subscription',
                    menuTitleJpn: '利用申込',
                    menuUrl: '/visitor/subscription'
                },
                {
                    menuId: 'faq',
                    menuTitleEng: 'FAQ',
                    menuTitleJpn: 'よくある質問',
                    menuUrl: '/visitor/faq'
                },
                {
                    menuId: 'inquiry',
                    menuTitleEng: 'Inquiry',
                    menuTitleJpn: '問合せ',
                    menuUrl: '/visitor/inquiry'
                },
                {
                    menuId: 'systemAdmin',
                    menuTitleEng: 'DXR Admin',
                    menuTitleJpn: 'DXR 管理者',
                    menuUrl: '/system-admin'
                },
                {
                    menuId: 'dxrSuperAdmin',
                    menuTitleEng: 'System Admin Op',
                    menuTitleJpn: 'システム管理者オペレーション',
                    menuUrl: '/super-admin',
                    child: [
                        {
                            menuId: 'createDxrAdmin',
                            menuTitleEng: 'Create DXR Admin',
                            menuTitleJpn: 'DXR管理者を作成する',
                            menuUrl: 'super-admin/create-dxr-admin',
                            parentSegment: '',
                        },
                        {
                            menuId: 'setDxrAdminAccess',
                            menuTitleEng: 'Set DXR Admin Access',
                            menuTitleJpn: 'DXR管理者アクセスを設定する',
                            menuUrl: 'super-admin/set-dxr-admin-access',
                            parentSegment: ''
                        },
                        {
                            menuId: 'setCompanyAdminAccess',
                            menuTitleEng: 'Set Company Admin Access',
                            menuTitleJpn: '会社の管理者アクセスを設定する',
                            menuUrl: 'super-admin/set-company-admin-access',
                            parentSegment: ''
                        },
                    ]
                },
            ],
        },
        {
            "componentCode": "system-admin",
            "menus": [
                {
                    menuId: "sysAdminSystemOverview",
                    menuTitleEng: "System Overview",
                    menuTitleJpn: "システム概要",
                    menuUrl: "system-overview-admin",
                    parentSegment: "/system-admin",
                },
                {
                    menuId: "sysAdminSubscription",
                    menuTitleEng: "Subscription",
                    menuTitleJpn: "利用申込",
                    menuUrl: "subscription-admin",
                    parentSegment: "/system-admin"
                },
                {
                    menuId: "sysAdminFaq",
                    menuTitleEng: "FAQ",
                    menuTitleJpn: "よくある質問",
                    menuUrl: "faq-admin",
                    parentSegment: "/system-admin"
                },
                {
                    menuId: "sysAdminInquiry",
                    menuTitleEng: "Inquiry",
                    menuTitleJpn: "問合せ",
                    menuUrl: "inquiry-admin",
                    parentSegment: "/system-admin"
                },
                {
                    menuId: "sysAdminRoleDef",
                    menuTitleEng: "Role Definition",
                    menuTitleJpn: "役割の定義",
                    menuUrl: "role-def-admin",
                    parentSegment: "/system-admin"
                },
                {
                    menuId: "sysAdminWasteDef",
                    menuTitleEng: "Waste Def",
                    menuTitleJpn: "Waste Def",
                    menuUrl: "waste-def-admin",
                    parentSegment: "/system-admin"
                },
                {
                    menuId: "sysAdminWasteRequest",
                    menuTitleEng: "Waste Request",
                    menuTitleJpn: "Waste Request",
                    menuUrl: "waste-request-admin",
                    parentSegment: "/system-admin"
                }
            ]
        },
        {
            "componentCode": "superAdmin",
            "menus": [
                {
                    menuId: 'superAdminOp',
                    menuTitleEng: 'Super Admin OP',
                    menuTitleJpn: 'Super Admin OP',
                    menuUrl: 'super-admin',
                    parentSegment: '',
                    child: [
                        {
                            menuId: 'createDxrAdmin',
                            menuTitleEng: 'Create DXR Admin',
                            menuTitleJpn: 'システム概要',
                            menuUrl: 'super-admin/',
                            parentSegment: '',
                        },
                        {
                            menuId: 'setDxrAdminAccess',
                            menuTitleEng: 'Set DXR Admin Access',
                            menuTitleJpn: 'よくある質問',
                            menuUrl: 'super-admin/',
                            parentSegment: ''
                        },
                        {
                            menuId: 'setCompanyAdminAccess',
                            menuTitleEng: 'Set Company Admin Access',
                            menuTitleJpn: '問合せ',
                            menuUrl: 'super-admin',
                            parentSegment: ''
                        },
                    ]
                },
            ],
        },
        {
            "componentCode": "componentList",
            "route": "",
            "labels": [
                {
                    "key": "componentList",
                    "eng": "Component List",
                    "jpn": "Component List"
                },
                {
                    "key": "saveBtn",
                    "eng": "Save",
                    "jpn": "Save"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "Update"
                }
            ],
            "messages": [],
            "notifications": []
        },
        {
            "componentCode": "languageSetupPopup",
            "route": "",
            "labels": [
                {
                    "key": "componentCode",
                    "eng": "Component Code",
                    "jpn": "component Code"
                },
                {
                    "key": "componentName",
                    "eng": "Component Name",
                    "jpn": "Component Name"
                },
                {
                    "key": "uiLabel",
                    "eng": "Labels",
                    "jpn": "Labels"
                },
                {
                    "key": "messages",
                    "eng": "Messages",
                    "jpn": "Messages"
                },
                {
                    "key": "notification",
                    "eng": "Notification",
                    "jpn": "Notification"
                },
                {
                    "key": "invalidMessageContent",
                    "eng": "Incorrect JSON Format",
                    "jpn": "Incorrect JSON Format"
                },
                {
                    "key": "cancelBtn",
                    "eng": "Cancel",
                    "jpn": "Cancel"
                },
                {
                    "key": "updateBtn",
                    "eng": "Update",
                    "jpn": "Update"
                }
            ],
            "messages": [],
            "notifications": []
        },

    ]

}
