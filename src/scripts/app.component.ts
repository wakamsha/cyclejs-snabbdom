import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'my-app',
    template: `
<nav class="navbar navbar-inverse navbar-static-top">
    <div class="container">
        <div class="navbar-header">
            <a (click)="onclickTop()" class="navbar-brand">Cycle.js DEMO</a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a routerLink="/snabbdom" routerLinkActive="active">Snabbdom</a></li>
            </ul>
        </div>
    </div>
</nav>
<router-outlet></router-outlet>
`
})
export class AppComponent implements OnInit {

    private baseTitle = 'Cycle.js DEMO';

    constructor(private router: Router,
                private titleService: Title) {}

    ngOnInit() {}

    onclickTop() {
        this.router.navigate(['']);
        this.titleService.setTitle(this.baseTitle);
    }
}

