import {Component, OnInit} from '@angular/core';
import {Observable as O} from 'rxjs';
import {div, makeDOMDriver, input, VNode, canvas} from '@cycle/dom';
import {run} from '@cycle/rxjs-run';
import {DOMSource} from '@cycle/dom/rxjs-typings';
import {Ball} from '../../../../domains/entities/Ball';

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

            const range$ = rangeInput$.map((ev: Event) => +(ev.target as HTMLInputElement).value);
            const visibility$ = changeVisibility$.map((ev: Event) => (ev.target as HTMLInputElement).checked);

            const vdom$ = O.combineLatest(
                range$.startWith(1),
                visibility$.startWith(true),
                (range, visibility) => {
                    return div([
                        div('.module-controller', [
                            input('.visibility-checkbox', { attrs: { type: 'checkbox', checked: visibility } }),
                            input('.range-slider', { attrs: { type: 'range', min: 0, max: 4, step: .01, value: range } }),
                        ]),
                        visibility ?
                            canvas('#my-canvas.stage', {
                                hook: Hooks.PulseHook,
                                range,
                            }) :
                            null
                    ])
                }
            );

            return {
                DOM: vdom$
            };
        }

        const drivers = {
            DOM: makeDOMDriver('#cycleApp')
        };

        run(main, drivers);
    }
}

type Sources = {
    DOM: DOMSource;
}

type Sinks = {
    DOM: O<VNode>;
}


namespace Hooks {
    type ModuleNode = {
        elm: HTMLElement,
        data: {
            range: number;
        }
    } & VNode;

    let stage: createjs.Stage;
    let stageWidth: number = 0;
    let stageHeight: number = 0;
    let centerX = 0;
    let centerY = 0;
    let bottom = 0;

    let ball: Ball;
    let angle = 0;
    let centerScale = 0;
    let range = 1;
    let speed = .1;

    function onEnterFrame() {
        ball.scaleX = ball.scaleY = centerScale + Math.sin(angle) * range;
        angle += speed;
        stage.update();
    }

    function prepareStage(id: string) {
        stage = new createjs.Stage(id);
        const canvas = <HTMLCanvasElement>stage.canvas;
        canvas.setAttribute('width', window.innerWidth.toString());
        canvas.setAttribute('height', (window.innerHeight - 51).toString());
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
        stageWidth = canvas.width;
        bottom = stageHeight = canvas.height;

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener('tick', () => onEnterFrame());
    }

    /**
     * 初期化処理
     * @param vnode
     */
    function insert(vnode: ModuleNode) {
        if (isNaN(vnode.data.range)) return;
        prepareStage(vnode.elm.id);
        ball = new Ball();
        ball.x = centerX;
        ball.y = centerY;
        stage.addChild(ball);
    }

    /**
     * 変化量を更新する
     * @param _
     * @param vnode
     */
    function update(_: ModuleNode, vnode: ModuleNode) {
        range = vnode.data.range;
    }

    /**
     * 後片付け処理
     * @param _
     */
    function destroy(_: ModuleNode) {
        createjs.Ticker.removeAllEventListeners('tick');
    }

    export const PulseHook = {insert, update, destroy};
}

