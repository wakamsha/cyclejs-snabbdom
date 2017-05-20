import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './components/index.component';
import {ModuleWithProviders} from '@angular/core';
import {routes as tutorialRoutes} from './components/tutorials/chap.routing';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/snabbdom',
        pathMatch: 'full'
    },
    {
        path: 'snabbdom',
        component: IndexComponent,
        children: [
            ...tutorialRoutes,
        ]
    }
];

export const snabbdomRouting: ModuleWithProviders = RouterModule.forChild(routes);
