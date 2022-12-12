import { Component, Inject, Input, OnInit } from '@angular/core';
import { ValidationReport } from 'src/app/models/view/validation-models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-invalid-message',
    templateUrl: './invalid-message.component.html',
    styleUrls: ['./invalid-message.component.css']
})
export class InvalidMessageComponent implements OnInit {

    validationReport!: ValidationReport;

    constructor(@Inject(MAT_DIALOG_DATA) public data: ValidationReport, private breakpointObserver: BreakpointObserver) { }

    ngOnInit(): void {
        this.validationReport = this.data;
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

}
