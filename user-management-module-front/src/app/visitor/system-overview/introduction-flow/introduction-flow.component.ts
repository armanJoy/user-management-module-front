import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { StaticPageFetch } from 'src/app/models/backend-fetch/dxr-system';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { SystemOverviewService } from 'src/app/services/visitor-services/system-overview.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { ModifyStaticPageComponent } from '../modify-static-page/modify-static-page.component';

@Component({
    selector: 'app-introduction-flow',
    templateUrl: './introduction-flow.component.html',
    styleUrls: ['./introduction-flow.component.css']
})
export class IntroductionFlowComponent implements OnInit {
    templateHtml$: Observable<string> = of('<h4 style="padding: 20px 0px 0px 10px;">対象事業者</h4><p style="text-align: justify;padding: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Pineapple" style="width:170px;height:170px;float: right; padding: 0px 10px 10px 10px;">いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。</p><h4 style="padding: 20px 0px 0px 10px;">対象事業者</h4><p style="text-align: justify;padding: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Pineapple" style="width:170px;height:170px;float: left; padding: 0px 10px 10px 10px;">いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。</p><h4 style="padding: 20px 0px 0px 10px;">対象事業者</h4><p style="text-align: justify;padding: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Pineapple" style="width:170px;height:170px;float: left; padding: 0px 10px 10px 10px;">いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。</p><h4 style="padding: 20px 0px 0px 10px;">対象事業者</h4><p style="text-align: justify;padding: 10px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Pineapple" style="width:170px;height:170px;float: right; padding: 0px 10px 10px 10px;">いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。いいからさっき盗ったモノを、カバンの中から出しなさい。いい誕生日を迎えられますように。これが探していたものだ」と彼は叫んだ。 インチキなセールスマンにだまされて、役立たずの機械を買わされたとジョンは主張した。日本人ならそんなことはけっしてしないでしょう。１００万人の人々がその戦争で命を落とした。驚かない所をみると知ってたのね。いままで誰もその山頂に到達できていない。 肩慣らしには丁度いいかも。 雨が降っている。</p>');
    @ViewChild('divBinder')
    divBinder!: ElementRef<HTMLElement>;

    staticPage!: StaticPageFetch;

    @Input()
    isAdmin?: boolean;

    constructor(private elementRef: ElementRef, private languageService: LanguageService, private matDialog: MatDialog, private systemOverviewService: SystemOverviewService, private utilService: UtilService) { }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.INTORODUCTION_FLOW_TAB, AppConstant.UI_LABEL_TEXT);
    componentCode!: string;
    isSystemAdmin: boolean = false;
    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.INTORODUCTION_FLOW_TAB;
        this.isAdmin = (this.isAdmin) ? this.isAdmin : false;

    }

    ngAfterViewInit(): void {


    }

    setUiLabels(uiLabels: any) {
        this.uiLabels = uiLabels;
    }

    loadStaticContent(data: StaticPageFetch) {

        if (!data) {
            var content: Observable<string> = of('Content will be coming soon...');
            content.subscribe(tpl => this.divBinder.nativeElement.innerHTML = tpl);
        } else {
            this.staticPage = data;
            var content: Observable<string> = of(this.staticPage.staticContent);
            content.subscribe(tpl => this.divBinder.nativeElement.innerHTML = tpl);

        }


    }

    modifyStaticContent() {
        const modifyPopup = this.matDialog.open(ModifyStaticPageComponent, {
            width: '100%',
            height: '75%',
            data: Object.assign({}, this.staticPage)
        });

        modifyPopup.afterClosed().subscribe((returnData) => {
            if (returnData) {

                if (this.staticPage) {

                    this.staticPage.staticContent = returnData;
                    this.systemOverviewService.saveStaticPage(this.staticPage).subscribe(savedData => {
                        if (savedData) {
                            this.staticPage = savedData;
                            this.divBinder.nativeElement.innerHTML = savedData.staticContent;
                        }
                    });
                } else {
                    const id = this.utilService.generateUniqueId();
                    var newStaticPage: StaticPageFetch = {
                        staticPageId: id,
                        staticContent: returnData,
                        backendDate: '',
                        frontendDate: '',
                        dxrInfoCache: ''
                    }

                    this.systemOverviewService.saveStaticPage(newStaticPage).subscribe(savedData => {
                        if (savedData) {
                            this.staticPage = savedData;
                            this.divBinder.nativeElement.innerHTML = savedData.staticContent;
                        }
                    });
                }


                // this.templateHtml$ = of(returnData);
            }
        })
    }

}
