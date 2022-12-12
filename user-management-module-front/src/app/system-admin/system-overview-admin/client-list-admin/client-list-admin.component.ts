import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-client-list-admin',
    templateUrl: './client-list-admin.component.html',
    styleUrls: ['./client-list-admin.component.css']
})
export class ClientListAdminComponent implements OnInit {

    constructor() { }
    uiLabels = {
        headerLabel: 'Client List'
    }
    ngOnInit(): void {
    }

}
