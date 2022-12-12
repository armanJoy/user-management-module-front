import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../services/visitor-services/socketio.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-company-admin',
    templateUrl: './company-admin.component.html',
    styleUrls: ['./company-admin.component.css']
})
export class CompanyAdminComponent implements OnInit {

    constructor(private socketioService: SocketioService, private router: Router) { }


    ngOnInit(): void {
        // this.routeFunction();
    }
    // routeFunction() {
    //     var url = this.socketioService.getNavigateUrl();
    //     this.router.navigate(url)
    // }

}
