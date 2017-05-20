import {Component, OnInit} from '@angular/core';
import {Observable as O} from 'rxjs';
import {div, makeDOMDriver, VNode, ul, li, a, img} from '@cycle/dom';
import {StyleModule, ClassModule, PropsModule, AttrsModule} from '@cycle/dom/lib/modules';
import {run} from '@cycle/rxjs-run';
import {DOMSource} from '@cycle/dom/rxjs-typings';

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

            return {
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
                    Modules.AnimationModule
                ]
            })
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

namespace Modules {
    type ModuleNode = {
        elm: HTMLElement;
        data: {
            animations: {
                enter: boolean;
                leave: boolean;
            }
        }
    } & VNode;

    let created: ModuleNode[] = [];

    /**
     * 変数を初期化
     */
    function pre() {
        created = [];
    }

    /**
     * 表示アニメーションを適用する
     * @param _
     * @param vnode
     */
    function create(_: ModuleNode, vnode: ModuleNode) {
        if (!vnode.data.animations) return;
        vnode.elm.classList.add('animation');
        vnode.elm.classList.add('animation--active');
        if (vnode.data.animations.enter) {
            vnode.elm.classList.add('animation--enter');
        }
        created.push(vnode);
    }

    /**
     * 要素が更新される時 ( ※ 使用しない )
     */
    function update(_: ModuleNode, vnode: ModuleNode) {
        if (!vnode.data.animations) return;
    }

    /**
     * 要素が直接もしくは間接的に削除される時 ( ※ 使用しない )
     * @param vnode
     */
    function destroy(vnode: ModuleNode) {
        if (!vnode.data.animations) return;
    }

    /**
     * 非表示アニメーションを適用して削除
     * @param vnode
     * @param fn
     */
    function remove(vnode: ModuleNode, fn: () => void) {
        vnode.elm.classList.add('animation--leave');
        setTimeout(() => fn(), 300);
    }

    /**
     * パッチプロセス終了後の後始末をする
     */
    function post() {
        created.forEach(vnode => {
            if (vnode.data.animations.enter) {
                setTimeout(() => vnode.elm.classList.remove('animation--enter'), 300);
            }
        });
        created = [];
    }

    export const AnimationModule = {pre, create, update, destroy, remove, post};
}
