import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {chapRouting} from './chap.routing';
import {ChapService, CHAPS} from './chap.service';

@NgModule({
    imports: [
        CommonModule,
        chapRouting
    ],
    declarations: Object.keys(CHAPS).map(name => CHAPS[name]),
    providers: [
        ChapService
    ]
})
export class ChapModule {}
