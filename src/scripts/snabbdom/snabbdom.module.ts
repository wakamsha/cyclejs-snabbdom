import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {snabbdomRouting} from './snabbdom.routing';
import {SharedModule} from '../shared/shared.module';
import {IndexComponent} from './components/index.component';
import {ChapModule as TutorialModule} from './components/tutorials/chap.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        snabbdomRouting,
        TutorialModule,
    ],
    declarations: [
        IndexComponent
    ]
})
export class SnabbdomModule {}
