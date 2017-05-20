import {Component, OnInit} from '@angular/core';
import {Observable as O} from 'rxjs';
import {div, makeDOMDriver, input, canvas, label} from '@cycle/dom';
import {run} from '@cycle/rxjs-run';
import {PulseHook} from './hooks/PulseHook';
import {Sources, Sinks} from '../../../../declares/interface';

@Component({
    template: `
<div id="cycleApp"></div>
`
})
export class PulseHookComponent implements OnInit {

    ngOnInit() {
        /**
         * アプリケーション
         * @param so
         * @returns {{DOM: any}}
         */
        function main(so: Sources): Sinks {
            const rangeInput$: O<Event> = so.DOM.select('.range-slider').events('input');
            const changeVisibility$: O<Event> = so.DOM.select('.visibility-checkbox').events('change');

            const range$: O<number> = rangeInput$.map((ev: Event): number => +(ev.target as HTMLInputElement).value);
            const visibility$: O<boolean> = changeVisibility$.map((ev: Event): boolean => (ev.target as HTMLInputElement).checked);

            const vdom$ = O.combineLatest(
                range$.startWith(1),
                visibility$.startWith(true),
                (range, visibility) => {
                    return div([
                        div('.module-controller', [
                            div('.checkbox', [
                                label([
                                    input('.visibility-checkbox', { attrs: { type: 'checkbox', checked: visibility } }),
                                    ' Show Canvas'
                                ])
                            ]),
                            input('.range-slider', { attrs: { type: 'range', min: 0, max: 4, step: .01, value: range } }),
                        ]),
                        visibility ?
                            canvas('#my-canvas.stage', {
                                hook: PulseHook,
                                range,
                            }) :
                            null
                    ])
                }
            );

            return <Sinks>{
                DOM: vdom$
            };
        }

        const drivers = {
            DOM: makeDOMDriver('#cycleApp')
        };

        run(main, drivers);
    }
}
