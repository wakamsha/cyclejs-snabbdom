import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Chapter} from '../declares/interface';

@Component({
    selector: 'navigation',
    template: `
<div class="navigation" [class.navigation--collapsed]="!isExpanded">
    <button class="navigation__toggle" (click)="toggleNavigationVisibility()" [class.navigation__toggle--active]="isExpanded">
        <i class="fa" [ngClass]="isExpanded ? 'fa-times' : 'fa-bars'"></i>
    </button>
    <div class="navigation__inner">
        <div *ngFor="let chapter of chapters" class="navigation__section">
            <h3 class="navigation__caption">{{chapter.title}}</h3>
            <ul class="navigation__list">
                <li *ngFor="let demo of chapter.demos" class="navigation__list-item" [class.navigation__list-item--selected]="isSelected(demo.name, demo.directory)">
                    <a (click)="select(demo.name, demo.directory)">{{capitalize(demo.name)}}</a>
                </li>
            </ul>
        </div>
    </div>
</div>
`
})
export class NavigationComponent {

    @Input()
    chapters: Chapter[];

    @Output()
    selected = new EventEmitter();

    isExpanded = true;

    private selectedState: string;

    isSelected(state: string, directory: string): boolean {
        return this.selectedState === `${directory}/${state}`;
    }

    capitalize(str: string): string {
        return `-${str}`.replace(/\-(\w)/g, (_, m) => m.toUpperCase());
    }

    select(name: string, directory: string) {
        this.selectedState = `${directory}/${name}`;
        const demo: Chapter.Demo = { directory, name };
        this.selected.emit(demo);
    }

    toggleNavigationVisibility() {
        this.isExpanded = !this.isExpanded;
    }
}
