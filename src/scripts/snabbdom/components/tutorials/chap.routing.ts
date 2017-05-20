import {Routes, RouterModule} from '@angular/router';
import {CHAPS} from './chap.service';
import {ModuleWithProviders} from '@angular/core';

export const routes: Routes = Object.keys(CHAPS).map(name => ({ path: `tutorials/${name}`, component: CHAPS[name] }));

export const chapRouting: ModuleWithProviders = RouterModule.forChild(routes);
