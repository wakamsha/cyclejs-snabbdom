import {Observable as O} from 'rxjs';
import {DOMSource} from '@cycle/dom/rxjs-typings';
import {VNode} from '@cycle/dom';

export type Chapter = {
    title: string;
    demos: Chapter.Demo[]
};

export namespace Chapter {
    export type Demo = {
        directory: string;
        name: string;
    }
}


export type Sources = {
    DOM: DOMSource;
}

export type Sinks = {
    DOM: O<VNode>;
}
