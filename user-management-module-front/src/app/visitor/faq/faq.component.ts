import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { FaqTypeView, FaqInfoView } from 'src/app/models/view/faq-view';
import { FaqVisitorService } from 'src/app/services/visitor-services/faq-visitor.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver,
        private faqVisitorService: FaqVisitorService,
        private matDialog: MatDialog,
        private languageService: LanguageService, private utilService: UtilService) { };

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.FAQ_VISITOR, AppConstant.UI_LABEL_TEXT);
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    faqTypes: FaqTypeView[] = [];
    selectedFaqType!: FaqTypeView;
    faqInfoList: FaqInfoView[] = [];
    componentCode!: string;
    isSystemAdmin: boolean = false;


    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.FAQ_VISITOR;
        this.faqVisitorService.backendFetchHandler.getFaqTypes().subscribe((data) => {
            this.faqTypes = data;
            this.selectedFaqType = data[0];
            this.preparerFaqInfo(this.selectedFaqType.faqTypeId);

        });
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    // showSpecificFaq(selectedFaqMenu: FaqTypeView): void {
    //     this.selectedFaqType = selectedFaqMenu;
    //     this.preparerFaqInfo(this.selectedFaqType.faqTypeId);
    // }

    preparerFaqInfo(faqTypeId: String): void {
        this.faqVisitorService.backendFetchHandler.getFaqInfoListByFaqType(faqTypeId).subscribe((data) => {
            if (data) {
                this.faqInfoList = data;
            }
        })
    }

    selectedIndex = 0;
    public switchTab = (index: number, faqType: FaqTypeView): void => {
        this.selectedIndex = index;
        this.selectedFaqType = faqType;
        this.preparerFaqInfo(this.selectedFaqType.faqTypeId);
    }

    informChange(index: any) {
        this.selectedIndex = index;
    }
}


// subMenuItems = [
//     {
//         menuTitle: "Menu 1",
//         menuUrl: "",
//         child: [
//             {
//                 menuTitle: "Menu 1.1",
//                 menuUrl: "/menu1",
//             },
//             {
//                 menuTitle: "Menu 1.2",
//                 menuUrl: "",
//             },
//             {
//                 menuTitle: "Menu 1.3",
//                 menuUrl: "",
//             }
//         ]
//     },
//     {
//         menuTitle: "Menu 2",
//         menuUrl: "",
//         child: [
//             {
//                 menuTitle: "Menu 2.1",
//                 menuUrl: "",
//             },
//             {
//                 menuTitle: "Menu 2.2",
//                 menuUrl: "",
//             }
//         ]
//     },
//     {
//         menuTitle: "Menu 3",
//         menuUrl: "",
//         child: [
//             {
//                 menuTitle: "Menu 3.1",
//                 menuUrl: "",
//             },
//             {
//                 menuTitle: "Menu 3.2",
//                 menuUrl: "",
//             }
//         ]
//     },
//     {
//         menuTitle: "Menu 4",
//         menuUrl: "",

//     }
// ];

// infoMenuItems = [
//     {
//         menuTitle: "Menu 1",
//         menuItemId: "",
//         child: [
//             {
//                 menuTitle: "Menu 1.1",
//                 menuItemId: "/menu1",
//             },
//             {
//                 menuTitle: "Menu 1.2",
//                 menuItemId: "",
//             },
//             {
//                 menuTitle: "Menu 1.3",
//                 menuItemId: "",
//             }
//         ]
//     },
//     {
//         menuTitle: "Menu 2",
//         menuItemId: "",
//         child: [
//             {
//                 menuTitle: "Menu 2.1",
//                 menuItemId: "",
//             },
//             {
//                 menuTitle: "Menu 2.2",
//                 menuItemId: "",
//             }
//         ]
//     },
//     {
//         menuTitle: "Menu 3",
//         menuItemId: "",
//         child: [
//             {
//                 menuTitle: "Menu 3.1",
//                 menuItemId: "",
//             },
//             {
//                 menuTitle: "Menu 3.2",
//                 menuItemId: "",
//             }
//         ]
//     },
//     {
//         menuTitle: "Menu 4",
//         menuItemId: "",

//     }
// ];