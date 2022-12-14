import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class LanguageService {

    constructor(private cookieService: CookieService, private snakebar: MatSnackBar) {

    }

}
