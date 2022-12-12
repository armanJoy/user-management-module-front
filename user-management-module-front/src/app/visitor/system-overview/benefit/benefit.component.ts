import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModifyStaticPageComponent } from '../modify-static-page/modify-static-page.component';
import { SystemOverviewService } from 'src/app/services/visitor-services/system-overview.service';
import { StaticPageFetch } from 'src/app/models/backend-fetch/dxr-system';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-benefit',
    // template: `<div #divBinder></div>`,
    templateUrl: './benefit.component.html',
    styleUrls: ['./benefit.component.css']
})
export class BenefitComponent implements OnInit {

    templateHtml$: Observable<string> = of('<h4 style="padding: 20px 0px 0px 10px;">対象事業者</h4><p style="text-align: justify;padding: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Pineapple" style="width:170px;height:170px;float: right; padding: 0px 10px 10px 10px;">いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。</p><h4 style="padding: 20px 0px 0px 10px;">対象事業者</h4><p style="text-align: justify;padding: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Pineapple" style="width:170px;height:170px;float: left; padding: 0px 10px 10px 10px;">いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。</p><h4 style="padding: 20px 0px 0px 10px;">対象事業者</h4><p style="text-align: justify;padding: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Pineapple" style="width:170px;height:170px;float: right; padding: 0px 10px 10px 10px;">いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。</p><h4 style="padding: 20px 0px 0px 10px;">対象事業者</h4><p style="text-align: justify;padding: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Pineapple" style="width:170px;height:170px;float: right; padding: 0px 10px 10px 10px;">いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。</p>');


    @ViewChild('divBinder')
    divBinder!: ElementRef<HTMLElement>;

    constructor(private elementRef: ElementRef, private systemOverviewService: SystemOverviewService, private languageService: LanguageService, private utilService: UtilService) { }

    @Input()
    pageContents!: StaticPageFetch[];

    @Input()
    staticPage!: StaticPageFetch;

    @Input()
    isAdmin?: boolean


    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.BENEFITS_TAB, AppConstant.UI_LABEL_TEXT);
    componentCode!: string;
    isSystemAdmin: boolean = false;
    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.BENEFITS_TAB;
        this.isAdmin = (this.isAdmin) ? this.isAdmin : false;
        // this.pageContent = (this.pageContent) ? this.pageContent : 

        // this.templateHtml$ = of((this.pageContents.length > 0) ? this.pageContents[0].staticContent : this.staticPage.staticContent);

    }

    ngAfterViewInit(): void {
        // Technique #1
        // this.templateHtml$.subscribe(tpl => this.elementRef.nativeElement.innerHTML = tpl);
        // Technique #2
        this.templateHtml$.subscribe(tpl => this.divBinder.nativeElement.innerHTML = tpl);
    }

    // modifyStaticContent() {
    //     const modifyPopup = this.matDialog.open(ModifyStaticPageComponent, {
    //         width: '100%',
    //         height: '75%',
    //         data: this.templateHtml$
    //     });

    //     modifyPopup.afterClosed().subscribe((returnData) => {
    //         if (returnData) {
    //             
    //             var staticPage: StaticPageFetch = this.pageContents[0];
    //             staticPage.staticContent = returnData;
    //             this.systemOverviewService.saveStaticPage(staticPage);
    //             this.templateHtml$ = of(returnData);
    //         }
    //     })
    // }
}
