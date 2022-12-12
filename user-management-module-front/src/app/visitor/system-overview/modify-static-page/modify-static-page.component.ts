import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StaticPageFetch } from 'src/app/models/backend-fetch/dxr-system';

@Component({
    selector: 'app-modify-static-page',
    templateUrl: './modify-static-page.component.html',
    styleUrls: ['./modify-static-page.component.css']
})
export class ModifyStaticPageComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) private data: StaticPageFetch, public dialogRef: MatDialogRef<ModifyStaticPageComponent>) { }

    staticTemplate: string = '';

    ngOnInit(): void {

        this.staticTemplate = this.data.staticContent;

    }

    updateContent() {
        this.dialogRef.close(this.staticTemplate);
    }

}
