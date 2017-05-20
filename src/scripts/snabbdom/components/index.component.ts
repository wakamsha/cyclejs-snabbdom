import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Chapter} from '../../declares/interface';
import {ChapService as TutorialService} from './tutorials/chap.service';

@Component({
    template: `
<router-outlet></router-outlet>
<navigation [chapters]="chapters" (selected)="onSelect($event)"></navigation>
`
})
export class IndexComponent implements OnInit {

    public chapters: Chapter[] = [];

    private baseTitle = 'Cycle.js DEMO';

    constructor(private router: Router,
                private titleService: Title,
                private tutorialService: TutorialService) {}

    ngOnInit() {
        this.tutorialService.getChaps().then(chaps => this.addChapter(chaps, 'Tutorials', 'tutorials'));
    }

    onSelect(demo: Chapter.Demo) {
        this.router.navigate([`/snabbdom/${demo.directory}`, demo.name]);
        this.titleService.setTitle(`${this.capitalize(demo.name)} | ${this.baseTitle}`);
    }

    private addChapter(chaps: any, title: string, directoryName: string) {
        const chapter: Chapter = {
            title,
            demos: Object.keys(chaps).map(name => ({ directory: directoryName, name}))
        };
        this.chapters.push(chapter);
    }

    private capitalize(str: string): string {
        return `-${str}`.replace(/\-(\w)/g, (_, m) => m.toUpperCase());
    }
}
