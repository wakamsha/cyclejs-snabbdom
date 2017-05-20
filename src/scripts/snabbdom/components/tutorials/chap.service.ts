import {Injectable} from '@angular/core';
import {PulseHookComponent} from './components/pulse-hook.component';
import {AnimationModuleComponent} from './components/animation-module.component';

export const CHAPS: any = {
    pulseHook        : PulseHookComponent,
    animationModule  : AnimationModuleComponent
};

@Injectable()
export class ChapService {

    public getChaps(): Promise<any> {
        return Promise.resolve(CHAPS);
    }
}
