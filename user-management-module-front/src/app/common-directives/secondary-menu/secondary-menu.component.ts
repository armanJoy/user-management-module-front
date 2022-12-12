import { Component, OnInit, Directive, ElementRef, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
@Component({
    selector: 'app-secondary-menu',
    templateUrl: './secondary-menu.component.html',
    styleUrls: ['./secondary-menu.component.css']
})
export class SecondaryMenuComponent implements OnInit {

    @Input() subMenuItems: any;

    constructor(private breakpointObserver: BreakpointObserver, private elementRef: ElementRef) { }

    ngOnInit(): void {
    }

    uiLabels = {
        "faqTypeMenu": "FAQ Type",
        "adminButton": "Admin",
        "wasteTypeLabel": "Type",
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => result.matches),
        shareReplay()
    );

}
