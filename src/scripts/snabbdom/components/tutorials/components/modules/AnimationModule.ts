import {VNode} from '@cycle/dom';

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
