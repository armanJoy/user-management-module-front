import { Injectable } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class DateTimeService {

    ENGLISH_DATE_FORMAT_PLACEHOLDER = 'YY-MM-DD';
    JAPANESE_DATE_FORMAT_PLACEHOLDER = 'YY年MM月DD日';

    ENGLISH_DATE_FORMAT_MASK = '';
    JAPANESE_DATE_FORMAT_MASK = 'YY';

    constructor(private utilService: UtilService) { }

    getPlaceholder(langIndex: string) {
        var placeholder = '';
        if (langIndex == AppConstant.LANG_INDEX_ENG) {
            placeholder = this.ENGLISH_DATE_FORMAT_PLACEHOLDER;
        } else if (langIndex == AppConstant.LANG_INDEX_ENG) {
            placeholder = this.JAPANESE_DATE_FORMAT_PLACEHOLDER;
        }

        return placeholder;
    }


}
