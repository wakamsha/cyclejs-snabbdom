import {Component, OnInit} from '@angular/core';
import {Observable as O} from 'rxjs';
import {div, makeDOMDriver, ul, li, a, img} from '@cycle/dom';
import {StyleModule, ClassModule, PropsModule, AttrsModule} from '@cycle/dom/lib/modules';
import {run} from '@cycle/rxjs-run';
import {AnimationModule} from './modules/AnimationModule';
import {Sources, Sinks} from '../../../../declares/interface';

@Component({
    template: `
<div class="container">
    <h1 class="page-header">Animation Module</h1>
    <div id="cycleApp"></div>
</div>
`,
})
export class AnimationModuleComponent implements OnInit {

    ngOnInit() {
        /**
         * アプリケーション
         * @param so
         * @returns {{DOM: any}}
         */
        function main(so: Sources): Sinks {
            const picture$ = so.DOM.select('#nav-picture').events('click').mapTo('picture');
            const messages$ = so.DOM.select('#nav-messages').events('click').mapTo('messages');

            const action$: O<string> = O.merge(picture$, messages$);

            const vdom$ = action$.startWith('picture').map(action => {
                return div([
                    ul('.nav.nav-tabs', [
                        li({
                            class: {
                                'active': action === 'picture'
                            }
                        }, [
                            a('#nav-picture', 'Picture')
                        ]),
                        li({
                            class: {
                                'active': action === 'messages'
                            }
                        }, [
                            a('#nav-messages', 'Messages')
                        ])
                    ]),
                    action === 'picture'
                        ? div('.well', {
                            key: Math.random(),
                            animations: { enter: true, leave: true }
                        }, [
                            img('.img-thumbnail', {attrs: {src: 'http://lorempixel.com/480/270/sports/'}})
                        ])
                        : div('.well', {
                            key: Math.random(),
                            animations: { enter: true }
                        }, 'Curabitur aliquet quam id dui posuere blandit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Cras ultricies ligula sed magna dictum porta. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.')
                ])
            });

            return <Sinks>{
                DOM: vdom$
            };
        }

        const drivers = {
            DOM: makeDOMDriver('#cycleApp', {
                modules: [
                    PropsModule,
                    StyleModule,
                    ClassModule,
                    AttrsModule,
                    AnimationModule
                ]
            })
        };

        run(main, drivers);
    }
}
