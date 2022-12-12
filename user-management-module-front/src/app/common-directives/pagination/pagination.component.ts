import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    @Output()
    searchByText = new EventEmitter<any>();

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService) { }

    uiLabels: any = {
        searchButton: "Search",
        nextButton: "Next",
        previousButton: "Previous",
        caseSensitiveMode: "Apply Case Sensitivity"
    };

    searchText: string = '';
    pageNo: number = 0;
    langIndex: string = this.utilService.getSelectedLanguageIndex();
    langIndexEnglish: string = AppConstant.LANG_INDEX_ENG;
    caseSensitive: boolean = false;

    isSystemAdmin = this.utilService.languageEditMode();
    componentCode = AppConstant.COMP.PAGINATION;

    ngOnInit(): void {
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    search() {

        if (this.langIndex != this.langIndexEnglish || !this.caseSensitive) {
            this.utilService.setSearchText(JSON.parse(JSON.stringify(this.searchText.toLowerCase())));
        } else {
            this.utilService.setSearchText(JSON.parse(JSON.stringify(this.searchText)));
        }

        this.searchByText.emit();
    }

    goToNextPage() {
        this.pageNo++;

        this.utilService.setPageNo(JSON.parse(JSON.stringify(this.pageNo)));
        this.searchByText.emit();

    }

    goToPreviousPage() {
        if (this.pageNo > 0) {
            this.pageNo--;
            this.utilService.setPageNo(JSON.parse(JSON.stringify(this.pageNo)));
            this.searchByText.emit();
        }

    }


}
